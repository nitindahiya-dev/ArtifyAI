// pages/cookie-policy.tsx
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PolicySection from '../components/PolicySection'

const CookiePolicy = () => {
  return (
    <div className="text-white">
      <main className="container mx-auto md:px-4 pt-12 max-w-4xl md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl pt-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <PolicySection title="1. What Are Cookies">
              <p>
                As is common practice with almost all professional websites, this site uses cookies, which are tiny files
                that are downloaded to your computer, to improve your experience. This page describes what information they
                gather, how we use it, and why we sometimes need to store these cookies.
              </p>
            </PolicySection>

            <PolicySection title="2. How We Use Cookies">
              <p className="mb-4">
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry
                standard options for disabling cookies without completely disabling the functionality and features they add to this site.
              </p>
              <p>
                It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
              </p>
            </PolicySection>

            <PolicySection title="3. Types of Cookies We Use">
              <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are essential to provide you with services available through our website and to enable you to use some of its features.
                Without these cookies, the services that you have asked for cannot be provided, and we only use these cookies to provide you with those services.
              </p>

              <h3 className="text-xl font-medium mb-2">Functionality Cookies</h3>
              <p className="mb-4">
                These cookies allow our website to remember choices you make when you use our website. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you use our website.
              </p>

              <h3 className="text-xl font-medium mb-2">Analytics and Performance Cookies</h3>
              <p>
                These cookies are used to collect information about traffic to our website and how users use our website. The information gathered does not identify any individual visitor. The information is aggregated and therefore anonymous.
              </p>
            </PolicySection>

            <PolicySection title="4. Third-Party Cookies">
              <p className="mb-4">
                In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Google Analytics - one of the most widespread and trusted analytics solutions on the web</li>
                <li>Third-party analytics are used to track and measure usage of this site</li>
                <li>We may use social media buttons and/or plugins that allow you to connect with your social network</li>
              </ul>
            </PolicySection>

            <PolicySection title="5. Disabling Cookies">
              <p className="mb-4">
                You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
              </p>
              <p>
                You can learn how to manage cookies in your browser by following the browser-specific instructions:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                <li><Link target='_blank' href={"https://support.google.com/chrome/answer/95647"} className="text-blue-400 hover:underline">Chrome</Link></li>
                <li><Link target='_blank' href={"https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"} className="text-blue-400 hover:underline">Firefox</Link></li>
                <li><Link target='_blank' href={"https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies"} className="text-blue-400 hover:underline">Internet Explorer</Link></li>
                <li><Link target='_blank' href={"https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"} className="text-blue-400 hover:underline">Safari</Link></li>
                <li><Link target='_blank' href={"https://support.microsoft.com/en-gb/help/4027947/windows-delete-cookies"} className="text-blue-400 hover:underline">Edge</Link></li>
              </ul>
            </PolicySection>

            <PolicySection title="6. More Information">
              <p>
                If you are looking for more information, you can contact us through one of our preferred contact methods:
              </p>
              <p className="mt-2">
                Email: privacy@artifyai.com<br />
                Address: 123 Blockchain Avenue, San Francisco, CA 94103
              </p>
            </PolicySection>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default CookiePolicy
