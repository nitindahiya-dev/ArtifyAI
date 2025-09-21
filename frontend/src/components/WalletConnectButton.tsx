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
    if (window.ethereum?.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
    }

    // Listen for MetaMask initialization
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });
    }

    // Poll for window.ethereum availability
    const interval = setInterval(() => {
      if (hasMetaMask()) {
        setIsInstalled(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
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
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-800"
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
          className="flex items-center space-x-3 bg-gray-900 rounded-full px-4 py-2 cursor-pointer border border-gray-800"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="font-mono text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </motion.div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-white text-black hover:bg-gray-100 border border-gray-800"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-t-2 border-black rounded-full animate-spin mr-2"></div>
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
          className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 rounded-xl p-4 w-64 z-20"
        >
          <div className="font-semibold mb-2">Connected Wallet</div>
          <div className="font-mono text-sm break-all mb-3 text-gray-300">{address}</div>
          <button 
            className="text-sm text-gray-400 hover:text-white"
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