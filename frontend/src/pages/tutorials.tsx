// pages/tutorials.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Tutorials() {
  const [activeCategory, setActiveCategory] = useState('artists');

  const categories = {
    artists: {
      title: 'For Artists',
      icon: '🎨',
      tutorials: [
        {
          title: 'How to Authenticate Your Artwork',
          steps: [
            'Go to the homepage and click "Upload Your Artwork"',
            'Select a JPG/PNG image (up to 10MB)',
            'Wait for AI analysis to complete (typically 2-5 minutes)',
            'Review the authenticity report and confidence score',
            'Optionally mint as an NFT with embedded provenance'
          ],
          duration: '5 minutes',
          difficulty: 'Beginner'
        },
        {
          title: 'Minting Your First NFT',
          steps: [
            'Ensure your wallet is connected',
            'Complete the authentication process',
            'Click "Mint NFT" in the report view',
            'Confirm the transaction in your wallet',
            'View your NFT in the dashboard'
          ],
          duration: '3 minutes',
          difficulty: 'Beginner'
        }
      ]
    },
    collectors: {
      title: 'For Collectors',
      icon: '🏛️',
      tutorials: [
        {
          title: 'Verifying Artwork Authenticity',
          steps: [
            'Browse the marketplace or upload an image',
            'Check the authenticity certificate',
            'Review the confidence score and similar works',
            'Verify blockchain provenance records',
            'Make informed purchasing decisions'
          ],
          duration: '3 minutes',
          difficulty: 'Beginner'
        }
      ]
    },
    developers: {
      title: 'For Developers',
      icon: '👨‍💻',
      tutorials: [
        {
          title: 'API Integration Guide',
          steps: [
            'Request API access keys',
            'Set up authentication with wallet signatures',
            'Use the /upload endpoint for authentication',
            'Retrieve user artwork data via API',
            'Implement real-time status updates'
          ],
          duration: '15 minutes',
          difficulty: 'Intermediate'
        }
      ]
    }
  };

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
            Tutorials
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master ArtifyAI with our step-by-step guides, video tutorials, and expert tips for artists, collectors, and developers.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all ${
                activeCategory === key 
                  ? 'bg-white text-black' 
                  : 'bg-gray-900 border border-gray-800 hover:border-white'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="font-semibold">{category.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Tutorials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {categories[activeCategory as keyof typeof categories].tutorials.map((tutorial, index) => (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={tutorial.title}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-white transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{tutorial.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>⏱️ {tutorial.duration}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>

                <ol className="space-y-3 mb-6">
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="flex space-x-4">
                  <Link href="/" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                    Try Now
                  </Link>
                  <button className="border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-white transition-all">
                    Watch Video
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Video Tutorials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gray-900 rounded-2xl p-8 border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Video Tutorials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Getting Started with ArtifyAI',
                description: 'Complete walkthrough of the authentication process',
                duration: '8:24'
              },
              {
                title: 'Advanced NFT Minting Techniques',
                description: 'Tips for optimizing your NFT listings and metadata',
                duration: '12:45'
              },
              {
                title: 'API Integration Deep Dive',
                description: 'Technical guide for developers integrating our API',
                duration: '18:32'
              },
              {
                title: 'Marketplace Best Practices',
                description: 'How to maximize your artwork visibility and sales',
                duration: '10:15'
              }
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-white transition-all cursor-pointer group"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">▶️</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-400">{video.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Connect with other artists, collectors, and developers. Share your experiences and learn from the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Discord Community
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-white transition-all">
              YouTube Channel
            </button>
          </div>
        </motion.div>
      </main>

    </>
  );
}