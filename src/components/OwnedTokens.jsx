// import React, { useState } from "react";
// import useMintToken from "../hooks/useMintToken";

// const OwnedTokens = () => {
//     const { ownedTokens, transferToken } = useMintToken();
//     const [recipient, setRecipient] = useState("");

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">My NFTs</h2>
//             {ownedTokens.length > 0 ? (
//                 <ul>
//                     {ownedTokens.map((tokenId) => (
//                         <li key={tokenId} className="mb-2 flex items-center">
//                             <span className="mr-2">Token ID: {tokenId}</span>
//                             <input
//                                 type="text"
//                                 placeholder="Recipient Address"
//                                 value={recipient}
//                                 onChange={(e) => setRecipient(e.target.value)}
//                                 className="ml-2 p-1 border border-gray-300 rounded"
//                             />
//                             <button
//                                 onClick={() => transferToken(recipient, tokenId)}
//                                 disabled={!recipient}
//                                 className="ml-2 px-4 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
//                             >
//                                 Transfer
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No NFTs owned</p>
//             )}
//         </div>
//     );
// };

// export default OwnedTokens;
