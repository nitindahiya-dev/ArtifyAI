// frontend/src/components/ReportView.tsx
import React from "react";
import type { AIReport } from "../types";
import { motion } from "framer-motion";

type Props = {
  cid?: string | null;
  report?: AIReport | null;
};

export default function ReportView({ cid, report }: Props) {
  if (!cid && !report) {
    return null;
  }

  function openIpfs() {
    if (!cid) return;
    const base = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";
    window.open(`${base.replace(/\/$/, "")}/${cid}`, "_blank");
  }

  // Get confidence level based on score
  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return "Exceptional";
    if (score >= 75) return "High";
    if (score >= 50) return "Moderate";
    return "Low";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-bold mb-6">Authentication Report</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {report && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-1">Authenticity Confidence</h4>
                <p className="text-indigo-300">{getConfidenceLevel(report.score)} Confidence</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-teal-400 flex items-center justify-center">
                <span className="text-lg font-bold">{report.score}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-700/50 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-teal-400 h-3 rounded-full" 
                style={{ width: `${report.score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-indigo-300">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        )}
        
        {report?.signature && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold mb-3">Digital Signature</h4>
            <div className="font-mono text-sm bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
              {report.signature}
            </div>
            <p className="text-sm text-indigo-300 mt-3">
              This cryptographic signature verifies the authenticity of your report
            </p>
          </div>
        )}
      </div>

      {cid && (
        <div className="mt-8 bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">IPFS Storage</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div className="font-mono text-sm break-all max-w-[60%]">
                  {cid}
                </div>
              </div>
            </div>
            <button 
              className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={openIpfs}
            >
              View on IPFS
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}