import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { NftIcon, ScanIcon, ShieldIcon } from "@/svg/svgs";
import Link from "next/link";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const steps = [
    {
      title: "Upload Your Artwork",
      description: "Simply drag and drop your artwork or click to browse. Our system accepts high-resolution images where every detail matters for accurate authentication.",
      icon: <span className="inline-block w-8 h-8 bg-gray-500 rounded-full" />, // Placeholder for UploadIcon
      duration: "~30 seconds",
      features: ["Drag & Drop Interface", "Multiple Format Support", "Instant Preview"]
    },
    {
      title: "AI Analysis & Authentication",
      description: "Our advanced neural networks analyze brushstrokes, color patterns, and artistic style against millions of data points to determine authenticity with 99.7% accuracy.",
      icon: <ScanIcon />,
      duration: "~2 minutes",
      features: ["Style Recognition", "Provenance Tracking", "Pattern Analysis"]
    },
    {
      title: "Comprehensive Report Generation",
      description: "Receive a detailed authenticity certificate with cryptographic signature, confidence score, and historical context—all stored immutably on the blockchain.",
      icon: <ShieldIcon />,
      duration: "~Instant",
      features: ["Digital Signature", "Confidence Scoring", "Blockchain Timestamp"]
    },
    {
      title: "Mint as Verifiable NFT",
      description: "Transform your authenticated artwork into a blockchain-verified NFT with zero gas fees. Your art gains permanent provenance and becomes collectible instantly.",
      icon: <NftIcon />,
      duration: "~1 minute",
      features: ["Gas-Free Minting", "IPFS Storage", "Royalty Setup"]
    }
  ];

  const features = [
    {
      icon: <ShieldIcon />,
      title: "Military-Grade Security",
      description: "End-to-end encryption and blockchain immutability ensure your artwork's provenance is protected forever.",
      stat: "100% Secure"
    },
    {
      icon: <ScanIcon />,
      title: "AI-Powered Analysis",
      description: "Leveraging cutting-edge machine learning trained on millions of artworks for unparalleled accuracy.",
      stat: "99.7% Accuracy"
    },
    {
      icon: <NftIcon />,
      title: "Instant Verification",
      description: "From upload to verified NFT in under 5 minutes. The fastest authentication pipeline in the industry.",
      stat: "<5 Minutes"
    }
  ];

  return (
    <div className="min-h-screen  text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
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
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              How ArtifyAI Works
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming your artwork into blockchain-verified NFTs through an elegant, secure, and revolutionary process
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/" className="btn bg-white text-black hover:bg-gray-100 border border-gray-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Start Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Process Timeline */}
        <section ref={sectionRef} className="py-20 px-4">
          <motion.div 
            style={{ opacity, scale }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              The Art Authentication Process
            </h2>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gray-800 via-white to-gray-800"></div>
              
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center mb-20 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <motion.div 
                      className={`bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer ${
                        activeStep === index ? 'scale-105 shadow-2xl' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-black mb-4 ${
                        index % 2 === 0 ? 'float-right ml-4' : 'float-left mr-4'
                      }`}>
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 text-sm text-gray-500">Duration: {step.duration}</div>
                    </motion.div>
                  </div>
                  
                  {/* Step Indicator */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-black">
                    <span className="text-black font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Spacer */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">See It In Action</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-6">Real-time Authentication Demo</h3>
                <p className="text-gray-400 mb-8">
                  Watch as our AI analyzes artwork in real-time, detecting patterns, styles, and authenticity markers that are invisible to the human eye.
                </p>
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer"
                      whileHover={{ x: 10 }}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.duration}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-black rounded-2xl p-8 border border-gray-800 h-96 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-6xl mb-4">{steps[activeStep].icon}</div>
                      <h4 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h4>
                      <p className="text-gray-400">{steps[activeStep].description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Artists Choose ArtifyAI</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-white transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {feature.stat}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Authenticate Your Art?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of artists who have transformed their creations into verified digital assets with ArtifyAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn bg-white text-black hover:bg-gray-100 border border-gray-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Start Free Authentication
              </Link>
              <Link href="/contact-us" className="btn bg-transparent text-white border border-gray-600 hover:border-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Schedule Demo
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}