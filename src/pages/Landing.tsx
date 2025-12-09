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
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles size={14} /> <span>The Future of Event Photography</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Find Yourself <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Instantly.</span>
          </motion.h1>

          <motion.p 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-slate-300 mb-12 leading-relaxed"
          >
            No more scrolling through thousands of photos. 
            We use <span className="text-white font-bold">Face Search AI</span> to find your magic moments in seconds.
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-lg mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center">
               <input type="text" placeholder="Enter Event Code (e.g. GALA2025)..." className="w-full bg-slate-800 text-white rounded-full py-5 pl-8 pr-16 text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700" />
               <button className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors shadow-lg flex items-center justify-center">
                 <Search size={24} />
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Animated Steps) --- */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-slate-400">Get your photos in 3 simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-900 to-transparent"></div>

            {[
              { icon: Camera, title: "1. Attend Event", desc: "Our photographers capture the magic moments." },
              { icon: Smartphone, title: "2. Snap a Selfie", desc: "Upload one selfie. Our AI searches the entire gallery instantly." },
              { icon: Zap, title: "3. Instant Access", desc: "Buy and download your high-res photos immediately." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 text-center"
              >
                <div className="w-24 h-24 mx-auto bg-slate-900 border-4 border-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl text-indigo-400">
                  <step.icon size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE DEEP DIVE (AI Remix) --- */}
      <section className="py-32 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
             >
               {/* Placeholder for AI Remix Demo GIF/Video */}
               <div className="aspect-[4/5] bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                  <Sparkles size={64} className="text-white/20" />
                  <p className="absolute bottom-6 text-sm text-indigo-300 font-mono">Simulated AI Processing...</p>
               </div>
             </motion.div>
          </div>
          <div className="flex-1">
            <h2 className="text-indigo-400 font-bold uppercase tracking-wide mb-2">Exclusive Feature</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">AI Remix Engine</h3>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Don't just buy a photo. Create art. Our Remix Engine lets you transform standard event photos into 
              <span className="text-white"> Professional Headshots</span>, 
              <span className="text-white"> Cyberpunk Art</span>, or 
              <span className="text-white"> Vintage Classics</span> with one click.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300"><div className="p-1 bg-green-500/20 rounded-full text-green-400"><Layers size={16}/></div> No Designer Needed</li>
              <li className="flex items-center gap-3 text-slate-300"><div className="p-1 bg-green-500/20 rounded-full text-green-400"><Zap size={16}/></div> Generates in 5 Seconds</li>
              <li className="flex items-center gap-3 text-slate-300"><div className="p-1 bg-green-500/20 rounded-full text-green-400"><ShieldCheck size={16}/></div> Private & Secure</li>
            </ul>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Try a Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- LIVE GALLERIES --- */}
      <section className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Trending Now</h2>
              <p className="text-slate-500 mt-2">See what's happening around the world.</p>
            </div>
            <Link to="/features" className="hidden md:flex items-center text-indigo-400 font-bold hover:text-white transition-colors">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {recentEvents.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
              <Camera className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-xl text-slate-500">No public events active right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentEvents.map((event) => (
                <Link key={event.id} to={`/gallery/${event.id}`} className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
                  <div className="h-64 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                    <Camera size={48} className="text-slate-600 relative z-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-1 group-hover:text-indigo-400 transition-colors">{event.name}</h3>
                    <p className="text-sm text-slate-500">{event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
export default Landing;