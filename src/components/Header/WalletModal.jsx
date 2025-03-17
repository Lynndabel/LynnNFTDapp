import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useConnectors } from "wagmi";

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
        } catch (error) {
            console.error(error);
        } finally {
            setPendingConnectorUID(null);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl flex items-center font-medium transition-all duration-200 transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M22 10H2"></path>
                </svg>
                Connect Wallet
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsOpen(false)}
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
                        <div className="fixed inset-0 bg-black bg-opacity-80" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
                                    <div className="flex justify-between items-center mb-6">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-bold text-white"
                                        >
                                            Connect Your Wallet
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <p className="text-gray-400 mb-6">
                                        Connect with one of our available wallet providers or create a new one
                                    </p>

                                    <div className="space-y-3">
                                        {walletConnectConnector && (
                                            <button
                                                onClick={() => connectWallet(walletConnectConnector)}
                                                disabled={pendingConnectorUID === walletConnectConnector.uid}
                                                className="w-full flex items-center justify-between px-5 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700"
                                            >
                                                <div className="flex items-center">
                                                    <img
                                                        src="https://logosarchive.com/wp-content/uploads/2022/02/WalletConnect-icon.svg"
                                                        className="w-8 h-8 mr-3"
                                                        alt="WalletConnect"
                                                    />
                                                    <span className="font-medium text-white">WalletConnect</span>
                                                </div>
                                                
                                                {pendingConnectorUID === walletConnectConnector.uid ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                )}
                                            </button>
                                        )}

                                        {otherConnectors.map((connector) => (
                                            <button
                                                key={connector.id}
                                                onClick={() => connectWallet(connector)}
                                                disabled={pendingConnectorUID === connector.uid}
                                                className="w-full flex items-center justify-between px-5 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700"
                                            >
                                                <div className="flex items-center">
                                                    <img 
                                                        src={connector.icon} 
                                                        className="w-8 h-8 mr-3" 
                                                        alt={connector.name}
                                                    />
                                                    <span className="font-medium text-white">{connector.name}</span>
                                                </div>
                                                
                                                {pendingConnectorUID === connector.uid ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-gray-800">
                                        <p className="text-sm text-gray-400 text-center">
                                            New to Ethereum?{" "}
                                            <a href="https://ethereum.org/en/wallets/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                                                Learn about wallets
                                            </a>
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