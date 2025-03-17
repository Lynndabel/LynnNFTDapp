import { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { useAppContext } from "../contexts/appContext";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";

const useMintToken = () => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    const { nextTokenId, maxSupply, mintPrice, updateNextTokenId } = useAppContext();
    
    return useCallback(async () => {
        if (!address) return alert("Please connect your wallet");
        if (!isSupportedNetwork(chainId)) return alert("Unsupported network");
        if (nextTokenId >= maxSupply) return alert("No more tokens to mint");

        const signer = await getEthersSigner(wagmiConfig);

        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            signer
        );

        try {
            // Set up event listener for the Minted event before sending the transaction
            contract.on("Minted", (to, tokenId) => {
                console.log("Minted event:", to, tokenId);
                // Only update if the event is for the current user
                if (to.toLowerCase() === address.toLowerCase()) {
                    // Update the nextTokenId in the context to reflect the new state
                    updateNextTokenId(Number(tokenId) + 1);
                }
            });

            const tx = await contract.mint({ value: mintPrice });
            console.log("Mint transaction sent:", tx.hash);
            
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            // Remove the event listener after transaction is confirmed
            contract.removeAllListeners("Minted");
            
            alert("Token minted successfully");
            
            // Fallback method to update token ID if event doesn't fire
            // This gets the latest token ID from the contract
            const updatedTokenId = await contract.nextTokenId();
            updateNextTokenId(updatedTokenId);
            
            return receipt;
        } catch (error) {
            console.error("Minting error: ", error);
            // Remove event listeners on error
            contract.removeAllListeners("Minted");
            
            // Show more meaningful error messages
            if (error.message.includes("insufficient funds")) {
                alert("Insufficient funds to complete the transaction");
            } else if (error.message.includes("user rejected")) {
                alert("Transaction was rejected by the user");
            } else {
                alert(`Error minting token: ${error.message}`);
            }
            
            return null;
        }
    }, [address, chainId, maxSupply, mintPrice, nextTokenId, wagmiConfig, updateNextTokenId]);
};

export default useMintToken;    