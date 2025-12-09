import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Camera, Sparkles, ShieldCheck, Zap, Layers, Smartphone, User, Star } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; 
import { db } from '../lib/firebase';

const Landing: React.FC = () => {
  const [recentEvents, setRecentEvents] = useState<any[]>([]);

  // MOCK DATA: Ensures the page never looks empty, even if Database is empty
  const mockEvents = [
    { id: 'demo1', name: 'Summer Gala 2025', date: '2 days ago', cover: 'bg-gradient-to-br from-purple-600 to-blue-600' },
    { id: 'demo2', name: 'TechCrunch Disrupt', date: '5 days ago', cover: 'bg-gradient-to-br from-emerald-500 to-teal-700' },
    { id: 'demo3', name: 'NYC Fashion Week', date: '1 week ago', cover: 'bg-gradient-to-br from-rose-500 to-orange-500' }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('status', '==', 'active'), limit(3));
        const snapshot = await getDocs(q);
        const realEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // If no real events, use mock events for the sales demo
        if (realEvents.length === 0) {
            setRecentEvents(mockEvents);
        } else {
            setRecentEvents(realEvents);
        }
      } catch (err) { 
        console.error(err);
        setRecentEvents(mockEvents); // Fallback to mock on error
      }
    };
    fetchEvents();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-900 text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 8, repeat: Infinity }}
           className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600 blur-[150px] pointer-events-none"
        />
        <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 10, repeat: Infinity, delay: 1 }}
           className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600 blur-[150px] pointer-events-none"
        />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles size={14} /> <span>The #1 AI Event Platform</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-2xl"
          >
            Find Yourself. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Instantly.</span>
          </motion.h1>

          <motion.p 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-slate-300 mb-12 leading-relaxed"
          >
            The world's fastest photo delivery. We use <span className="text-white font-bold">Face Search AI</span> to find your photos from thousands of event shots in milliseconds.
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-lg mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center">
               <input type="text" placeholder="Enter Event Code (e.g. DEMO)..." className="w-full bg-slate-800 text-white rounded-full py-5 pl-8 pr-16 text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700" />
               <button className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors shadow-lg flex items-center justify-center transform hover:scale-105 active:scale-95">
                 <Search size={24} />
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Animated) --- */}
      <section className="py-32 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-slate-400">Get your photos in 3 simple steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-900 to-transparent"></div>
            {[
              { icon: Camera, title: "1. Attend Event", desc: "Our photographers capture the magic moments." },
              { icon: Smartphone, title: "2. Snap a Selfie", desc: "Upload one selfie. Our AI searches the gallery instantly." },
              { icon: Zap, title: "3. Instant Access", desc: "Buy and download your high-res photos immediately." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative z-10 text-center bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-slate-900 transition-colors"
              >
                <div className="w-24 h-24 mx-auto bg-slate-800 border-4 border-slate-700 rounded-full flex items-center justify-center mb-6 shadow-xl text-indigo-400">
                  <step.icon size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LIVE DEMO GALLERIES (Now with Mock Data) --- */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Trending Galleries</h2>
              <p className="text-slate-500 mt-2">See what's happening right now.</p>
            </div>
            <Link to="/features" className="hidden md:flex items-center text-indigo-400 font-bold hover:text-white transition-colors">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/gallery/${event.id}`} className="block group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
                    {/* Dynamic or Mock Cover */}
                    <div className={`h-64 relative flex items-center justify-center overflow-hidden ${event.cover || 'bg-slate-800'}`}>
                      {event.cover ? (
                         <div className="absolute inset-0 opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
                      ) : (
                         <Camera size={48} className="text-slate-600 relative z-10" />
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 z-10">
                         <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs font-bold text-white mb-2">LIVE</span>
                      </div>
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

      {/* --- TESTIMONIALS (User Info) --- */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-16">Trusted by 10,000+ Guests</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { name: "Sarah J.", role: "Wedding Guest", text: "I literally cried. I didn't even know this photo existed until I uploaded my selfie. Magic." },
                 { name: "Mike R.", role: "Event Planner", text: "Playa Photos changed our entire workflow. The instant delivery is a game changer." },
                 { name: "Jessica T.", role: "Marathon Runner", text: "Found all my race photos in 2 seconds. Worth every penny." }
               ].map((t, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.2 }}
                   className="p-8 bg-slate-900 rounded-2xl border border-slate-800"
                 >
                    <div className="flex justify-center gap-1 text-yellow-500 mb-4"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
                    <p className="text-slate-300 italic mb-6">"{t.text}"</p>
                    <div className="flex items-center justify-center gap-3">
                       <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white">{t.name[0]}</div>
                       <div className="text-left">
                          <div className="font-bold text-white text-sm">{t.name}</div>
                          <div className="text-indigo-400 text-xs">{t.role}</div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
        </div>
      </section>

    </div>
  );
};
export default Landing;