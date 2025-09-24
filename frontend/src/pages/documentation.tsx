// /projects/ArtifyAI/frontend/src/pages/documentation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Documentation() {
  return (
    <div className="min-h-screen text-white mt-20">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Everything you need to know about using ArtifyAI to authenticate artwork and mint NFTs.
          </p>

          <div className="grid gap-8">
            {/* Overview */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-400">
                ArtifyAI uses AI to authenticate artwork by comparing it against known authentic pieces, stores results on IPFS, and allows minting as NFTs with blockchain-verified provenance.
              </p>
            </div>

            {/* Getting Started */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <ol className="list-decimal pl-6 space-y-4 text-gray-400">
                <li>Install MetaMask and connect your wallet from the header or dashboard.</li>
                <li>Go to the <Link href="/" className="text-blue-400 hover:underline">homepage</Link> and upload an artwork image (JPG/PNG, up to 10MB).</li>
                <li>View the authenticity report and mint your artwork as an NFT.</li>
                <li>Check your <Link href="/dashboard" className="text-blue-400 hover:underline">dashboard</Link> for all authenticated artworks.</li>
              </ol>
            </div>

            {/* Features */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">AI Authentication</h3>
                  <p className="text-gray-400">Uses CLIP model to compare artworks against a reference set with a confidence threshold of 85%.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">IPFS Storage</h3>
                  <p className="text-gray-400">Artworks are pinned to IPFS for decentralized storage, generating a unique CID.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Blockchain Provenance</h3>
                  <p className="text-gray-400">Mint NFTs with embedded authenticity data on Ethereum.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Dashboard</h3>
                  <p className="text-gray-400">Manage your profile, view authenticated artworks, and track minted NFTs.</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">What image formats are supported?</h3>
                  <p className="text-gray-400">JPG and PNG, up to 10MB.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">How is authenticity determined?</h3>
                  <p className="text-gray-400">The AI compares your artwork to known authentic pieces using visual features. A confidence score above 85% indicates authenticity.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Can I mint NFTs without authentication?</h3>
                  <p className="text-gray-400">No, all NFTs minted via ArtifyAI include an authenticity report for provenance.</p>
                </div>
              </div>
            </div>

            {/* For Developers */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">For Developers</h2>
              <p className="text-gray-400 mb-4">
                Integrate with ArtifyAI’s API or contribute to our open-source project.
              </p>
              <div className="flex space-x-4">
                <Link href="/api-docs" className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100">
                  API Documentation
                </Link>
                <Link href="https://github.com/nitindahiya-dev/ArtifyAI" target='_blank' className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}