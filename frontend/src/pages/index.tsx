// frontend/src/pages/index.tsx
import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import WalletConnectButton from "../components/WalletConnectButton";
import ReportView from "../components/ReportView";
import MintForm from "../components/MintForm";
import type { AIReport, InferenceResult } from "../types";
import { motion } from "framer-motion";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileSelect(f: File) {
    setFile(f);
    setCid(null);
    setReport(null);
    
    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      const url = `${base.replace(/\/$/, "")}/infer`;
      const fd = new FormData();
      fd.append("file", f, f.name);
      const resp = await fetch(url, { method: "POST", body: fd });
      const json = (await resp.json()) as InferenceResult;
      setCid(json.cid);
      setReport(json.report);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 overflow-hidden z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800">
              <PaletteIcon />
            </div>
            <h1 className="text-3xl font-bold">ArtifyAI</h1>
          </div>
          <WalletConnectButton />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Art into Verifiable NFTs
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your artwork, get an AI authenticity report, and mint it as a 
            blockchain-verified NFT with built-in provenance tracking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<ScanIcon />}
            title="AI Analysis"
            description="Our advanced algorithms examine style, technique, and provenance markers"
          />
          <FeatureCard 
            icon={<ShieldIcon />}
            title="Provenance Tracking"
            description="Immutable record of authenticity stored on the blockchain"
          />
          <FeatureCard 
            icon={<NftIcon />}
            title="NFT Minting"
            description="Create verifiable digital collectibles with embedded authenticity data"
          />
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <UploadCard onSelect={handleFileSelect} disabled={loading} />

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center py-12"
            >
              <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Artwork</h3>
              <p className="text-gray-400">Our AI is examining your artwork's unique characteristics...</p>
            </motion.div>
          )}

          <ReportView cid={cid ?? undefined} report={report ?? undefined} />

          {cid && report && (
            <MintForm
              cid={cid}
              report={report}
              onMintSuccess={(tx) => {
                console.log("mint success", tx);
              }}
            />
          )}
        </div>

        <div className="mt-16 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ArtifyAI. Revolutionizing art authentication.</p>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-gray-900 p-6 rounded-xl border border-gray-800"
  >
    <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center mb-4 border border-gray-800">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const NftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);