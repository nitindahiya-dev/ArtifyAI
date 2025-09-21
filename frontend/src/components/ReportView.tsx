import React from "react";
import { motion } from "framer-motion";

type Report = {
  prediction: string;
  confidence: number; // Backend returns 'confidence' (0-1), not 'score'
  signature?: string;
  cid: string;
  similar_works: { path: string; similarity: number }[];
};

type Props = {
  report?: Report; // Make report optional to handle undefined
};

export default function ReportView({ report }: Props) {
  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return "Exceptional";
    if (score >= 75) return "High";
    if (score >= 50) return "Moderate";
    return "Low";
  };

  const openIpfs = () => {
    if (!report?.cid) return;
    const base = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";
    window.open(`${base.replace(/\/$/, "")}/${report.cid}`, "_blank");
  };

  // If no report, show a placeholder
  if (!report) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl text-center"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-300">No Report Available</h3>
        <p className="text-gray-400">Upload an image to generate an authenticity report.</p>
      </motion.div>
    );
  }

  // Convert confidence (0-1) to score (0-100)
  const score = report.confidence * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6">Authentication Report</h3>
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-lg font-semibold mb-3">Prediction</h4>
          <div className="text-2xl capitalize">{report.prediction}</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-lg font-semibold mb-3">Authenticity Confidence</h4>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-2xl font-bold">{score.toFixed(2)}/100</div>
              <p className="text-gray-400">{getConfidenceLevel(score)} Confidence</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center border border-gray-800">
              <span className="text-lg font-bold">{Math.round(score)}</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div className="bg-white h-2.5 rounded-full" style={{ width: `${score}%` }} />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
        {report.signature && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">Digital Signature</h4>
            <div className="font-mono text-sm bg-black p-4 rounded-lg overflow-x-auto text-gray-300">
              {report.signature}
            </div>
            <p className="text-sm text-gray-400 mt-3">
              This cryptographic signature verifies the authenticity of your report
            </p>
          </div>
        )}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-lg font-semibold mb-3">IPFS Storage</h4>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <div className="font-mono text-sm break-all text-gray-300">{report.cid}</div>
              </div>
            </div>
            <button
              className="btn bg-white text-black hover:bg-gray-100 border border-gray-800"
              onClick={openIpfs}
            >
              View on IPFS
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h4 className="text-lg font-semibold mb-3">Similar Works</h4>
          <ul className="space-y-2">
            {report.similar_works.map((work, index) => (
              <li key={index} className="text-gray-300">
                {work.path.split('/').pop()} (Similarity: {(work.similarity * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}