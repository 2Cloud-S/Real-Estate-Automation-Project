import React from 'react';
import { Navigation } from '../components/Navigation';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2420] to-[#4A4036]">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="h-8 w-8 text-[#8B7355]" />
              <h1 className="text-4xl font-light text-white">Terms and Conditions</h1>
            </div>

            <div className="prose prose-invert prose-lg">
              <p className="text-white/80">
                Last updated: March 2024
              </p>

              <h2 className="text-2xl font-light text-white mt-8">1. Acceptance of Terms</h2>
              <p className="text-white/80">
                By accessing and using OmniRealty AI, you accept and agree to be bound by the terms and conditions outlined here.
              </p>

              <h2 className="text-2xl font-light text-white mt-8">2. Use License</h2>
              <p className="text-white/80">
                Permission is granted to temporarily access OmniRealty AI for personal or business use, subject to these restrictions:
              </p>
              <ul className="list-disc pl-6 text-white/80 space-y-2">
                <li>You must not modify or copy the materials</li>
                <li>You must not use the materials for commercial purposes</li>
                <li>You must not attempt to reverse engineer any software</li>
              </ul>

              <h2 className="text-2xl font-light text-white mt-8">3. Data Privacy</h2>
              <p className="text-white/80">
                Your use of OmniRealty AI is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
              </p>

              <h2 className="text-2xl font-light text-white mt-8">4. Disclaimer</h2>
              <p className="text-white/80">
                The materials on OmniRealty AI are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.
              </p>

              <h2 className="text-2xl font-light text-white mt-8">5. Limitations</h2>
              <p className="text-white/80">
                OmniRealty AI or its suppliers will not be held liable for any damages arising from the use or inability to use the materials on our platform.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 