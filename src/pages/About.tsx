import React from 'react';
import { Building2, Shield, Server, Code2, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';

export function About() {
  const techStack = [
    { name: "React", description: "Frontend Framework" },
    { name: "TypeScript", description: "Type-safe Development" },
    { name: "TensorFlow.js", description: "AI Processing" },
    { name: "OpenAI API", description: "Language Models" },
    { name: "AWS", description: "Cloud Infrastructure" },
    { name: "Docker", description: "Containerization" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2420] to-[#4A4036]">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Building2 className="h-12 w-12 text-[#8B7355]" />
              <h1 className="text-4xl font-light text-white">Twinclouds Studio</h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Pioneering AI Solutions for Real Estate Innovation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light text-white">Our Vision</h2>
              <p className="text-white/80">
                At Twinclouds Studio, we're revolutionizing the real estate industry through cutting-edge AI technology. Our flagship product, OmniRealty AI, represents our commitment to innovation and efficiency in property marketing.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-white/60">
                  <Shield className="h-5 w-5" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Server className="h-5 w-5" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Code2 className="h-5 w-5" />
                  <span>Modern Stack</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Globe2 className="h-5 w-5" />
                  <span>Global Scale</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-light text-white mb-6">Technical Excellence</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white/5 rounded-lg"
                  >
                    <h4 className="text-white font-medium">{tech.name}</h4>
                    <p className="text-white/60 text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 