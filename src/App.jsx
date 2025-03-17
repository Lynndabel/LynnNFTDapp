import { useAppContext } from "./contexts/appContext";
import useMintToken from "./hooks/useMintToken";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NFTCard from "./components/NFTCard";
import MyTokens from "./components/Tokens/myToken";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
    const { nextTokenId, tokenMetaData, mintPrice, maxSupply } = useAppContext();
    const tokenMetaDataArray = Array.from(tokenMetaData.values());
    const mintToken = useMintToken();
    const [searchTerm, setSearchTerm] = useState("");
    const { address } = useAccount();
    const [tabIndex, setTabIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for parallax
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== isScrolled) {
                setIsScrolled(isScrolled);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);

    // Calculate stats
    const mintedCount = nextTokenId ? parseInt(nextTokenId.toString()) : 0;
    const totalCount = maxSupply ? parseInt(maxSupply.toString()) : 0;
    const remainingCount = totalCount - mintedCount;
    const percentMinted = totalCount > 0 ? (mintedCount / totalCount) * 100 : 0;

    // Filter NFTs based on search
    const filteredTokens = tokenMetaDataArray.filter((token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Add the ToastContainer component */}
            <ToastContainer />
            
            <Header />
            
            {/* Hero Background with Parallax Effect - South African flag inspired */}
            <div className="absolute top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-green-800/30 to-black"></div>
                <div 
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55')] bg-cover bg-center"
                    style={{ 
                        opacity: 0.2,
                        transform: `translateY(${isScrolled ? 50 : 0}px)`,
                        transition: 'transform 0.5s ease-out'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                
                {/* South African flag-inspired diagonal elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[30%] -left-[10%] w-[140%] h-[30%] bg-red-700 transform rotate-6 opacity-20"></div>
                    <div className="absolute -top-[10%] -left-[10%] w-[140%] h-[30%] bg-blue-700 transform rotate-12 opacity-20"></div>
                    <div className="absolute top-[50%] -left-[10%] w-[140%] h-[30%] bg-green-700 transform -rotate-12 opacity-20"></div>
                </div>
            </div>
            
            <main className="container mx-auto px-4 py-8 pt-32 min-h-[calc(100vh-128px)] relative z-10">
                {/* Hero Section with 3D-like elements */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-24 text-center relative"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="absolute -top-20 -left-10 w-40 h-40 rounded-full bg-green-700/20 blur-3xl"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-red-700/20 blur-3xl"
                    ></motion.div>
                    
                    <motion.h1 
                        className="text-6xl font-extrabold mb-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                            NFT Vault
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Discover rare digital collectibles secured on the blockchain. Mint, collect, and trade
                        extraordinary NFTs crafted by talented artists from around the world.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <button 
                            onClick={() => document.getElementById("collection").scrollIntoView({ behavior: "smooth" })}
                            className="px-8 py-4 bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl text-white font-bold shadow-lg hover:shadow-green-500/30 transition duration-300 transform hover:scale-105"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                </motion.div>

                {/* Stats Section with glass morphism */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-green-900/20 shadow-xl">
                        <h3 className="text-gray-400 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 14V6H4v10h12z" clipRule="evenodd" />
                            </svg>
                            Total Minted
                        </h3>
                        <p className="text-4xl font-bold">{mintedCount} <span className="text-sm text-gray-400">of {totalCount}</span></p>
                        <div className="mt-4 w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentMinted}%` }}
                                transition={{ duration: 1, delay: 1 }}
                                className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full rounded-full" 
                            ></motion.div>
                        </div>
                    </div>
                    
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-yellow-700/20 shadow-xl">
                        <h3 className="text-gray-400 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                            </svg>
                            Remaining
                        </h3>
                        <p className="text-4xl font-bold">{remainingCount}</p>
                        <p className="text-gray-400 mt-4">Available NFTs to mint</p>
                    </div>
                    
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-red-900/20 shadow-xl">
                        <h3 className="text-gray-400 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            Price
                        </h3>
                        <p className="text-4xl font-bold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
                                <polygon points="16 8 8 16 16 16 16 8"></polygon>
                                <polygon points="8 8 8 16 16 8 8 8"></polygon>
                            </svg>
                            {mintPrice ? parseFloat(mintPrice.toString()) / 1e18 : "0"} ETH
                        </p>
                        <p className="text-gray-400 mt-4">Fixed price per NFT</p>
                    </div>
                </motion.div>

                {/* Main Navigation Tabs with enhanced design */}
                <div id="collection" className="pt-8">
                    <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
                        <Tab.List className="flex space-x-1 rounded-xl backdrop-blur-md bg-white/5 p-1.5 mb-8 max-w-md mx-auto">
                            <Tab className={({ selected }) =>
                                `py-2.5 px-8 text-sm font-medium rounded-lg transition-all w-full ${
                                    selected 
                                        ? 'bg-gradient-to-r from-green-600 to-yellow-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`
                            }>
                                Collection
                            </Tab>
                            <Tab className={({ selected }) =>
                                `py-2.5 px-8 text-sm font-medium rounded-lg transition-all w-full ${
                                    selected 
                                        ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`
                            }>
                                My NFTs {address ? '🔓' : '🔒'}
                            </Tab>
                        </Tab.List>

                        <Tab.Panels>
                            {/* Collection Tab Panel */}
                            <Tab.Panel>
                                {/* Sub Tabs for Collection */}
                                <Tab.Group>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                        <Tab.List className="flex space-x-1 rounded-xl bg-white/5 p-1 mb-4 md:mb-0 backdrop-blur-md">
                                            <Tab className={({ selected }) =>
                                                `py-2 px-4 rounded-lg transition-all ${
                                                    selected 
                                                        ? 'bg-gradient-to-r from-green-600 to-yellow-600 text-white shadow-lg'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                                }`
                                            }>
                                                All NFTs
                                            </Tab>
                                            <Tab className={({ selected }) =>
                                                `py-2 px-4 rounded-lg transition-all ${
                                                    selected 
                                                        ? 'bg-gradient-to-r from-yellow-600 to-red-600 text-white shadow-lg'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                                }`
                                            }>
                                                Available
                                            </Tab>
                                            <Tab className={({ selected }) =>
                                                `py-2 px-4 rounded-lg transition-all ${
                                                    selected 
                                                        ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                                }`
                                            }>
                                                Minted
                                            </Tab>
                                        </Tab.List>
                                        
                                        <div className="relative w-full md:w-64">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search NFTs..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <Tab.Panels>
                                        <Tab.Panel>
                                            {/* All NFTs */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                                {filteredTokens.map((token, i) => (
                                                    <NFTCard
                                                        key={`${token.name.split(" ").join("")}-${i}`}
                                                        metadata={token}
                                                        mintPrice={mintPrice}
                                                        tokenId={i}
                                                        nextTokenId={nextTokenId}
                                                        mintNFT={mintToken}
                                                    />
                                                ))}
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            {/* Available NFTs */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                                {filteredTokens.filter((_, i) => nextTokenId && i >= Number(nextTokenId))
                                                    .map((token, idx) => {
                                                        const i = idx + Number(nextTokenId || 0);
                                                        return (
                                                            <NFTCard
                                                                key={`${token.name.split(" ").join("")}-${i}`}
                                                                metadata={token}
                                                                mintPrice={mintPrice}
                                                                tokenId={i}
                                                                nextTokenId={nextTokenId}
                                                                mintNFT={mintToken}
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            {/* Minted NFTs */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                                {filteredTokens.filter((_, i) => nextTokenId && i < Number(nextTokenId))
                                                    .map((token, i) => (
                                                        <NFTCard
                                                            key={`${token.name.split(" ").join("")}-${i}`}
                                                            metadata={token}
                                                            mintPrice={mintPrice}
                                                            tokenId={i}
                                                            nextTokenId={nextTokenId}
                                                            mintNFT={mintToken}
                                                        />
                                                    ))}
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </Tab.Panel>
                            
                            {/* My NFTs Tab Panel */}
                            <Tab.Panel>
                                <MyTokens />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;