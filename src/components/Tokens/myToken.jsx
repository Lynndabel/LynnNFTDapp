import { useState } from "react";
import { useAppContext } from "../../contexts/appContext";
import { useAccount } from "wagmi";
import useTransferToken from "../../hooks/useTransferToken";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { shortenAddress } from "../../utils/index";

const MyTokens = () => {
    const { userTokens, isLoadingUserTokens, tokenMetaData } = useAppContext();
    const { address } = useAccount();
    const transferToken = useTransferToken();
    
    const [selectedToken, setSelectedToken] = useState(null);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [recipientAddress, setRecipientAddress] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);

    // Handle token transfer
    const handleTransfer = async () => {
        if (!selectedToken) return;
        
        setIsTransferring(true);
        try {
            await transferToken(selectedToken.id, recipientAddress);
            setIsTransferModalOpen(false);
            setRecipientAddress("");
        } finally {
            setIsTransferring(false);
        }
    };

    // If no wallet is connected
    if (!address) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M22 10H2"></path>
                </svg>
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-gray-400">Please connect your wallet to view your NFT collection</p>
            </div>
        );
    }

    // Loading state
    if (isLoadingUserTokens) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-xl font-medium text-white">Loading your NFTs...</h2>
            </div>
        );
    }

    // No tokens owned
    if (userTokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h2 className="text-2xl font-bold text-white mb-2">No NFTs Found</h2>
                <p className="text-gray-400 mb-6">You don't own any NFTs in this collection yet</p>
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-colors"
                >
                    Mint Your First NFT
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">My Collection</h2>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                    <span className="text-gray-400 mr-2">Owned NFTs:</span>
                    <span className="text-xl font-bold text-white">{userTokens.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {userTokens.map((tokenId) => {
                    const metadata = tokenMetaData.get(Number(tokenId));
                    if (!metadata) return null;
                    
                    return (
                        <motion.div 
                            key={tokenId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="relative group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-glow"
                        >
                            {/* Token Image */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={metadata.image}
                                    alt={`${metadata.name} image`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Token Info */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-white">{metadata.name}</h3>
                                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                                        #{tokenId}
                                    </span>
                                </div>
                                
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {metadata.description}
                                </p>
                                
                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedToken({ id: tokenId, metadata });
                                            setIsTransferModalOpen(true);
                                        }}
                                        className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors text-sm"
                                    >
                                        Transfer
                                    </button>
                                    <button
                                        className="py-2 px-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Transfer Modal */}
            <Transition appear show={isTransferModalOpen} as={Fragment}>
                <Dialog 
                    as="div" 
                    className="relative z-50" 
                    onClose={() => !isTransferring && setIsTransferModalOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 shadow-xl transition-all border border-gray-800">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title className="text-xl font-bold text-white">
                                            Transfer NFT
                                        </Dialog.Title>
                                        <button
                                            onClick={() => !isTransferring && setIsTransferModalOpen(false)}
                                            className="text-gray-400 hover:text-white"
                                            disabled={isTransferring}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    {selectedToken && (
                                        <div className="mb-6 flex items-center">
                                            <img 
                                                src={selectedToken.metadata.image} 
                                                alt={selectedToken.metadata.name}
                                                className="w-16 h-16 rounded-lg mr-4 object-cover"
                                            />
                                            <div>
                                                <h3 className="text-white font-medium">
                                                    {selectedToken.metadata.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    Token ID: {selectedToken.id}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <label className="block text-gray-400 text-sm mb-2">
                                            From
                                        </label>
                                        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center justify-between">
                                            <span className="text-white">{shortenAddress(address)}</span>
                                            <span className="text-gray-400 text-sm">You</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-400 text-sm mb-2">
                                            To
                                        </label>
                                        <input
                                            type="text"
                                            value={recipientAddress}
                                            onChange={(e) => setRecipientAddress(e.target.value)}
                                            placeholder="Enter recipient address (0x...)"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            disabled={isTransferring}
                                        />
                                    </div>

                                    <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-6">
                                        <p className="text-red-400 text-sm">
                                            <strong>Warning:</strong> This action cannot be undone. Please double-check the recipient address before confirming.
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => !isTransferring && setIsTransferModalOpen(false)}
                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                            disabled={isTransferring}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleTransfer}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors flex items-center"
                                            disabled={isTransferring || !recipientAddress}
                                        >
                                            {isTransferring ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Confirm Transfer'
                                            )}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default MyTokens;