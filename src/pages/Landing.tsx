import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Camera, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; 
import { db } from '../lib/firebase';

const Landing: React.FC = () => {
  const [recentEvents, setRecentEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('status', '==', 'active'), limit(6));
        const snapshot = await getDocs(q);
        setRecentEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl mix-blend-screen"></div>
           <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-purple-500 blur-3xl mix-blend-screen"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
            <Sparkles size={14} /> <span>AI-Powered Event Photography</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Stop Scrolling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Start Reliving.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed">
            We use Face Search AI to instantly find you in thousands of event photos. No tagging, no searching—just your magic moments, delivered instantly.
          </p>
          
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
               <input type="text" placeholder="Find your event (e.g. Summer Gala)..." className="w-full bg-white text-slate-900 rounded-full py-4 pl-6 pr-14 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               <button className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors shadow-lg">
                 <Search size={24} />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERIES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Trending Galleries</h2>
              <p className="text-slate-500 mt-2">Find your event and start the magic.</p>
            </div>
            <Link to="/features" className="hidden md:flex items-center text-indigo-600 font-bold hover:underline">
              How it works <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {recentEvents.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-500">No public events active right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentEvents.map((event) => (
                <Link key={event.id} to={`/gallery/${event.id}`} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-56 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:scale-105 transition-transform duration-500"></div>
                    <Camera size={48} className="text-slate-400 relative z-10" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{event.name}</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">{event.date}</p>
                    <div className="w-full bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold py-3 rounded-xl flex items-center justify-center transition-colors">
                      View Photos <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
               <div className="p-6">
                  <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><ShieldCheck size={32} /></div>
                  <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                  <p className="text-slate-500">Your face data is processed locally on your device. We prioritize your privacy above all else.</p>
               </div>
               <div className="p-6">
                  <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6"><Sparkles size={32} /></div>
                  <h3 className="text-xl font-bold mb-3">AI Magic</h3>
                  <p className="text-slate-500">Turn a standard selfie into a cinematic masterpiece with our Remix engine.</p>
               </div>
               <div className="p-6">
                  <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6"><Zap size={32} /></div>
                  <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
                  <p className="text-slate-500">No waiting. Photos are delivered to your email seconds after checkout.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
export default Landing;