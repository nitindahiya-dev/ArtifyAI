// frontend/src/pages/index.tsx
import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import ReportView from "../components/ReportView";
import MintForm from "../components/MintForm";
import type { AIReport, InferenceResult } from "../types";
import { motion } from "framer-motion";
import { NftIcon, ScanIcon, ShieldIcon } from "@/svg/svgs";
import FeatureCard from "@/components/FeatureCard";

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
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Analysis failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black text-white mt-36">
      {/* Subtle grid background
      <div className="fixed inset-0 overflow-hidden z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]"></div>
      </div> */}

      <div className="relative z-10 md:container mx-auto md:px-4 md:py-12 max-w-4xl">
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

        <div className="bg-gray-900 rounded-2xl p-4  md:p-8 border border-gray-800 shadow-2xl">
          <UploadCard onSelect={handleFileSelect} disabled={loading} />

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center py-12"
            >
              <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Artwork</h3>
              <p className="text-gray-400">Our AI is examining your {`artwork's`} unique characteristics...</p>
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
      </div>
    </div>
  );
}

