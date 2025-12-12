import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowRight, Home, Sparkles } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden text-center relative"
      >
        {/* Confetti / Success Header */}
        <div className="bg-green-500 p-10 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
             className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-green-500 shadow-xl relative z-10"
           >
              <CheckCircle size={48} strokeWidth={3} />
           </motion.div>
        </div>

        <div className="p-10">
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Payment Successful!</h1>
           <p className="text-slate-500 mb-8 text-lg">Your memories are ready. A receipt has been sent to your email.</p>
           
           <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
                 <Sparkles size={18} className="text-indigo-500"/> Your Order Includes:
              </h3>
              <ul className="text-left space-y-3 text-slate-600">
                 <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500"/> 12 High-Res Photos</li>
                 <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500"/> Full Commercial License</li>
                 <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500"/> AI Remix (Cyberpunk Pack)</li>
              </ul>
           </div>

           <div className="space-y-3">
              <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                 <Download size={20}/> Download All Photos (ZIP)
              </button>
              <Link to="/" className="w-full py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2">
                 <Home size={20}/> Return Home
              </Link>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Success;