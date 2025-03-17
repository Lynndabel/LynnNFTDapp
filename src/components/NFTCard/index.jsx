import React, { useState } from "react";
import { formatEther } from "ethers";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMinted = Number(nextTokenId) > tokenId;
    const isNextToMint = Number(nextTokenId) === tokenId;

    return (
        <>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: tokenId * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group h-full"
            >
                <div className="rounded-2xl overflow-hidden bg-black border border-green-800 shadow-lg hover:shadow-green-800/40 transition-all h-full flex flex-col">
                    {isMinted && (
                        <div className="absolute top-3 right-3 z-10 bg-green-700 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                            Minted
                        </div>
                    )}

                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={metadata.image}
                            alt={`${metadata.name} image`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                            <div className="absolute top-0 left-0 w-full h-[20%] bg-red-700"></div>
                            <div className="absolute top-[20%] left-0 w-full h-[20%] bg-blue-700"></div>
                            <div className="absolute top-[40%] left-0 w-full h-[20%] bg-green-700"></div>
                            <div className="absolute top-[60%] left-0 w-full h-[20%] bg-yellow-500"></div>
                            <div className="absolute top-[80%] left-0 w-full h-[20%] bg-black"></div>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                        <h2 className="font-bold text-xl text-white mb-2">
                            {metadata.name}
                        </h2>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                            {metadata.description}
                        </p>

                        <div className="flex justify-between items-center mb-5">
                            <span className="text-black text-sm bg-yellow-500 px-3 py-1 rounded-lg">
                                {metadata.attributes.length} Attributes
                            </span>
                            <span className="text-black text-sm bg-green-500 px-3 py-1 rounded-lg">
                                {mintPrice ? parseFloat(formatEther(mintPrice)).toFixed(3) : "0"} ETH
                            </span>
                        </div>

                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex-1 px-3 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                            >
                                Details
                            </button>
                            <button
                                disabled={!isNextToMint}
                                onClick={mintNFT}
                                className={`flex-1 px-3 py-2.5 text-sm font-bold rounded-lg transition-all ${isNextToMint
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : isMinted
                                        ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                                        : "bg-gray-300 text-gray-700 cursor-not-allowed"
                                }`}
                            >
                                {isMinted ? "Owned" : "Mint NFT"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-black p-6 shadow-xl border border-green-800 text-white">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-2xl font-bold">
                                {metadata.name}
                            </Dialog.Title>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300 transition">
                                ✖
                            </button>
                        </div>
                        
                        {/* South African flag-inspired header */}
                        <div className="w-full h-2 flex mb-4">
                            <div className="w-1/6 h-full bg-red-600"></div>
                            <div className="w-1/6 h-full bg-blue-600"></div>
                            <div className="w-1/6 h-full bg-green-600"></div>
                            <div className="w-1/6 h-full bg-yellow-500"></div>
                            <div className="w-1/6 h-full bg-black"></div>
                            <div className="w-1/6 h-full bg-white"></div>
                        </div>
                        
                        <p className="text-gray-200">{metadata.description}</p>
                        
                        {/* Attribute display */}
                        {metadata.attributes && metadata.attributes.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-3">Attributes</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {metadata.attributes.map((attr, index) => (
                                        <div key={index} className="bg-green-900/30 border border-green-800 rounded-lg p-3">
                                            <p className="text-yellow-500 text-xs uppercase">{attr.trait_type}</p>
                                            <p className="text-white font-medium">{attr.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default NFTCard;