import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll to make navbar translucent
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // REDUCED HEIGHT: h-16 -> h-14, Py-4 -> py-2
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 h-14' : 'bg-transparent h-16'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <Camera className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Playa Photos</span>
        </Link>

        {/* Desktop Links (Compact) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
          <Link to="/agency" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">For Photographers</Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <Link to="/login" className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full border border-slate-700 transition-all">
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 hover:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link to="/features" onClick={() => setIsOpen(false)} className="text-slate-300 block py-2">Features</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-slate-300 block py-2">Pricing</Link>
              <Link to="/agency" onClick={() => setIsOpen(false)} className="text-indigo-400 font-bold block py-2">For Photographers</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="bg-indigo-600 text-white text-center py-3 rounded-xl font-bold">Login / Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
