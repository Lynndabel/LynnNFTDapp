import { formatEther } from "ethers";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { truncateString } from "../../utils";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMinted = Number(nextTokenId) > tokenId;
    const isNextToMint = Number(nextTokenId) === tokenId;

    return (
        <>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: tokenId * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group"
            >
                <div className={`rounded-xl overflow-hidden bg-gray-800 border ${isMinted ? 'border-green-500' : 'border-gray-700'} transition-all shadow-glow hover:shadow-glow-intense`}>
                    {/* Status Badge */}
                    {isMinted && (
                        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Minted
                        </div>
                    )}
                    
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={metadata.image}
                            alt={`${metadata.name} image`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                        <h2 className="font-bold text-lg text-white mb-1">{metadata.name}</h2>
                        <p className="text-gray-400 text-sm mb-3">
                            {truncateString(metadata.description, 80)}
                        </p>
                        
                        {/* Info Row */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center text-gray-300 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>{metadata.attributes.length} Attributes</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="16 8 8 16 16 16 16 8"></polygon>
                                    <polygon points="8 8 8 16 16 8 8 8"></polygon>
                                </svg>
                                <span>{mintPrice ? parseFloat(formatEther(mintPrice)).toFixed(3) : "0"}</span>
                            </div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Details
                            </button>
                            <button
                                disabled={!isNextToMint}
                                onClick={mintNFT}
                                className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                                    isNextToMint
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                        : isMinted
                                            ? "bg-green-900 text-green-300 cursor-not-allowed"
                                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {isMinted ? "Owned" : "Mint NFT"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Detail Modal */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-3xl rounded-2xl bg-gray-900 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Image */}
                            <div className="w-full md:w-1/2 relative">
                                <img
                                    src={metadata.image}
                                    alt={metadata.name}
                                    className="w-full h-full object-cover"
                                />
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Details */}
                            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[80vh] md:max-h-[600px]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <Dialog.Title className="text-2xl font-bold text-white">
                                            {metadata.name}
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-400">Token ID: {tokenId}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isMinted ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {isMinted ? 'Minted' : 'Available'}
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-white">Description</h3>
                                    <p className="text-gray-300">{metadata.description}</p>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-white">Attributes</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {metadata.attributes.map((attr, index) => (
                                            <div 
                                                key={index} 
                                                className="bg-gray-800 border border-gray-700 rounded-lg p-3"
                                            >
                                                <p className="text-gray-400 text-xs uppercase mb-1">{attr.trait_type}</p>
                                                <p className="text-white font-medium">{attr.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-white">Details</h3>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Collection</span>
                                            <span className="text-white">NFT Collection</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Token Standard</span>
                                            <span className="text-white">ERC-721</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Price</span>
                                            <span className="text-white flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                                                    <polygon points="16 8 8 16 16 16 16 8"></polygon>
                                                    <polygon points="8 8 8 16 16 8 8 8"></polygon>
                                                </svg>
                                                {mintPrice ? parseFloat(formatEther(mintPrice)).toFixed(4) : "0"} ETH
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    disabled={!isNextToMint}
                                    onClick={() => {
                                        mintNFT();
                                        setIsOpen(false);
                                    }}
                                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                                        isNextToMint
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                            : isMinted
                                                ? "bg-green-900 text-green-300 cursor-not-allowed"
                                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    {isMinted ? "Already Owned" : "Mint NFT"}
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default NFTCard;