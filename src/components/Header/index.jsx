import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WalletConnection from "./WalletConnection";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center"
                        >
                            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 via-yellow-500 to-blue-700 flex items-center justify-center mr-3 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M2.42 14.74L13.29 4.3a5.89 5.89 0 0 1 8.7.44l-6.53 6.53a5.87 5.87 0 0 1-8.7-.44"></path>
                                    <path d="M16.57 19.7l-9.9-9.9a5.89 5.89 0 0 1-.44-8.7l6.53 6.53a5.87 5.87 0 0 1 .44 8.7"></path>
                                </svg>
                            </div> */}
                            <div>
                                <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                                    LynndabelNFT Vault
                                </h1>
                                <p className="text-xs text-gray-400">Perfection in Each Piece</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* <nav className="hidden md:flex">
                        <ul className="flex space-x-1">
                            <motion.li whileHover={{ y: -2 }}>
                                <a href="#" className="px-4 py-2 rounded-lg text-white hover:bg-green-600/10 transition-colors">
                                    Home
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ y: -2 }}>
                                <a href="#" className="px-4 py-2 rounded-lg text-white hover:bg-yellow-500/10 transition-colors">
                                    Collection
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ y: -2 }}>
                                <a href="#" className="px-4 py-2 rounded-lg text-white hover:bg-blue-700/10 transition-colors">
                                    Marketplace
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ y: -2 }}>
                                <a href="#" className="px-4 py-2 rounded-lg text-white hover:bg-red-600/10 transition-colors">
                                    Community
                                </a>
                            </motion.li>
                        </ul>
                    </nav> */}

                    <WalletConnection />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
