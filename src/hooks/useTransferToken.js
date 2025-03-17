import { useCallback } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { Contract } from "ethers";
import NFT_ABI from "../ABI/nft.json";
import { getEthersSigner } from "../config/wallet-connection/adapter";
import { isSupportedNetwork } from "../utils";
import { useAppContext } from "../contexts/appContext";

const useTransferToken = () => {
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();
    const { refreshUserTokens } = useAppContext();
    
    return useCallback(async (tokenId, toAddress) => {
        if (!address) return alert("Please connect your wallet");
        if (!isSupportedNetwork(chainId)) return alert("Unsupported network");
        
        // Validate recipient address
        if (!toAddress || toAddress.trim() === '') {
            return alert("Please enter a recipient address");
        }
        
        // Basic Ethereum address validation
        if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
            return alert("Please enter a valid Ethereum address");
        }
        
        // Prevent sending to the zero address
        if (toAddress === '0x0000000000000000000000000000000000000000') {
            return alert("Cannot transfer to the zero address");
        }
        
        // Prevent sending to your own address
        if (toAddress.toLowerCase() === address.toLowerCase()) {
            return alert("Cannot transfer to your own address");
        }

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
                return alert("You are not the owner of this token");
            }

            // Execute the transfer
            const tx = await contract.transferFrom(address, toAddress, tokenId);
            console.log("Transfer transaction sent:", tx.hash);
            
            // Set up event listener for the Transfer event
            contract.on("Transfer", (from, to, id) => {
                if (from.toLowerCase() === address.toLowerCase() && 
                    id.toString() === tokenId.toString()) {
                    console.log("Transfer successful:", from, to, id);
                }
            });
            
            const receipt = await tx.wait();
            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }
            
            // Remove event listener after transaction is confirmed
            contract.removeAllListeners("Transfer");
            
            // Refresh the user's tokens
            refreshUserTokens();
            
            alert("Token transferred successfully");
            return receipt;
        } catch (error) {
            console.error("Transfer error:", error);
            
            // Show more meaningful error messages
            if (error.message.includes("insufficient funds")) {
                alert("Insufficient funds to complete the transaction");
            } else if (error.message.includes("user rejected")) {
                alert("Transaction was rejected by the user");
            } else {
                alert(`Error transferring token: ${error.message}`);
            }
            
            return null;
        }
    }, [address, chainId, wagmiConfig, refreshUserTokens]);
};

export default useTransferToken;