import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Wand2,
  FileText,
  Image as ImageIcon,
  Shield,
  Brain,
  Sparkles,
  Globe2,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  ArrowRight,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { AutomatedShowcase } from './components/AutomatedShowcase';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Navigation } from './components/Navigation';
import { Terms } from './pages/Terms';
import { RequestAccess } from './pages/RequestAccess';

type VisibilityState = {
  [key: string]: boolean;
};

type DemoStep = {
  input: string;
  output: string;
  description: string;
  type: 'description' | 'staging' | 'compliance';
};

const features = [
  {
    icon: Brain,
    title: "AI Analysis & Description",
    description: "Automatically generate compelling, SEO-optimized property descriptions from images",
    color: "text-blue-600"
  },
  {
    icon: Wand2,
    title: "Virtual Staging",
    description: "Transform empty spaces with AI-powered staging for any property type",
    color: "text-purple-600"
  },
  {
    icon: Shield,
    title: "Compliance Assistant",
    description: "Automatic zoning checks and regulatory compliance verification",
    color: "text-green-600"
  }
];

const useCases = [
  {
    type: "Agricultural",
    before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    after: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    description: "Transform farmland listings with AI-powered crop visualization",
    metrics: "45% faster sales cycle",
    testimonial: "The AI staging helped us visualize different agricultural layouts",
    client: "John D., Farm Broker"
  },
  {
    type: "Commercial",
    before: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    after: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    description: "Optimize commercial space presentations with virtual layouts",
    metrics: "3x more inquiries",
    testimonial: "We can now show multiple possible configurations instantly",
    client: "Sarah M., Commercial Real Estate"
  },
  {
    type: "Land Development",
    before: "https://images.unsplash.com/photo-1477207933561-b8516e3ac6b8?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    after: "https://images.unsplash.com/photo-1477207933561-b8516e3ac6b8?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Visualize development potential with AI renderings",
    metrics: "2x faster closings",
    testimonial: "Buyers can instantly see the property's potential",
    client: "Mike R., Land Developer"
  }
];

const stats = [
  { value: "1000x", label: "Faster Listings" },
  { value: "30% savings", label: "Avg. Savings/Property" },
  { value: "10+", label: "Languages" },
  { value: "98%", label: "Accuracy Rate" }
];

const demoSteps: DemoStep[] = [
  {
    type: 'description',
    input: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    output: "Pristine 50-acre agricultural plot featuring rich, irrigation-ready soil ideal for crop cultivation. South-facing gentle slopes maximize sun exposure, while established drainage systems ensure optimal water management. Property includes permitted well access and recently updated access roads suitable for farming equipment.",
    description: "AI analyzing property features and generating SEO-optimized description"
  },
  {
    type: 'staging',
    input: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    output: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    description: "Transforming empty commercial space into modern office layout"
  },
  {
    type: 'compliance',
    input: "Zoning Analysis in Progress...",
    output: "✓ Commercial Use Permitted\n✓ Building Height Compliant\n✓ Parking Requirements Met\n⚠️ Additional permits needed for signage",
    description: "Automatic zoning compliance verification"
  }
];

const automatedShowcase = {
  steps: [
    {
      title: "1. Upload Property Photo",
      animation: "uploading",
      duration: 2000,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      description: "Drag & drop or select property photos"
    },
    {
      title: "2. AI Analysis",
      animation: "analyzing",
      duration: 3000,
      overlay: [
        { type: "box", label: "Building Type: Commercial", position: "top-4 left-4" },
        { type: "highlight", label: "Windows: Modern Double-Pane", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" },
        { type: "marker", label: "Parking Available", position: "bottom-4 left-4" }
      ]
    },
    {
      title: "3. Generate Description",
      animation: "typing",
      duration: 4000,
      content: "Prime commercial property featuring modern architecture with floor-to-ceiling windows. Recently renovated 5,000 sq ft space with open floor plan and abundant natural light. Includes 20 dedicated parking spots and state-of-the-art security system. Ideal for corporate offices or retail space. Energy-efficient design with LEED certification pending."
    },
    {
      title: "4. Virtual Staging",
      animation: "transforming",
      duration: 3000,
      beforeImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      afterImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      overlayText: "AI-powered staging transformation in progress..."
    },
    {
      title: "5. Compliance Check",
      animation: "scanning",
      duration: 2500,
      results: [
        { status: "passed", text: "Zoning Requirements" },
        { status: "passed", text: "Building Code Compliance" },
        { status: "warning", text: "Signage Permits Required" },
        { status: "passed", text: "Occupancy Regulations" }
      ]
    }
  ]
};

const competitiveAdvantages = [
  {
    icon: Sparkles,
    title: "AI-Powered Speed",
    description: "Generate listings 1000x faster than manual processes",
    metric: "1000x",
    comparison: "Faster than traditional methods",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Brain,
    title: "Smart Analysis",
    description: "Automated property feature detection and description generation",
    metric: "99%",
    comparison: "Accuracy in feature detection",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Multi-language support and cultural adaptation",
    metric: "10+",
    comparison: "Languages supported",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    icon: BarChart3,
    title: "Market Impact",
    description: "Increased engagement and faster sales cycles",
    metric: "3x",
    comparison: "More buyer inquiries",
    color: "from-orange-500/20 to-orange-600/20"
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(demoSteps[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        setIsVisible(prev => ({ ...prev, [el.id]: isVisible }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % demoSteps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
    <div className="font-serif bg-[#f8f5f2]">
            <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#4A4036] to-[#2A2420] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')] bg-cover bg-center"></div>
        </div>
        <div className="relative min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8" data-animate id="hero-content">
                <h1 className={`text-5xl md:text-6xl font-light text-white leading-tight transition-all duration-1000 transform ${
                  isVisible['hero-content'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                        Transform Your Real Estate Listings with AI Precision
                </h1>
                <p className={`text-xl text-white/80 transition-all duration-1000 delay-300 transform ${
                  isVisible['hero-content'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  Create stunning listings 1000x faster with AI that understands every property type - from farmland to luxury estates
                </p>
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 transform ${
                  isVisible['hero-content'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <Link
                    to="/request-access"
                    className="bg-[#8B7355] text-white px-8 py-4 rounded hover:bg-[#6B573D] transition-all transform hover:scale-105"
                  >
                    Request Early Access
                  </Link>
                  <button className="border border-white/30 text-white px-8 py-4 rounded hover:bg-white/10 transition-all">
                          See Beta Preview
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-500">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
                      alt="Before"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-2 bg-white/20 rounded w-3/4 animate-pulse"></div>
                    <div className="flex justify-between items-center text-white/60 text-sm">
                      <span>Processing with AI...</span>
                      <span>78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Automated Showcase Section */}
            <section className="relative py-20 bg-gradient-to-br from-[#2A2420] to-[#4A4036] overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')] bg-cover bg-center"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-white mb-4">Watch AI in Action</h2>
                  <p className="text-xl text-white/80">See how OmniRealty AI transforms your listings in seconds</p>
                </div>

                <div className="bg-[#2A2420]/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                      <div className="w-3 h-3 rounded-full bg-green-500"/>
                    </div>
                    <div className="text-white/60 text-sm">OmniRealty AI Demo</div>
                  </div>

                  <div className="p-8">
                    <AutomatedShowcase steps={automatedShowcase.steps} />
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-[#2A2420] mb-4">See the Magic Happen</h2>
                  <p className="text-xl text-[#4A4036]/80">Watch how OmniRealty AI transforms your listings</p>
                </div>
                
                <div className="bg-[#2A2420] rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                      <div className="w-3 h-3 rounded-full bg-green-500"/>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={() => setCurrentStep(demoSteps[0])}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-white/80 text-sm uppercase tracking-wider">Input</h3>
                        {currentStep.type === 'description' || currentStep.type === 'staging' ? (
                          <img 
                            src={currentStep.input} 
                            alt="Input" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-64 bg-white/5 rounded-lg p-4 font-mono text-white/80">
                            {currentStep.input}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-white/80 text-sm uppercase tracking-wider">Output</h3>
                        {currentStep.type === 'staging' ? (
                          <img 
                            src={currentStep.output} 
                            alt="Output" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-64 bg-white/5 rounded-lg p-4 font-mono text-white/80">
                            {currentStep.output}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="text-white/60">{currentStep.description}</p>
                        <div className="flex space-x-2">
                          {demoSteps.map((_, index) => (
                            <div 
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentStepIndex ? 'bg-[#8B7355]' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#4A4036] mb-4">Powerful AI Features</h2>
            <p className="text-xl text-[#8B7355]">Everything you need to create stunning listings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                data-animate
                id={`feature-${index}`}
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
                <h3 className="text-xl font-semibold text-[#4A4036] mb-4">{feature.title}</h3>
                <p className="text-[#8B7355]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Carousel */}
      <section id="use-cases" className="py-20 bg-[#4A4036]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Success Stories</h2>
            <p className="text-xl text-white/80">See how our AI transforms listings across industries</p>
          </div>
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-8">
                  <h3 className="text-3xl font-light text-white">{useCases[currentSlide].type}</h3>
                  <p className="text-white/80">{useCases[currentSlide].description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      <span>{useCases[currentSlide].metrics}</span>
                    </div>
                    <blockquote className="text-white italic">
                      "{useCases[currentSlide].testimonial}"
                      <footer className="text-white/60 mt-2">- {useCases[currentSlide].client}</footer>
                    </blockquote>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={useCases[currentSlide].after}
                      alt={useCases[currentSlide].type}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#8B7355] text-white px-4 py-1 rounded-full text-sm">
                      AI Enhanced
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                data-animate
                id={`stat-${index}`}
              >
                <p className={`text-4xl font-light text-[#8B7355] mb-2 transition-all duration-1000 transform ${
                  isVisible[`stat-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  {stat.value}
                </p>
                <p className="text-[#4A4036]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gradient-to-br from-[#2A2420] to-[#4A4036]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-white mb-4">Join the Beta Program</h2>
                  <p className="text-xl text-white/80">Access is free for beta users. Apply today to secure your invitation.</p>
          </div>
                
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block"
                  >
                    <Link 
                      to="/request-access"
                      className="bg-[#8B7355] text-white px-8 py-4 rounded hover:bg-[#6B573D] transition-all transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Request Your Invite</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Competitive Advantage */}
            <section className="py-20 bg-[#2A2420]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-white mb-4">Why Choose OmniRealty AI</h2>
                  <p className="text-xl text-white/80">Outperform your competition with AI-powered advantages</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {competitiveAdvantages.map((advantage, index) => {
                    const Icon = advantage.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${advantage.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                        <div className="relative p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <Icon className="h-8 w-8 text-white" />
                            <span className="text-3xl font-bold text-white">{advantage.metric}</span>
                          </div>
                          <h3 className="text-xl font-light text-white mb-2">{advantage.title}</h3>
                          <p className="text-white/60 mb-4">{advantage.description}</p>
                          <div className="flex items-center text-sm text-white/40">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            <span>{advantage.comparison}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block"
                  >
                    <Link 
                      to="/request-access"
                      className="bg-[#8B7355] text-white px-8 py-4 rounded hover:bg-[#6B573D] transition-all transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Request Early Access</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

      {/* Footer */}
      <footer className="bg-[#2A2420] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="h-8 w-8" />
                <span className="text-2xl font-light">OmniRealty AI</span>
              </div>
              <p className="text-white/60">
                Transforming property listings with AI-powered automation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-light mb-4">Product</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-light mb-4">Stay Updated</h4>
              <p className="text-white/60 mb-4">Get the latest AI features and updates</p>
              <div className="flex justify-center space-x-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-3/4 px-4 py-2 bg-white/10 rounded-l focus:outline-none focus:ring-2 focus:ring-[#8B7355] text-white"
                />
                <button className="bg-[#8B7355] px-6 py-2 rounded-r hover:bg-[#6B573D] transition-colors flex items-center justify-center whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>© 2024 OmniRealty AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

            {/* Floating CTA Button */}
            <Link to="/request-access" className="fixed bottom-8 right-8 bg-[#8B7355] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#6B573D] transition-all transform hover:scale-105 flex items-center space-x-2 z-50">
              <span>Request Early Access</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
    </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/request-access" element={<RequestAccess />} />
      </Routes>
    </Router>
  );
}

export default App;