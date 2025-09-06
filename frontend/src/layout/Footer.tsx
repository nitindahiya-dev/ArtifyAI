import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FacebookIcon, GithubIcon, InstaIcon, PaletteIcon, XIcon } from '@/svg/svgs'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <Link href={'/'}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center border border-gray-800">
                  <PaletteIcon />
                </div>
                <h3 className="text-2xl font-bold">ArtifyAI</h3>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Transforming art authentication through AI and blockchain technology.
              Create verifiable NFTs with embedded authenticity data.
            </p>
            <div className="flex space-x-4">
              <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </Link>
              <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">
                <XIcon />
              </Link>
              <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">
                <InstaIcon />
              </Link>
              <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href={"/"}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href={"/mint"}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Mint NFT</span>
                </Link>
              </li>
              <li>
                <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">Marketplace</Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">Tutorials</Link>
              </li>
              <li>
                <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">API</Link>
              </li>
              <li>
                <Link href={"#!"} className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} ArtifyAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={"privacy-policy"} className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href={"terms-of-service"} className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href={"cookie-policy"} className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer