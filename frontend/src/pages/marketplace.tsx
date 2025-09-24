// /projects/ArtifyAI/frontend/src/pages/marketplace.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { connectMetaMask, hasMetaMask } from '@/lib/ethers';

interface NFT {
  id: string;
  image: string;
  title: string;
  authenticity: string;
  confidence: number;
  cid: string;
  price?: string; // In ETH
}

export default function Marketplace() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    checkConnection();
    // Mock NFT data (replace with blockchain/contract fetch)
    setNfts([
      {
        id: '1',
        image: 'https://ipfs.io/ipfs/Qm...',
        title: 'Sunset Landscape',
        authenticity: 'Authentic',
        confidence: 94,
        cid: 'QmXyz123...',
        price: '0.1 ETH',
      },
      {
        id: '2',
        image: 'https://ipfs.io/ipfs/Qm...',
        title: 'Abstract Composition',
        authenticity: 'Authentic',
        confidence: 87,
        cid: 'QmAbc456...',
        price: '0.05 ETH',
      },
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

  if (!isConnected) {
    return (
      <div className="min-h-screen text-white mt-20">
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">Please connect your wallet to access the marketplace</p>
            <button
              onClick={connectWallet}
              className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Connect Wallet
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white mt-20">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">NFT Marketplace</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Browse and purchase authenticated NFTs created with ArtifyAI.
          </p>

          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-800 rounded-xl hover:bg-gray-700">All</button>
              <button className="px-4 py-2 bg-gray-800 rounded-xl hover:bg-gray-700">Authentic</button>
              <button className="px-4 py-2 bg-gray-800 rounded-xl hover:bg-gray-700">Newest</button>
            </div>
            <div>
              <p className="text-sm text-gray-400">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div key={nft.id} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:shadow-lg transition-all">
                <Image
                  src={nft.image}
                  alt={nft.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold">{nft.title}</h3>
                <p className="text-gray-400 text-sm">Authenticity: {nft.authenticity} ({nft.confidence}%)</p>
                <p className="text-gray-400 text-sm">CID: {nft.cid.slice(0, 10)}...</p>
                <p className="text-white font-bold mt-2">{nft.price}</p>
                <button className="mt-4 w-full bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-100">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}