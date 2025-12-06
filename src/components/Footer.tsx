import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4"><Camera className="w-8 h-8 text-indigo-500" /><span className="text-2xl font-bold text-white tracking-tight">Playa Photos</span></Link>
            <p className="text-sm text-slate-500 leading-relaxed">The AI-powered event photography platform.</p>
          </div>
          <div><h3 className="text-white font-bold mb-4">For Guests</h3><ul className="space-y-3 text-sm"><li><Link to="/" className="hover:text-indigo-400">Find My Photos</Link></li><li><Link to="/features" className="hover:text-indigo-400">How it Works</Link></li><li><Link to="/pricing" className="hover:text-indigo-400">Pricing</Link></li></ul></div>
          <div><h3 className="text-white font-bold mb-4">For Photographers</h3><ul className="space-y-3 text-sm"><li><Link to="/agency" className="text-indigo-400 font-bold hover:text-white">Sell with Us</Link></li><li><Link to="/login" className="hover:text-indigo-400">Agency Login</Link></li></ul></div>
          <div><h3 className="text-white font-bold mb-4">Legal</h3><ul className="space-y-3 text-sm"><li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li><li><Link to="/terms" className="hover:text-indigo-400">Terms</Link></li></ul></div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-600"><p>&copy; {year} Playa Photos. All rights reserved. (v3.5 Final)</p></div>
      </div>
    </footer>
  );
};
export default Footer;
