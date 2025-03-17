import { motion } from "framer-motion";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t border-green-800/30 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-800/20 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/20 rounded-full filter blur-3xl opacity-30"></div>

            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute -top-[20%] -left-[10%] w-[140%] h-[30%] bg-blue-700 transform rotate-12"></div>
                <div className="absolute top-[40%] -left-[10%] w-[140%] h-[30%] bg-red-700 transform -rotate-6"></div>
                <div className="absolute top-[60%] -left-[10%] w-[140%] h-[30%] bg-green-700 transform rotate-6"></div>
            </div>
            
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-yellow-500 flex items-center justify-center mr-3 shadow-lg">
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
                        </div>
                        <p className="text-gray-400 mb-8">
                            Be part of our exclusive NFT Collection, built by the best artist.
                            Each piece is uniquely crafted and securely stored on 
                            the blockchain, ensuring authenticity and provenance.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a 
                                whileHover={{ y: -3 }}
                                href="https://x.com/Lynndabel" 
                                className="bg-green-900/20 hover:bg-green-900/30 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -3 }}
                                href="https://www.facebook.com/ebele.okolocleo/" 
                                className="bg-yellow-900/20 hover:bg-yellow-900/30 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </motion.a>
                            <motion.a 
                                whileHover={{ y: -3 }}
                                href="https://www.instagram.com/lynncode_/" 
                                className="bg-red-900/20 hover:bg-red-900/30 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </motion.a>
                            {/* <motion.a 
                                whileHover={{ y: -3 }}
                                href="#" 
                                className="bg-blue-900/20 hover:bg-blue-900/30 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </motion.a> */}
                            <motion.a 
                                whileHover={{ y: -3 }}
                                href="https://github.com/Lynndabel" 
                                className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </motion.a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Explore
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Marketplace
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Artists
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Collections
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Platform Status
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Partners
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Newsletter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="w-full h-1 flex mt-12 mb-8">
                    <div className="w-1/6 h-full bg-red-600"></div>
                    <div className="w-1/6 h-full bg-blue-600"></div>
                    <div className="w-1/6 h-full bg-green-600"></div>
                    <div className="w-1/6 h-full bg-yellow-500"></div>
                    <div className="w-1/6 h-full bg-black"></div>
                    <div className="w-1/6 h-full bg-white"></div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} LynndabelNFT Vault. Built with ❤️ by Cohort XII. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;