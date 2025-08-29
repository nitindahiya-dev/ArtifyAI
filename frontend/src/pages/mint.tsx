// frontend/src/pages/mint.tsx
import React from "react";
import { useRouter } from "next/router";
import MintForm from "../components/MintForm";
import { motion } from "framer-motion";

export default function MintPage() {
  const router = useRouter();
  const { cid, score, sig } = router.query;

  if (!cid) {
    return (
      <div className="mt-36 bg-black text-white">
        {/* <div className="fixed inset-0 overflow-hidden z-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]"></div>
        </div> */}
        
        <div className="relative z-10 md:container mx-auto md:px-4 md:py-12 max-w-4xl">          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl text-center py-16"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-white text-black flex items-center justify-center mb-6 border border-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Artwork Data Missing</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We {`couldn't`} find the artwork data needed to mint an NFT. 
              Please start from the upload page to authenticate your artwork first.
            </p>
            <button 
              className="btn bg-white text-black hover:bg-gray-100 border border-gray-800"
              onClick={() => router.push("/")}
            >
              Go to Upload Page
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const report = {
    score: Number(score ?? 0),
    signature: typeof sig === "string" ? sig : (sig as string | undefined),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <div className="fixed inset-0 overflow-hidden z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]"></div>
      </div> */}
      
      <div className="relative z-10 md:container mx-auto md:px-4 md:py-12 max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mint Your Authenticated Artwork
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Finalize your NFT creation with blockchain verification of your {`artwork's`} authenticity
          </p>
        </motion.div>
        
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Artwork Details</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-semibold mb-3">IPFS Content Identifier</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div className="font-mono text-sm break-all text-gray-300">
                      {cid}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-lg font-semibold mb-3">Authenticity Score</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">{report.score}/100</div>
                      <div className="text-gray-400">
                        {getConfidenceLevel(report.score)} Confidence
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center border border-gray-800">
                      <span className="text-xl font-bold">{report.score}</span>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${report.score}%` }}
                    ></div>
                  </div>
                </div>
                
                {report.signature && (
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-semibold mb-3">Digital Signature</h4>
                    <div className="font-mono text-xs bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-300">
                      {report.signature}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Mint NFT</h3>
              <MintForm 
                cid={String(cid)} 
                report={report} 
                onMintSuccess={(tx) => {
                  alert(`Successfully minted NFT! Transaction: ${tx}`);
                  router.push("/");
                }} 
              />
              
              <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h4 className="text-lg font-semibold mb-4">Why Mint on ArtifyAI?</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3 mt-1 border border-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Immutable Provenance</div>
                      <p className="text-sm text-gray-400">Permanent record of authenticity on the blockchain</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3 mt-1 border border-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Zero Gas Fees</div>
                      <p className="text-sm text-gray-400">We cover all transaction costs for your mint</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center mr-3 mt-1 border border-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Royalty Program</div>
                      <p className="text-sm text-gray-400">Earn 10% on secondary market sales</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}



const getConfidenceLevel = (score: number) => {
  if (score >= 90) return "Exceptional";
  if (score >= 75) return "High";
  if (score >= 50) return "Moderate";
  return "Low";
};