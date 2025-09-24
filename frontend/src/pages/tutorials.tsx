// /projects/ArtifyAI/frontend/src/pages/tutorials.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Tutorials() {
  return (
    <div className="min-h-screen text-white mt-20">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">Tutorials</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Learn how to use ArtifyAI with step-by-step guides and videos.
          </p>

          <div className="grid gap-8">
            {/* For Artists */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">For Artists</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">How to Authenticate Your Artwork</h3>
                  <p className="text-gray-400 mb-4">Follow these steps to upload and authenticate your artwork.</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-400">
                    <li>Go to the <Link href="/" className="text-blue-400 hover:underline">homepage</Link>.</li>
                    <li>Click "Upload Your Artwork" and select a JPG/PNG image.</li>
                    <li>Wait for the AI analysis to complete.</li>
                    <li>View the authenticity report and similar works.</li>
                  </ol>
                  <Link href="/" className="mt-4 inline-block bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100">
                    Try Now
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Minting Your First NFT</h3>
                  <p className="text-gray-400 mb-4">Turn your authenticated artwork into an NFT.</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-400">
                    <li>Connect your MetaMask wallet.</li>
                    <li>Upload and authenticate your artwork.</li>
                    <li>Click "Mint NFT" in the report view.</li>
                    <li>Confirm the transaction in MetaMask.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Video Tutorials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Getting Started with ArtifyAI</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video
                      className="w-full h-48 rounded-xl"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Minting NFTs</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video
                      className="w-full h-48 rounded-xl"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}