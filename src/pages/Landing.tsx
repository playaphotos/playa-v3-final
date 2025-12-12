import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Camera, Sparkles, ShieldCheck, Zap, Layers, Smartphone, Star } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; 
import { db } from '../lib/firebase';

const Landing: React.FC = () => {
  const [recentEvents, setRecentEvents] = useState<any[]>([]);

  // REAL IMAGES from Unsplash for "Mock" Data
  const mockEvents = [
    { id: 'demo1', name: 'Summer Gala 2025', date: 'Live Now', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
    { id: 'demo2', name: 'TechCrunch Disrupt', date: '2 days ago', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' },
    { id: 'demo3', name: 'NYC Fashion Week', date: '1 week ago', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('status', '==', 'active'), limit(3));
        const snapshot = await getDocs(q);
        const realEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (realEvents.length === 0) setRecentEvents(mockEvents);
        else setRecentEvents(realEvents);
      } catch (err) { setRecentEvents(mockEvents); }
    };
    fetchEvents();
  }, []);

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-900 text-white overflow-hidden">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-6">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px] animate-pulse"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles size={14} /> <span>The #1 AI Event Platform</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            Find Yourself. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Instantly.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }} className="max-w-2xl mx-auto text-xl text-slate-300 mb-12">
            The world's fastest photo delivery. We use <span className="text-white font-bold">Face Search AI</span> to find your photos from thousands of event shots in milliseconds.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.6 }} className="max-w-lg mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center">
               <input type="text" placeholder="Enter Event Code (e.g. DEMO)..." className="w-full bg-slate-800 text-white rounded-full py-5 pl-8 pr-16 text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700" />
               <button className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-full flex items-center justify-center"><Search size={24} /></button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRENDING GALLERIES (Now with Real Images) */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div><h2 className="text-3xl font-bold">Trending Galleries</h2><p className="text-slate-500 mt-2">See what's happening right now.</p></div>
            <Link to="/features" className="hidden md:flex items-center text-indigo-400 font-bold hover:text-white">View All <ArrowRight size={16} className="ml-1" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentEvents.map((event, index) => (
                <motion.div key={event.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                  <Link to={`/gallery/${event.id}`} className="block group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300">
                    <div className="h-64 relative overflow-hidden">
                      <img src={event.image || 'https://via.placeholder.com/800'} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 z-10"><span className="inline-block px-2 py-1 bg-red-500/80 backdrop-blur-md rounded text-xs font-bold text-white mb-2 animate-pulse">LIVE</span></div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-1 group-hover:text-indigo-400 transition-colors">{event.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-2"><Smartphone size={14}/> {event.date}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-16">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[ {i:Camera,t:"1. Attend Event",d:"Photographers snap the shots."}, {i:Smartphone,t:"2. Selfie Search",d:"One selfie finds all your photos."}, {i:Zap,t:"3. Instant Download",d:"High-res, watermark-free."} ].map((s,i)=>(
                 <div key={i} className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700"><div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-6 text-indigo-400"><s.i size={32}/></div><h3 className="font-bold text-xl mb-2">{s.t}</h3><p className="text-slate-400">{s.d}</p></div>
               ))}
            </div>
        </div>
      </section>
    </div>
  );
};
export default Landing;
