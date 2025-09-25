// pages/documentation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: 'ArtifyAI uses advanced AI to authenticate artwork by comparing it against known authentic pieces, stores results on IPFS, and allows minting as NFTs with blockchain-verified provenance.',
      icon: '📖'
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: [
        'Install MetaMask and connect your wallet from the header or dashboard.',
        'Go to the homepage and upload an artwork image (JPG/PNG, up to 10MB).',
        'View the authenticity report and mint your artwork as an NFT.',
        'Check your dashboard for all authenticated artworks.'
      ],
      icon: '🚀'
    },
    {
      id: 'features',
      title: 'Features',
      content: [
        {
          title: 'AI Authentication',
          description: 'Uses CLIP model to compare artworks against a reference set with a confidence threshold of 85%.',
          icon: '🤖'
        },
        {
          title: 'IPFS Storage',
          description: 'Artworks are pinned to IPFS for decentralized storage, generating a unique CID.',
          icon: '💾'
        },
        {
          title: 'Blockchain Provenance',
          description: 'Mint NFTs with embedded authenticity data on Ethereum.',
          icon: '⛓️'
        },
        {
          title: 'Dashboard',
          description: 'Manage your profile, view authenticated artworks, and track minted NFTs.',
          icon: '📊'
        }
      ],
      icon: '⭐'
    }
  ];

  const faqs = [
    {
      question: "What image formats are supported?",
      answer: "JPG and PNG, up to 10MB. We recommend high-quality images for the most accurate authentication."
    },
    {
      question: "How is authenticity determined?",
      answer: "Our AI compares your artwork to known authentic pieces using visual features. A confidence score above 85% indicates authenticity."
    },
    {
      question: "Can I mint NFTs without authentication?",
      answer: "No, all NFTs minted via ArtifyAI include an authenticity report for provenance and trust."
    },
    {
      question: "Is my artwork data secure?",
      answer: "Yes, we use end-to-end encryption and store only necessary metadata. Your original artwork files are secure."
    }
  ];

  return (
    <>
      {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
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
            Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about using ArtifyAI to authenticate artwork and mint NFTs. 
            Master the platform with our comprehensive guides.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id 
                        ? 'bg-white text-black' 
                        : 'hover:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}
                <Link href="/api-docs">
                  <div className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800 text-gray-400 transition-all">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🔌</span>
                      <span>API Reference</span>
                    </div>
                  </div>
                </Link>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            <AnimatePresence mode="wait">
              {activeSection === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center text-2xl">
                      📖
                    </div>
                    <h2 className="text-3xl font-bold">Overview</h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    ArtifyAI revolutionizes art authentication by combining cutting-edge artificial intelligence with blockchain technology. 
                    Our platform provides artists, collectors, and galleries with a trustworthy system to verify artwork authenticity 
                    and create blockchain-verified NFTs with embedded provenance data.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold mb-3">For Artists</h3>
                      <p className="text-gray-400">
                        Protect your creations and establish verifiable provenance for your digital and physical artwork.
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold mb-3">For Collectors</h3>
                      <p className="text-gray-400">
                        Verify authenticity before purchasing and maintain permanent records of your collection's provenance.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'getting-started' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center text-2xl">
                      🚀
                    </div>
                    <h2 className="text-3xl font-bold">Getting Started</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {sections.find(s => s.id === 'getting-started')?.content.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-gray-300 text-lg">{step}</p>
                          {index === 1 && (
                            <Link href="/" className="inline-block mt-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
                              Start Authentication
                            </Link>
                          )}
                          {index === 3 && (
                            <Link href="/dashboard" className="inline-block mt-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
                              View Dashboard
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'features' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center text-2xl">
                      ⭐
                    </div>
                    <h2 className="text-3xl font-bold">Features</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {sections.find(s => s.id === 'features')?.content.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-white transition-all"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">{feature.icon}</span>
                          <h3 className="text-xl font-semibold">{feature.title}</h3>
                        </div>
                        <p className="text-gray-400">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-white transition-all cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Join thousands of artists and collectors who trust ArtifyAI for artwork authentication and NFT creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                  Start Authenticating
                </Link>
                <Link href="/contact-us" className="border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-white transition-all">
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

    </>
  );
}