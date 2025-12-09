import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Camera, Sparkles, ShieldCheck, Zap, Layers, Smartphone } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; 
import { db } from '../lib/firebase';

const Landing: React.FC = () => {
  const [recentEvents, setRecentEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('status', '==', 'active'), limit(3));
        const snapshot = await getDocs(q);
        setRecentEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
    };
    fetchEvents();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-900 text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px] animate-pulse"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles size={14} /> <span>The Future of Event Photography</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            Find Yourself <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Instantly.</span>
          </motion.h1>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.6 }} className="max-w-lg mx-auto relative group">
            <div className="relative flex items-center">
               <input type="text" placeholder="Enter Event Code..." className="w-full bg-slate-800 text-white rounded-full py-5 pl-8 pr-16 text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700" />
               <button className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-full flex items-center justify-center"><Search size={24} /></button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-20 text-center">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[ {i:Camera,t:"1. Attend"},{i:Smartphone,t:"2. Selfie Search"},{i:Zap,t:"3. Download"} ].map((s,i)=>(
              <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800"><s.i size={40} className="mx-auto mb-4 text-indigo-500"/><h3 className="text-xl font-bold">{s.t}</h3></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Landing;
