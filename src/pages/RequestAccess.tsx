import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Building2, Send, ArrowLeft, User, Mail, Building, MessageSquare, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RequestAccess() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Add this useEffect for debugging
  useEffect(() => {
    console.log('API URL:', import.meta.env.VITE_API_URL);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Use the full URL for the API endpoint
    const apiUrl = 'https://real-estate-automation-project.vercel.app/api/request-access';
    console.log('Making request to:', apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit request' }));
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setStatus('success');
      setMessage(data.message || 'Your request has been submitted successfully!');
      setFormData({ name: '', email: '', company: '', useCase: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to submit request. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2420] to-[#4A4036] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8B7355] rounded-full opacity-20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D4B995] rounded-full opacity-20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="relative pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Building2 className="h-8 w-8 text-[#D4B995]" />
              <h1 className="text-3xl font-light text-white">Request Early Access</h1>
            </div>

            <p className="text-white/60 mb-8">
              Join our exclusive early access program and be among the first to experience the future of AI-powered real estate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-white/80 mb-2 text-sm">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4B995] focus:border-transparent text-white transition-all"
                      required
                    />
                    <User className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-white/80 mb-2 text-sm">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4B995] focus:border-transparent text-white transition-all"
                      required
                    />
                    <Mail className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-white/80 mb-2 text-sm">Company Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4B995] focus:border-transparent text-white transition-all"
                    required
                  />
                  <Building className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-white/80 mb-2 text-sm">How do you plan to use OmniRealty AI?</label>
                <div className="relative">
                  <textarea
                    value={formData.useCase}
                    onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4B995] focus:border-transparent text-white transition-all h-32 resize-none"
                    required
                  />
                  <MessageSquare className="h-5 w-5 text-white/40 absolute left-3 top-4" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full bg-gradient-to-r from-[#8B7355] to-[#D4B995] text-white px-6 py-3 rounded-lg hover:from-[#6B573D] hover:to-[#8B7355] transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-[#D4B995] focus:ring-offset-2 focus:ring-offset-[#2A2420] flex items-center justify-center space-x-2 shadow-lg ${
                  status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <span>Submitting...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center ${
                    status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </form>

            <p className="text-white/40 text-sm text-center mt-6">
              By submitting this form, you agree to our{' '}
              <Link to="/terms" className="text-[#D4B995] hover:underline">Terms and Conditions</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 