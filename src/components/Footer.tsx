import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div><Link to="/" className="flex items-center gap-2 mb-4 text-white font-bold text-2xl"><Camera className="text-indigo-500"/> Playa Photos</Link><p className="text-sm">The AI-powered event photography platform.</p></div>
      <div><h3 className="text-white font-bold mb-4">Guests</h3><ul className="space-y-2 text-sm"><li><Link to="/" className="hover:text-indigo-400">Find Photos</Link></li><li><Link to="/pricing" className="hover:text-indigo-400">Pricing</Link></li></ul></div>
      <div><h3 className="text-white font-bold mb-4">Photographers</h3><ul className="space-y-2 text-sm"><li><Link to="/agency" className="text-indigo-400 font-bold">Sell with Us</Link></li><li><Link to="/login" className="hover:text-indigo-400">Login</Link></li></ul></div>
      <div><h3 className="text-white font-bold mb-4">Legal</h3><ul className="space-y-2 text-sm"><li><Link to="/privacy">Privacy</Link></li><li><Link to="/terms">Terms</Link></li></ul></div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-slate-800 text-sm">&copy; {new Date().getFullYear()} Playa Photos. v3.6 Live</div>
  </footer>
);
export default Footer;
