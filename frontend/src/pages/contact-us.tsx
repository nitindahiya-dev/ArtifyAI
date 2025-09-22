// pages/contact.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen text-white">
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions about art authentication or need support with your NFTs? 
              We're here to help you every step of the way.
            </p>
          </motion.div>
        </section>

        {/* Contact Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-bold mb-8">Let's Start a Conversation</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-white transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email Us</h3>
                      <p className="text-gray-400">support@artifyai.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-white transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Visit Us</h3>
                      <p className="text-gray-400">123 Art District, San Francisco, CA 94103</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-white transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Response Time</h3>
                      <p className="text-gray-400">Typically within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {['Twitter', 'Discord', 'Telegram', 'GitHub'].map((platform) => (
                      <motion.a
                        key={platform}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      >
                        {platform.charAt(0)}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
              >
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none transition-all"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl focus:border-white focus:outline-none transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black py-4 rounded-xl font-semibold disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-black rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400">Quick answers to common questions</p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "How long does the authentication process take?",
                  answer: "Typically 2-5 minutes depending on the complexity of the artwork and server load."
                },
                {
                  question: "Is there a limit to how many artworks I can authenticate?",
                  answer: "Free users can authenticate up to 5 artworks per month. Premium users have unlimited access."
                },
                {
                  question: "What file formats do you support?",
                  answer: "We support JPG, PNG, WebP, and HEIC formats up to 50MB per file."
                },
                {
                  question: "Can I authenticate digital art created on a computer?",
                  answer: "Yes! Our AI is trained to recognize both traditional and digital art styles."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-white transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}