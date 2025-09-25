// pages/api.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function APIDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState('upload');
  const [copiedCode, setCopiedCode] = useState('');

  const endpoints = [
    {
      id: 'upload',
      method: 'POST',
      path: '/upload',
      description: 'Authenticate an artwork image and pin it to IPFS',
      code: `curl -X POST \\
  -F "file=@/path/to/image.jpg" \\
  -F "wallet_address=0x..." \\
  https://api.artify.ai/upload

Response:
{
  "prediction": "authentic",
  "confidence": 0.95,
  "similar_works": [...],
  "cid": "Qm..."
}`
    },
    {
      id: 'artworks',
      method: 'GET',
      path: '/artworks/{wallet_address}',
      description: 'Retrieve all authenticated artworks for a wallet',
      code: `curl https://api.artify.ai/artworks/0x...

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
  }
]`
    },
    {
      id: 'authenticity',
      method: 'GET',
      path: '/authenticity/{cid}',
      description: 'Get authenticity report for a specific artwork',
      code: `curl https://api.artify.ai/authenticity/Qm...

Response:
{
  "authenticity": "authentic",
  "confidence": 0.95,
  "analysis_date": "2025-09-25",
  "similarity_scores": [...]
}`
    }
  ];

  const copyToClipboard = (text: string, endpointId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(endpointId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <>
      {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]"></div>
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

      
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 mt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Integrate ArtifyAI's authentication and NFT capabilities into your applications with our robust API.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Endpoints</h3>
              <nav className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      activeEndpoint === endpoint.id 
                        ? 'bg-white text-black' 
                        : 'hover:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{endpoint.method}</span>
                      <span className="truncate">{endpoint.path}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <Link href="/documentation" className="block px-4 py-2 hover:bg-gray-800 rounded-xl transition-all">
                  📖 Documentation
                </Link>
                <Link href="/contact-us" className="block px-4 py-2 hover:bg-gray-800 rounded-xl transition-all">
                  📞 Support
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeEndpoint}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Authentication Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-6">Authentication</h2>
              <p className="text-gray-300 mb-6">
                Use MetaMask to sign a message and include it in the Authorization header for API access.
              </p>
              
              <div className="bg-black rounded-xl p-6 border border-gray-800 relative">
                <button
                  onClick={() => copyToClipboard(`const { ethers } = require("ethers");
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const signature = await signer.signMessage("ArtifyAI API Access");
const headers = { Authorization: \`Signature \${signature}\` };`, 'auth')}
                  className="absolute top-4 right-4 px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-all"
                >
                  {copiedCode === 'auth' ? 'Copied!' : 'Copy'}
                </button>
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`const { ethers } = require("ethers");
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const signature = await signer.signMessage("ArtifyAI API Access");
const headers = { Authorization: \`Signature \${signature}\` };`}
                </pre>
              </div>
            </motion.div>

            {/* Active Endpoint */}
            <AnimatePresence mode="wait">
              {endpoints.map((endpoint) => (
                endpoint.id === activeEndpoint && (
                  <motion.div
                    key={endpoint.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`px-4 py-2 rounded-xl font-mono ${
                        endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                        endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {endpoint.method}
                      </div>
                      <h2 className="text-2xl font-bold font-mono">{endpoint.path}</h2>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-lg">{endpoint.description}</p>

                    <div className="bg-black rounded-xl p-6 border border-gray-800 relative">
                      <button
                        onClick={() => copyToClipboard(endpoint.code, endpoint.id)}
                        className="absolute top-4 right-4 px-3 py-1 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-all"
                      >
                        {copiedCode === endpoint.id ? 'Copied!' : 'Copy'}
                      </button>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
                        {endpoint.code}
                      </pre>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-4">Need API Access?</h2>
              <p className="text-gray-400 mb-6">
                Get your API keys and start integrating ArtifyAI into your applications today.
              </p>
              <Link href="/contact-us" className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Request API Access
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

    </>
  );
}