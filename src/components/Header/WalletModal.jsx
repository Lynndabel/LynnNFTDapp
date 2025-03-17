import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useConnectors } from "wagmi";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const WalletModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const connectors = useConnectors();
    const [pendingConnectorUID, setPendingConnectorUID] = useState(null);

    const walletConnectConnector = connectors.find(
        (connector) => connector.id === "walletConnect"
    );

    const otherConnectors = connectors.filter(
        (connector) => connector.id !== "walletConnect"
    );

    const connectWallet = async (connector) => {
        try {
            setPendingConnectorUID(connector.uid);
            await connector.connect();
            setIsOpen(false);
            toast.success(`Connected with ${connector.name}!`);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to connect wallet");
        } finally {
            setPendingConnectorUID(null);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-semibold transition duration-200 shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M22 10H2"></path>
                </svg>
                Connect Wallet
            </motion.button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all border border-gray-300">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
                                            Connect Wallet
                                        </Dialog.Title>
                                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        Choose a wallet provider to connect with.
                                    </p>

                                    <div className="space-y-2">
                                        {walletConnectConnector && (
                                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => connectWallet(walletConnectConnector)} disabled={pendingConnectorUID === walletConnectConnector.uid} className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300">
                                                <div className="flex items-center">
                                                    <img src="https://logosarchive.com/wp-content/uploads/2022/02/WalletConnect-icon.svg" className="w-7 h-7 mr-3" alt="WalletConnect" />
                                                    <span className="font-medium text-gray-900">WalletConnect</span>
                                                </div>
                                            </motion.button>
                                        )}

                                        {otherConnectors.map((connector) => (
                                            <motion.button key={connector.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => connectWallet(connector)} disabled={pendingConnectorUID === connector.uid} className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300">
                                                <div className="flex items-center">
                                                    <img src={connector.icon} className="w-7 h-7 mr-3" alt={connector.name} />
                                                    <span className="font-medium text-gray-900">{connector.name}</span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-300">
                                        <p className="text-sm text-gray-600 text-center">
                                            Need help? <a href="https://ethereum.org/en/wallets/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition">Learn more</a>
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default WalletModal;
