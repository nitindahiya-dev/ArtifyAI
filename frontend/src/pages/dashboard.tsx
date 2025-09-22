// pages/dashboard.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { connectMetaMask, hasMetaMask } from "@/lib/ethers";
import Image from "next/image";

interface UserProfile {
  username: string;
  bio: string;
  email: string;
  website: string;
  social: {
    twitter: string;
    instagram: string;
  };
}

interface Artwork {
  id: string;
  image: string;
  title: string;
  date: string;
  authenticity: "Authentic" | "Fake" | "Inconclusive";
  confidence: number;
  cid: string;
}

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    bio: "",
    email: "",
    website: "",
    social: { twitter: "", instagram: "" }
  });

  useEffect(() => {
    checkConnection();
    // Load mock data for demo
    setArtworks([
      {
        id: "1",
        image: "/api/placeholder/300/200",
        title: "Sunset Landscape",
        date: "2024-01-15",
        authenticity: "Authentic",
        confidence: 94,
        cid: "QmXyz123..."
      },
      {
        id: "2",
        image: "/api/placeholder/300/200",
        title: "Abstract Composition",
        date: "2024-01-10",
        authenticity: "Fake",
        confidence: 23,
        cid: "QmAbc456..."
      },
      {
        id: "3",
        image: "/api/placeholder/300/200",
        title: "Portrait Study",
        date: "2024-01-05",
        authenticity: "Authentic",
        confidence: 87,
        cid: "QmDef789..."
      }
    ]);
  }, []);

  const checkConnection = async () => {
    if (window.ethereum?.selectedAddress) {
      setIsConnected(true);
      setWalletAddress(window.ethereum.selectedAddress);
      // Load profile from localStorage or API
      const savedProfile = localStorage.getItem(`profile_${window.ethereum.selectedAddress}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  };

  const connectWallet = async () => {
    try {
      const { address } = await connectMetaMask();
      setIsConnected(true);
      setWalletAddress(address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleLogout = () => {
    setIsConnected(false);
    setWalletAddress("");
    setProfile({
      username: "",
      bio: "",
      email: "",
      website: "",
      social: { twitter: "", instagram: "" }
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen text-white">
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
            <p className="text-gray-400 mb-8">Please connect your wallet to access the dashboard</p>
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
    <div className="min-h-screen mt-10 text-white">
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back to your ArtifyAI workspace</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-400">Connected Wallet</p>
                <p className="font-mono">{walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-800 rounded-xl hover:border-gray-600 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Artworks Checked", value: artworks.length, color: "bg-blue-500" },
              { label: "Authentic", value: artworks.filter(a => a.authenticity === "Authentic").length, color: "bg-green-500" },
              { label: "NFTs Minted", value: 2, color: "bg-purple-500" },
              { label: "Success Rate", value: "87%", color: "bg-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-900 rounded-2xl p-2 border border-gray-800 mb-8">
          {[
            { id: "profile", label: "Profile", icon: "👤" },
            { id: "artworks", label: "Artworks Checked", icon: "🎨" },
            { id: "nfts", label: "My NFTs", icon: "🖼️" },
            { id: "settings", label: "Settings", icon: "⚙️" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? "bg-white text-black" : "hover:bg-gray-800"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "profile" && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition-all"
                      >
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Username</label>
                            <input
                              type="text"
                              value={profile.username}
                              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Bio</label>
                          <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none resize-none"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Website</label>
                            <input
                              type="url"
                              value={profile.website}
                              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Twitter</label>
                            <input
                              type="text"
                              value={profile.social.twitter}
                              onChange={(e) => setProfile({ ...profile, social: { ...profile.social, twitter: e.target.value } })}
                              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none"
                              placeholder="@username"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleSaveProfile}
                          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Username</label>
                            <p className="text-lg">{profile.username || "Not set"}</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <p className="text-lg">{profile.email || "Not set"}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Bio</label>
                          <p className="text-lg">{profile.bio || "No bio provided"}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Website</label>
                            <p className="text-lg">{profile.website || "Not set"}</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Twitter</label>
                            <p className="text-lg">{profile.social.twitter || "Not set"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Wallet Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <p className="font-mono text-sm break-all">{walletAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Network</p>
                        <p>Ethereum Mainnet</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 rounded-xl hover:bg-gray-800 transition-all">
                        Upload New Artwork
                      </button>
                      <button className="w-full text-left p-3 rounded-xl hover:bg-gray-800 transition-all">
                        View My NFTs
                      </button>
                      <button className="w-full text-left p-3 rounded-xl hover:bg-gray-800 transition-all">
                        Download Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "artworks" && (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-2xl font-bold">Artworks Checked</h2>
                  <p className="text-gray-400">History of all artworks you've authenticated</p>
                </div>
                
                <div className="divide-y divide-gray-800">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="p-6 hover:bg-gray-800/50 transition-all">
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          width={100}
                          height={100}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{artwork.title}</h3>
                          <p className="text-gray-400">Checked on {artwork.date}</p>
                          <p className="text-sm">CID: {artwork.cid}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            artwork.authenticity === "Authentic" 
                              ? "bg-green-500/20 text-green-400"
                              : artwork.authenticity === "Fake"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {artwork.authenticity}
                          </span>
                          <span className="text-lg font-semibold">{artwork.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nfts" && (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🖼️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Your Minted NFTs</h3>
                <p className="text-gray-400 mb-6">NFTs you've created through ArtifyAI will appear here</p>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                  Mint Your First NFT
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {['Authentication Results', 'NFT Minting Updates', 'Platform News', 'Security Alerts'].map((item) => (
                        <label key={item} className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span>Make profile public</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Show authenticity scores publicly</span>
                      </label>
                    </div>
                  </div>

                  <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}