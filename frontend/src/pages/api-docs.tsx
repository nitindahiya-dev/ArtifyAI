// /projects/ArtifyAI/frontend/src/pages/api.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function APIDocs() {
  return (
    <div className="min-h-screen text-white mt-20">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">API Documentation</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Integrate ArtifyAI’s authentication and NFT minting capabilities into your application.
          </p>

          <div className="grid gap-8">
            {/* Overview */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
              <p className="text-gray-400">
                The ArtifyAI API allows developers to authenticate artworks and retrieve user data. Authentication requires a MetaMask signature.
              </p>
              <Link href="/contact-us" className="mt-4 inline-block bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100">
                Request API Access
              </Link>
            </div>

            {/* Endpoints */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">POST /upload</h3>
                  <p className="text-gray-400 mb-4">Authenticate an artwork image and pin it to IPFS.</p>
                  <pre className="bg-black p-4 rounded-xl text-sm text-gray-300">
                    {`curl -X POST \\
  -F "file=@/path/to/image.jpg" \\
  -F "wallet_address=0x..." \\
  http://api.artify.ai/upload
Response:
{
  "prediction": "authentic",
  "confidence": 0.95,
  "similar_works": [...],
  "cid": "Qm..."
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{`GET /artworks/{wallet_address}`}</h3>
                  <p className="text-gray-400 mb-4">Retrieve all authenticated artworks for a wallet.</p>
                  <pre className="bg-black p-4 rounded-xl text-sm text-gray-300">
                    {`curl http://api.artify.ai/artworks/0x...
Response:
[
  {
    "id": "1",
    "title": "Artwork.jpg",
    "date": "2025-09-25",
    "authenticity": "authentic",
    "confidence": 95,
    "cid": "Qm...",
    "image": "https://ipfs.io/ipfs/Qm..."
  },
  ...
]`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <p className="text-gray-400 mb-4">
                Use MetaMask to sign a message and include it in the Authorization header.
              </p>
              <pre className="bg-black p-4 rounded-xl text-sm text-gray-300">
                {`const { ethers } = require("ethers");
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const signature = await signer.signMessage("ArtifyAI API Access");
const headers = { Authorization: \`Signature \${signature}\` };
fetch("http://api.artify.ai/artworks/0x...", { headers });`}
              </pre>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}