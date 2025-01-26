import React, { useState } from 'react';
import { Github, Mail, Send, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    window.location.href = `mailto:omnirealty.ai@twinclouds.site?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2420] to-[#4A4036]">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-light text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-white/80">We'd love to hear from you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Building2 className="h-6 w-6 text-[#8B7355]" />
                  <h2 className="text-2xl font-light text-white">Twinclouds Studio</h2>
                </div>
                <p className="text-white/60">Innovating Real Estate Technology</p>
              </div>

              <div className="space-y-4">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-4 bg-white/5 rounded-lg"
                >
                  <Github className="h-6 w-6" />
                  <span>Follow us on GitHub</span>
                </a>
                
                <a 
                  href="mailto:omnirealty.ai@twinclouds.site"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors p-4 bg-white/5 rounded-lg"
                >
                  <Mail className="h-6 w-6" />
                  <span>omnirealty.ai@twinclouds.site</span>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355] text-white h-32"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B7355] text-white px-6 py-3 rounded hover:bg-[#6B573D] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 