"use client";

import React, { useState, useEffect } from "react";
import { connectMetaMask, hasMetaMask } from "../lib/ethers";

type Props = {
  onConnect?: (address: string) => void;
};

export default function WalletConnectButton({ onConnect }: Props) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Detect MetaMask only on client-side
  useEffect(() => {
    setIsInstalled(hasMetaMask());
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
      <a
        className="btn-ghost"
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noreferrer"
      >
        Install MetaMask
      </a>
    );
  }

  return (
    <div>
      {address ? (
        <div className="flex items-center space-x-3">
          <div className="small">Connected:</div>
          <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
            {address}
          </div>
        </div>
      ) : (
        <button className="btn" onClick={handleConnect} disabled={loading}>
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}
