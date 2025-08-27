// frontend/src/components/MintForm.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { connectMetaMask, getContract } from "../lib/ethers";
import type { AIReport } from "../types";
import { motion } from "framer-motion";

type Props = {
  cid: string;
  report: AIReport;
  onMintSuccess?: (txHash: string, tokenId?: string) => void;
};

export default function MintForm({ cid, report, onMintSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  async function handleMint() {
    if (!cid) return alert("CID missing");
    if (!report) return alert("Report missing");
    
    try {
      setLoading(true);
      setStep(1);
      
      const { provider } = await connectMetaMask();
      const signer = provider.getSigner();
      const contract = getContract(signer);
      
      setStep(2);
      
      const sig = report.signature ?? "0x";
      const score = Math.max(0, Math.min(255, Math.round(report.score)));
      
      setStep(3);
      
      const tx = await contract.mintWithReport(await signer.getAddress(), cid, score, sig, {
        value: ethers.utils.parseEther("0"),
      });
      
      setStep(4);
      const receipt = await tx.wait();
      
      setStep(5);
      let tokenId: string | undefined;
      try {
        const mintedEvent = receipt.events?.find((e: any) => e.event === "Transfer" && e.args && e.args[1]);
        if (mintedEvent) tokenId = mintedEvent.args[2]?.toString();
      } catch {}
      
      onMintSuccess?.(receipt.transactionHash, tokenId);
      alert(`Successfully minted NFT! Transaction: ${receipt.transactionHash}`);
      
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Mint failed");
    } finally {
      setLoading(false);
      setStep(0);
    }
  }

  const steps = [
    "Ready to mint",
    "Connecting wallet",
    "Preparing transaction",
    "Signing request",
    "Processing transaction",
    "Success! NFT created"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-bold mb-4">Create Verifiable NFT</h3>
      
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Blockchain Authentication</h4>
            <p className="text-gray-400">
              Mint your artwork as an NFT with embedded authenticity data on the blockchain
            </p>
          </div>
          
          <button 
            className="btn bg-white text-black hover:bg-gray-100 border border-gray-800 w-full md:w-auto py-3 px-8"
            onClick={handleMint}
            disabled={loading}
          >
            {loading ? "Processing..." : "Mint NFT"}
          </button>
        </div>
        
        {loading && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>Step {step} of 5</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className="bg-white h-2.5 rounded-full" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center text-gray-400">
              {steps[step]}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center mr-3 border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Immutable Record</div>
            <div className="text-sm text-gray-400">Permanently stored</div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center mr-3 border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Gas-Free Minting</div>
            <div className="text-sm text-gray-400">No transaction fees</div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center mr-3 border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Cross-Chain</div>
            <div className="text-sm text-gray-400">Polygon & Ethereum</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}