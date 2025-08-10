// frontend/src/components/WalletConnectButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import { connectMetaMask, hasMetaMask } from "../lib/ethers";
import { motion } from "framer-motion";

type Props = {
  onConnect?: (address: string) => void;
};

export default function WalletConnectButton({ onConnect }: Props) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsInstalled(hasMetaMask());
    // Check if wallet is already connected
    if (window.ethereum?.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  async function handleConnect() {
    try {
      setLoading(true);
      const { address } = await connectMetaMask();
      setAddress(address);
      onConnect?.(address);
    } catch (err: any) {
      alert(err.message || "Failed to connect");
    } finally {
      setLoading(false);
    }
  }

  if (!isInstalled) {
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <a
          className="btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          href="https://metamask.io/download.html"
          target="_blank"
          rel="noreferrer"
        >
          Install MetaMask
        </a>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {address ? (
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="flex items-center space-x-3 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full px-4 py-2 cursor-pointer"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="font-mono text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </motion.div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            "Connect Wallet"
          )}
        </motion.button>
      )}
      
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 bg-gray-800 border border-white/10 rounded-xl p-4 w-64 z-20"
        >
          <div className="font-semibold mb-2">Connected Wallet</div>
          <div className="font-mono text-sm break-all mb-3">{address}</div>
          <button 
            className="text-sm text-indigo-400 hover:text-indigo-300"
            onClick={() => {
              navigator.clipboard.writeText(address || "");
              setShowTooltip(false);
            }}
          >
            Copy Address
          </button>
        </motion.div>
      )}
    </div>
  );
}