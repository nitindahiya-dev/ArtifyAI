// pages/marketplace.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { connectMetaMask, hasMetaMask } from '@/lib/ethers';

interface NFT {
  id: string;
  image: string;
  title: string;
  artist: string;
  authenticity: string;
  confidence: number;
  cid: string;
  price: string;
  likes: number;
  views: number;
}

export default function Marketplace() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    checkConnection();
    // Mock NFT data
    setNfts([
      {
        id: '1',
        image: '/api/placeholder/400/300',
        title: 'Sunset Landscape',
        artist: 'Alex Chen',
        authenticity: 'Authentic',
        confidence: 94,
        cid: 'QmXyz123...',
        price: '0.1 ETH',
        likes: 42,
        views: 128
      },
      {
        id: '2',
        image: '/api/placeholder/400/300',
        title: 'Abstract Composition',
        artist: 'Maria Rodriguez',
        authenticity: 'Authentic',
        confidence: 87,
        cid: 'QmAbc456...',
        price: '0.05 ETH',
        likes: 28,
        views: 95
      },
      {
        id: '3',
        image: '/api/placeholder/400/300',
        title: 'Portrait Study',
        artist: 'James Wilson',
        authenticity: 'Authentic',
        confidence: 92,
        cid: 'QmDef789...',
        price: '0.15 ETH',
        likes: 67,
        views: 210
      }
    ]);
  }, []);

  const checkConnection = async () => {
    if (window.ethereum?.selectedAddress) {
      setIsConnected(true);
      setWalletAddress(window.ethereum.selectedAddress);
    }
  };

  const connectWallet = async () => {
    try {
      const { address } = await connectMetaMask();
      setIsConnected(true);
      setWalletAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const filteredNfts = nfts.filter(nft => 
    filter === 'all' || nft.authenticity.toLowerCase() === filter
  );

  const sortedNfts = [...filteredNfts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
      case 'popular': return b.likes - a.likes;
      default: return 0;
    }
  });

  if (!isConnected) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Connect to Marketplace</h2>
            <p className="text-gray-400 mb-8">Connect your wallet to browse and purchase authenticated NFTs</p>
            <button
              onClick={connectWallet}
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Connect Wallet
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]"></div>

      
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 mt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            NFT Marketplace
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover and collect authenticated NFTs with verified provenance. Every artwork comes with an ArtifyAI authenticity certificate.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total NFTs', value: '1,247', change: '+12%' },
            { label: 'Authentic Rate', value: '98.3%', change: '+2.1%' },
            { label: 'Active Artists', value: '284', change: '+8%' },
            { label: 'Volume Traded', value: '542 ETH', change: '+23%' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-green-400 text-sm">{stat.change}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex flex-wrap gap-2">
            {['all', 'authentic', 'trending', 'new'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-xl capitalize transition-all ${
                  filter === filterOption 
                    ? 'bg-white text-black' 
                    : 'bg-gray-900 border border-gray-800 hover:border-white'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {sortedNfts.map((nft, index) => (
              <motion.div
                key={nft.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-white transition-all group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {nft.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-green-500/20 text-green-400 rounded-full px-3 py-1 text-sm">
                    {nft.confidence}% Authentic
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{nft.title}</h3>
                  <p className="text-gray-400 mb-4">by {nft.artist}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>❤️ {nft.likes}</span>
                      <span>👁️ {nft.views}</span>
                    </div>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">CID: {nft.cid.slice(0, 8)}...</span>
                  </div>
                  
                  <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                    Purchase Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {sortedNfts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">No NFTs Found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more results</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Art?</h2>
          <p className="text-gray-400 mb-6">
            Authenticate your artwork and list it on our marketplace to reach collectors worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Authenticate & List
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:border-white transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
      </main>


    </>
  );
}