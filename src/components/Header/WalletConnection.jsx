import { Fragment } from "react";
import { useAccount, useDisconnect, useBalance, useChainId } from "wagmi";
import { Menu, Transition } from "@headlessui/react";
import WalletModal from "./WalletModal";
import { shortenAddress } from "../../utils";
import { supportedNetworks } from "../../config/wallet-connection/wagmi";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const WalletConnection = () => {
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();
    const { data: balance } = useBalance({
        address: account.address,
        watch: true,
    });

    const isNetworkSupported = supportedNetworks.some(
        (network) => network.id === chainId
    );

    // Function to handle address copy
    const handleCopyAddress = () => {
        if (account.address) {
            navigator.clipboard.writeText(account.address);
            toast.success("Address copied to clipboard!");
        }
    };

    // User not connected - show connect button
    if (!account.address) {
        return <WalletModal />;
    }

    return (
        <div className="flex items-center">
            {/* Network Badge */}
            <div className={`hidden md:flex items-center py-1.5 px-3 rounded-xl mr-3 ${
                isNetworkSupported 
                    ? "bg-green-900/30 text-green-400 border border-green-700/50" 
                    : "bg-red-900/30 text-red-400 border border-red-700/50"
            }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${
                    isNetworkSupported ? "bg-green-400" : "bg-red-400"
                }`}></span>
                <span className="text-sm font-medium">
                    {isNetworkSupported 
                        ? supportedNetworks.find(network => network.id === chainId)?.name || "Connected" 
                        : "Wrong Network"}
                </span>
            </div>

            {/* Balance */}
            {balance && (
                <div className="hidden md:block mr-3 py-1.5 px-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="flex items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5 text-purple-400">
                            <polygon points="16 8 8 16 16 16 16 8"></polygon>
                            <polygon points="8 8 8 16 16 8 8 8"></polygon>
                        </svg>
                        <span className="font-medium">{parseFloat(balance?.formatted).toFixed(4)}</span>
                    </div>
                </div>
            )}

            {/* Wallet Menu */}
            <Menu as="div" className="relative">
                <Menu.Button as={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl flex items-center border border-white/10 transition-colors"
                >
                    <span className="mr-2">{shortenAddress(account.address)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-gradient-to-b from-gray-900 to-black border border-white/10 shadow-lg focus:outline-none z-50">
                        <div className="p-2">
                            {/* User details */}
                            <div className="px-3 py-2 mb-1">
                                <p className="text-gray-400 text-xs">Connected Wallet</p>
                                <p className="text-white font-medium truncate">{account.address}</p>
                            </div>

                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={`${supportedNetworks[0].blockExplorers.default.url}/address/${account.address}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`${
                                            active ? 'bg-white/10' : ''
                                        } group flex w-full items-center rounded-lg px-3 py-2.5 text-white transition-colors`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-purple-400 group-hover:text-white">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        View on Explorer
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-white/10' : ''
                                        } group flex w-full items-center rounded-lg px-3 py-2.5 text-white transition-colors`}
                                        onClick={handleCopyAddress}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-purple-400 group-hover:text-white">
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        </svg>
                                        Copy Address
                                    </button>
                                )}
                            </Menu.Item>
                            <div className="h-px bg-white/10 my-1"></div>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-white/10' : ''
                                        } group flex w-full items-center rounded-lg px-3 py-2.5 text-red-400 transition-colors`}
                                        onClick={() => {
                                            disconnect();
                                            toast.info("Wallet disconnected");
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-red-400">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Disconnect
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default WalletConnection;