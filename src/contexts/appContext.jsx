import { Contract } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { getReadOnlyProvider } from "../utils";
import NFT_ABI from "../ABI/nft.json";
import { useAccount } from "wagmi";

const appContext = createContext();

export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export const AppProvider = ({ children }) => {
    const [nextTokenId, setNextTokenId] = useState(null);
    const [maxSupply, setMaxSupply] = useState(null);
    const [baseTokenURI, setBaseTokenURI] = useState("");
    const [tokenMetaData, setTokenMetaData] = useState(new Map());
    const [mintPrice, setMintPrice] = useState(null);
    const [userTokens, setUserTokens] = useState([]);
    const [isLoadingUserTokens, setIsLoadingUserTokens] = useState(false);
    
    const { address } = useAccount();

    // Function to update nextTokenId
    const updateNextTokenId = (newTokenId) => {
        console.log("Updating nextTokenId to:", newTokenId);
        setNextTokenId(newTokenId);
    };

    useEffect(() => {
        const provider = getReadOnlyProvider();
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            provider
        );
        
        const fetchContractData = async () => {
            try {
                const [tokenId, uri, supply, price] = await Promise.all([
                    contract.nextTokenId(),
                    contract.baseTokenURI(),
                    contract.maxSupply(),
                    contract.mintPrice()
                ]);
                
                setNextTokenId(tokenId);
                setBaseTokenURI(uri);
                setMaxSupply(supply);
                setMintPrice(price);
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        };
        
        fetchContractData();
        
        // Set up event listener for the Minted event
        const mintedFilter = contract.filters.Minted();
        provider.on(mintedFilter, (log) => {
            console.log("Minted event detected:", log);
            // Refresh the nextTokenId
            contract.nextTokenId().then(updateNextTokenId);
            // Refresh user's tokens if a wallet is connected
            if (address) {
                fetchUserTokens(address, contract);
            }
        });
        
        // Clean up event listener
        return () => {
            provider.removeAllListeners(mintedFilter);
        };
    }, []);

    // Fetch token metadata when baseTokenURI and maxSupply are available
    useEffect(() => {
        if (!maxSupply || !baseTokenURI) return;
        
        const tokenIds = Array.from({ length: Number(maxSupply) }, (_, i) => i);

        const fetchMetadata = async () => {
            try {
                const promises = tokenIds.map(id => 
                    fetch(`${baseTokenURI}${id}.json`)
                        .then(response => response.json())
                        .catch(error => {
                            console.error(`Error fetching metadata for token ${id}:`, error);
                            return { name: `Token #${id}`, description: "Metadata unavailable", attributes: [] };
                        })
                );

                const responses = await Promise.all(promises);
                const newTokenMetaData = new Map();
                responses.forEach((response, index) => {
                    newTokenMetaData.set(index, response);
                });
                setTokenMetaData(newTokenMetaData);
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };

        fetchMetadata();
    }, [baseTokenURI, maxSupply]);

    // Function to fetch user's tokens
    const fetchUserTokens = async (userAddress, contractInstance = null) => {
        if (!userAddress) return;
        
        setIsLoadingUserTokens(true);
        
        try {
            const provider = getReadOnlyProvider();
            const contract = contractInstance || new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                provider
            );
            
            // Get the balance of the user
            const balance = await contract.balanceOf(userAddress);
            const balanceNum = Number(balance);
            
            if (balanceNum === 0) {
                setUserTokens([]);
                setIsLoadingUserTokens(false);
                return;
            }
            
            // For each token, check if the user is the owner
            const userTokenIds = [];
            const totalSupply = await contract.totalSupply();
            
            // This is not the most efficient way, but works for demonstration
            // In a production app, you'd use events or a subgraph for better performance
            for (let i = 0; i < totalSupply; i++) {
                try {
                    const owner = await contract.ownerOf(i);
                    if (owner.toLowerCase() === userAddress.toLowerCase()) {
                        userTokenIds.push(i);
                    }
                    
                    // If we've found all the user's tokens, we can stop
                    if (userTokenIds.length === balanceNum) break;
                } catch (error) {
                    console.error(`Error checking owner for token ${i}:`, error);
                }
            }
            
            setUserTokens(userTokenIds);
        } catch (error) {
            console.error("Error fetching user tokens:", error);
        } finally {
            setIsLoadingUserTokens(false);
        }
    };

    // Fetch user tokens when address changes
    useEffect(() => {
        if (address) {
            fetchUserTokens(address);
        } else {
            setUserTokens([]);
        }
    }, [address]);

    return (
        <appContext.Provider
            value={{
                nextTokenId,
                maxSupply,
                baseTokenURI,
                tokenMetaData,
                mintPrice,
                updateNextTokenId,
                userTokens,
                isLoadingUserTokens,
                refreshUserTokens: () => fetchUserTokens(address),
            }}
        >
            {children}
        </appContext.Provider>
    );
};