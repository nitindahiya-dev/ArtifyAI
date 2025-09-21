import React, { useState } from "react";
import { useRouter } from "next/router";
import UploadCard from "../components/UploadCard";
import ReportView from "../components/ReportView";
import MintForm from "../components/MintForm";
// import WalletConnectButton from "../components/WalletConnectButton";
import { motion } from "framer-motion";

export default function MintPage() {
  const router = useRouter();
  const [report, setReport] = useState<{ score: number; signature?: string; cid: string; prediction: string; similar_works: { path: string; similarity: number }[] } | null>(null);
  const [walletAddress, ] = useState<string | null>(null);

  const handleUpload = (file: File, response: any) => {
    const score = Math.round(response.confidence * 100);
    const signature = response.prediction === "authentic" ? "0xMockSignature" : undefined;
    console.log("Report set:", { score, signature, cid: response.cid, prediction: response.prediction, similar_works: response.similar_works });
    setReport({
      score,
      signature,
      cid: response.cid,
      prediction: response.prediction,
      similar_works: response.similar_works,
    });
  };

  return (
    <div className="relative md:mt-40 z-10 md:container mx-auto md:px-4 md:py-12 max-w-4xl">
      <div className="flex justify-center items-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {report ? "Mint Your Authenticated Artwork" : "Authenticate Your Artwork"}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {report
              ? "Finalize your NFT creation with blockchain verification of your artwork's authenticity"
              : "Upload your artwork to verify its authenticity before minting as an NFT"}
          </p>
        </motion.div>
        {/* <WalletConnectButton onConnect={(address) => setWalletAddress(address)} /> */}
      </div>

      {!report ? (
        <UploadCard onSelect={handleUpload} disabled={!walletAddress} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ReportView report={report} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Mint NFT</h3>
            <MintForm
              cid={report.cid}
              prediction={report.prediction}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
      )}
    </div>
  );
}