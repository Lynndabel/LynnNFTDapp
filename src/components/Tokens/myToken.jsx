import { useState, Fragment } from "react";
import { useAppContext } from "../../contexts/appContext";
import { useAccount } from "wagmi";
import useTransferToken from "../../hooks/useTransferToken";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const MyTokens = () => {
    const { userTokens, tokenMetaData } = useAppContext();
    const { address } = useAccount();
    const transferToken = useTransferToken();
    
    const [selectedToken, setSelectedToken] = useState(null);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [recipientAddress, setRecipientAddress] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);

    const handleTransfer = async () => {
        if (!selectedToken) return;
        
        if (!recipientAddress || !/^0x[a-fA-F0-9]{40}$/.test(recipientAddress) || recipientAddress.toLowerCase() === address.toLowerCase()) {
            toast.error("Invalid recipient address");
            return;
        }
        
        setIsTransferring(true);
        const pendingToast = toast.loading("Transferring token...");
        
        try {
            await transferToken(selectedToken.id, recipientAddress);
            toast.update(pendingToast, { render: "Token transferred successfully!", type: "success", isLoading: false, autoClose: 5000 });
            setIsTransferModalOpen(false);
            setRecipientAddress("");
        } catch (error) {
            toast.update(pendingToast, { render: `Error: ${error.message || "Failed to transfer token"}`, type: "error", isLoading: false, autoClose: 5000 });
        } finally {
            setIsTransferring(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-yellow-600 mb-6">My Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userTokens.map((tokenId) => {
                    const metadata = tokenMetaData.get(Number(tokenId));
                    if (!metadata) return null;
                    
                    return (
                        <motion.div key={tokenId} className="bg-yellow-500 border border-yellow-600 p-4 rounded-2xl shadow-lg hover:shadow-yellow-700 transition-all">
                            <img src={metadata.image} alt={metadata.name} className="w-full h-48 object-cover rounded-lg" />
                            <h3 className="text-gray-900 font-bold mt-2">{metadata.name}</h3>
                            <motion.button
                                onClick={() => {
                                    setSelectedToken({ id: tokenId, metadata });
                                    setIsTransferModalOpen(true);
                                }}
                                className="mt-3 bg-yellow-700 text-white py-2 px-4 rounded-lg font-bold hover:bg-yellow-800 transition-all w-full"
                            >
                                Transfer
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            <Transition appear show={isTransferModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => !isTransferring && setIsTransferModalOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="bg-yellow-600 p-6 rounded-lg shadow-xl max-w-md w-full text-gray-900 border border-yellow-800">
                                <h3 className="text-xl font-bold">Transfer NFT</h3>
                                <input
                                    type="text"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    placeholder="Recipient Address"
                                    className="w-full p-3 mt-3 bg-yellow-300 text-gray-900 rounded-lg font-medium"
                                />
                                <button
                                    onClick={handleTransfer}
                                    className="w-full mt-4 bg-yellow-700 text-white py-2 rounded-lg font-bold hover:bg-yellow-800 transition-all"
                                    disabled={isTransferring || !recipientAddress}
                                >
                                    {isTransferring ? "Transferring..." : "Confirm Transfer"}
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default MyTokens;