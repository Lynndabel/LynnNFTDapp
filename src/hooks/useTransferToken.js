import { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";
import { useAppContext } from "../contexts/appContext";
import { toast } from 'react-toastify';

const useTransferToken = () => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    const { refreshUserTokens } = useAppContext();
    
    return useCallback(async (tokenId, toAddress) => {
        if (!address) {
            toast.error("Please connect your wallet");
            return null;
        }
        
        if (!isSupportedNetwork(chainId)) {
            toast.error("Unsupported network. Please switch to a supported network");
            return null;
        }
        
        // Validation is now handled in MyTokens component to prevent modal closure
        // and allow better user experience
        
        try {
            const signer = await getEthersSigner(wagmiConfig);
            const contract = new Contract(
                import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
                NFT_ABI,
                signer
            );

            // Check if the connected wallet is the owner of the token
            const tokenOwner = await contract.ownerOf(tokenId);
            if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
                toast.error("You are not the owner of this token");
                return null;
            }

            // Create a loading toast that we can update later
            const pendingToast = toast.loading("Preparing transfer...");
            
            // Execute the transfer
            const tx = await contract.transferFrom(address, toAddress, tokenId);
            console.log("Transfer transaction sent:", tx.hash);
            
            // Update toast to show transaction is pending
            toast.update(pendingToast, {
                render: "Transfer pending...",
                type: "info",
                isLoading: true,
            });
            
            // Set up event listener for the Transfer event
            contract.on("Transfer", (from, to, id) => {
                if (from.toLowerCase() === address.toLowerCase() && 
                    id.toString() === tokenId.toString()) {
                    console.log("Transfer successful:", from, to, id);
                }
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
            
            // Remove event listener after transaction is confirmed
            contract.removeAllListeners("Transfer");
            
            // Refresh the user's tokens
            refreshUserTokens();
            
            // Update toast to show success
            toast.update(pendingToast, {
                render: "Token transferred successfully!",
                type: "success",
                isLoading: false,
                autoClose: 5000,
            });
            
            return receipt;
        } catch (error) {
            console.error("Transfer error:", error);
            
            // Show more meaningful error messages
            if (error.message.includes("insufficient funds")) {
                toast.error("Insufficient funds to complete the transaction");
            } else if (error.message.includes("user rejected")) {
                toast.info("Transaction was rejected by the user");
            } else {
                toast.error(`Error transferring token: ${error.message}`);
            }
            
            return null;
        }
    }, [address, chainId, wagmiConfig, refreshUserTokens]);
};

export default useTransferToken;