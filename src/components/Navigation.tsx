import React from 'react';
import { Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  scrollY?: number;
};

export function Navigation({ scrollY = 0 }: Props) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrollY > 50 || !isHome ? 'bg-[#2A2420]/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-[#D4B995]" />
            <span className="text-2xl font-semibold tracking-wider text-white">OmniRealty AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {isHome ? (
              <>
                <a href="#features" className="text-white hover:text-[#D4B995] transition-colors">Features</a>
                <a href="#use-cases" className="text-white hover:text-[#D4B995] transition-colors">Use Cases</a>
                <a href="#pricing" className="text-white hover:text-[#D4B995] transition-colors">Pricing</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-white hover:text-[#D4B995] transition-colors">Home</Link>
                <Link to="/about" className="text-white hover:text-[#D4B995] transition-colors">About</Link>
                <Link to="/contact" className="text-white hover:text-[#D4B995] transition-colors">Contact</Link>
              </>
            )}
            <Link 
              to="/request-access" 
              className="bg-[#8B7355] text-white px-6 py-2 rounded hover:bg-[#6B573D] transition-all transform hover:scale-105"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 