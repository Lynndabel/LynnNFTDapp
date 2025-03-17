import { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { useAppContext } from "../contexts/appContext";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";
import { toast } from 'react-toastify';

const useMintToken = () => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    const { nextTokenId, maxSupply, mintPrice, updateNextTokenId } = useAppContext();
    
    return useCallback(async () => {
        if (!address) {
            toast.error("Please connect your wallet");
            return null;
        }
        
        if (!isSupportedNetwork(chainId)) {
            toast.error("Unsupported network. Please switch to a supported network");
            return null;
        }
        
        if (nextTokenId >= maxSupply) {
            toast.error("No more tokens to mint");
            return null;
        }

        const signer = await getEthersSigner(wagmiConfig);
        const contract = new Contract(
            import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
            NFT_ABI,
            signer
        );

        // Create a loading toast that we can update later
        const pendingToast = toast.loading("Minting your NFT...");

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
            
            // Update toast to show transaction is pending
            toast.update(pendingToast, {
                render: "Transaction pending...",
                type: "info",
                isLoading: true,
            });
            
            const receipt = await tx.wait();
            
            if (receipt.status === 0) {
                toast.update(pendingToast, {
                    render: "Transaction failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                });
                throw new Error("Transaction failed");
            }

            // Remove the event listener after transaction is confirmed
            contract.removeAllListeners("Minted");
            
            // Update toast to show success
            toast.update(pendingToast, {
                render: "NFT minted successfully!",
                type: "success",
                isLoading: false,
                autoClose: 5000,
            });
            
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
                toast.update(pendingToast, {
                    render: "Insufficient funds to complete the transaction",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                });
            } else if (error.message.includes("user rejected")) {
                toast.update(pendingToast, {
                    render: "Transaction was rejected by the user",
                    type: "info",
                    isLoading: false,
                    autoClose: 5000,
                });
            } else {
                toast.update(pendingToast, {
                    render: `Error minting token: ${error.message}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                });
            }
            
            return null;
        }
    }, [address, chainId, maxSupply, mintPrice, nextTokenId, wagmiConfig, updateNextTokenId]);
};

export default useMintToken;