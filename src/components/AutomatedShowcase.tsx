import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ShowcaseStep = {
  title: string;
  animation: string;
  duration: number;
  image?: string;
  description?: string;
  overlay?: Array<{
    type: string;
    label: string;
    position: string;
  }>;
  content?: string;
  beforeImage?: string;
  afterImage?: string;
  overlayText?: string;
  results?: Array<{
    status: string;
    text: string;
  }>;
};

type Props = {
  steps: ShowcaseStep[];
};

export function AutomatedShowcase({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const step = steps[currentStep];

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, isAnimating, steps]);

  const renderStep = () => {
    switch (step.animation) {
      case 'uploading':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <img src={step.image} alt="Property" className="w-full h-64 object-cover rounded-lg" />
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="animate-spin text-[#8B7355]" />
              <span className="text-white/80">{step.description}</span>
            </div>
          </motion.div>
        );

      case 'analyzing':
        return (
          <motion.div className="relative">
            <img src={steps[0].image} alt="Analysis" className="w-full h-64 object-cover rounded-lg" />
            {step.overlay?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute ${item.position} bg-[#8B7355]/90 text-white text-sm px-3 py-1 rounded-full`}
              >
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        );

      case 'typing':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 rounded-lg p-6"
          >
            <TypewriterEffect text={step.content || ''} />
          </motion.div>
        );

      case 'transforming':
        return (
          <div className="relative h-64">
            <img src={step.beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              <img src={step.afterImage} alt="After" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {step.overlayText}
              </span>
            </div>
          </div>
        );

      case 'scanning':
        return (
          <motion.div className="space-y-4">
            {step.results?.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center space-x-2 ${
                  result.status === 'passed' ? 'text-green-400' : 'text-yellow-400'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                <span className="text-white/80">{result.text}</span>
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-light text-white">{step.title}</h3>
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-[#8B7355]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TypewriterEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [text]);

  return <p className="text-white/80 font-mono">{displayText}</p>;
} 