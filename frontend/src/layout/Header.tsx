import WalletConnectButton from '@/components/WalletConnectButton'
import { CloseIcon, OpenIcon, PaletteIcon } from '@/svg/svgs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const isActive = (path: string) => router.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm  py-4' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group z-50">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800 transition-all group-hover:scale-105 group-hover:shadow-lg">
                <PaletteIcon />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ArtifyAI
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className={`py-2 px-4 rounded-xl transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-white text-black font-medium shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mint" 
                className={`py-2 px-4 rounded-xl transition-all duration-300 ${
                  isActive('/mint') 
                    ? 'bg-white text-black font-medium shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                Mint
              </Link>
            </nav>

            {/* Wallet Connection */}
            <div className="hidden md:block">
              <WalletConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all z-50"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <OpenIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-100 bg-black border-r border-gray-800 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Logo in mobile menu */}
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 mb-10 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800 transition-all group-hover:scale-105">
                    <PaletteIcon />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    ArtifyAI
                  </h1>
                </Link>

                {/* Mobile Navigation Links */}
                <nav className="space-y-4">
                  <Link 
                    href="/" 
                    className={`flex items-center py-4 px-6 rounded-xl transition-all ${
                      isActive('/') 
                        ? 'bg-white text-black font-medium shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">Home</span>
                  </Link>
                  <Link 
                    href="/mint" 
                    className={`flex items-center py-4 px-6 rounded-xl transition-all ${
                      isActive('/mint') 
                        ? 'bg-white text-black font-medium shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">Mint</span>
                  </Link>
                </nav>

                {/* Wallet Connection in Mobile Menu */}
                <div className="mt-10 pt-6 border-t border-gray-800">
                  <WalletConnectButton />
                </div>

                {/* Additional info in mobile menu */}
                <div className="mt-8 text-gray-400 text-sm">
                  <p>Transform your art into verifiable NFTs with AI-powered authentication.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header