// pages/terms-of-service.tsx

import React from 'react'
import { motion } from 'framer-motion'
import PolicySection from '../components/PolicySection'

const TermsOfService = () => {
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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <PolicySection title="1. Agreement to Terms">
              <p>
                By accessing or using {"ArtifyAI's"} services, you agree to be bound by these Terms of Service.
                If you disagree with any part of the terms, you may not access our service.
              </p>
            </PolicySection>

            <PolicySection title="2. Intellectual Property Rights">
              <p className="mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property
                of ArtifyAI and its licensors. Our service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                You retain all rights to the artwork you upload to our platform. By using our service, you grant us a license
                to process your artwork through our AI algorithms for the purpose of providing the authentication service.
              </p>
            </PolicySection>

            <PolicySection title="3. User Representations">
              <p className="mb-4">By using the Service, you represent and warrant that:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>You have the legal right to use the artwork you upload</li>
                <li>Your use of the Service does not violate any applicable law or regulation</li>
                <li>You are at least 18 years old</li>
                <li>You will not use the Service for any illegal or unauthorized purpose</li>
                <li>Your use of the Service will not infringe upon the rights of any third party</li>
              </ul>
            </PolicySection>

            <PolicySection title="4. Prohibited Activities">
              <p className="mb-4">
                You may not access or use the Service for any purpose other than that for which we make the Service available.
                The Service may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Service, you agree not to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                <li>Upload artwork that infringes on any copyright, trademark, or other intellectual property rights</li>
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Attempt to bypass any measures of the Service designed to prevent or restrict access</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Use the Service to create or mint NFTs of artwork you do not own or have permission to use</li>
              </ul>
            </PolicySection>

            <PolicySection title="5. Service Fees">
              <p className="mb-4">
                ArtifyAI may charge fees for certain services, such as minting NFTs. All fees will be clearly displayed
                before you complete a transaction. You are responsible for paying all fees and applicable taxes associated
                with your use of the Service.
              </p>
              <p>
                Blockchain network fees (gas fees) are separate from our service fees and are determined by the blockchain network, not ArtifyAI.
              </p>
            </PolicySection>

            <PolicySection title="6. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, in no event will ArtifyAI, its affiliates, or their licensors, service providers,
                employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in
                connection with your use, or inability to use, the Service.
              </p>
            </PolicySection>

            <PolicySection title="7. Governing Law">
              <p>
                These Terms shall be governed by and defined in accordance with the laws of the State of California.
                ArtifyAI and yourself irrevocably consent that the courts of California shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </PolicySection>

            <PolicySection title="8. Changes to Terms">
              <p>
                We reserve the right to make changes to these Terms of Service at any time. We will alert you about any changes
                by updating the {`"Last updated"`} date of these Terms of Service. You are encouraged to periodically review these
                Terms of Service to stay informed of updates.
              </p>
            </PolicySection>

            <PolicySection title="9. Contact Information">
              <p>
                For any questions or concerns regarding the Terms of Service, you may contact us using the following details:
              </p>
              <p className="mt-2">
                ArtifyAI Inc.<br />
                support@artifyai.com<br />
                123 Blockchain Avenue, San Francisco, CA 94103
              </p>
            </PolicySection>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default TermsOfService
