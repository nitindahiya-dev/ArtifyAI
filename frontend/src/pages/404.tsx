// pages/404.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mt-20 text-white overflow-hidden">
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
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />


      
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Artwork Not Found
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              It seems this masterpiece has either been moved, authenticated elsewhere, 
              or is waiting to be discovered. Let's guide you back to your creative journey.
            </p>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="w-48 h-48 mx-auto relative">
              {/* Canvas Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-2xl border-4 border-gray-800 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
              
              {/* Broken Corner Effect */}
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0],
                  x: [0, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-sm">!</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                Return to Gallery
              </motion.div>
            </Link>
            
            <Link href="/how-it-works">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-white hover:bg-gray-900 transition-all duration-300 cursor-pointer"
              >
                Learn How It Works
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Links */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-6">Popular Destinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: "/", label: "Home", icon: "🏠" },
                { href: "/dashboard", label: "Dashboard", icon: "📊" },
                { href: "/contact", label: "Contact", icon: "📞" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <Link href={link.href}>
                    <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer group">
                      <span className="text-2xl">{link.icon}</span>
                      <span className="group-hover:text-white transition-colors">{link.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Error Code Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 p-6 bg-gray-900/30 rounded-2xl border border-gray-800 max-w-md mx-auto"
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>Error Code: 404</span>
              <span>•</span>
              <span>Page Not Found</span>
              <span>•</span>
              <span>ArtifyAI System</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

    </div>
  );
}