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
    }; fetchEvents();
  }, []);
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <section className="relative pt-32 pb-20 bg-slate-900 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8">Stop Scrolling. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Start Reliving.</span></h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">AI-Powered Event Photography. No tagging, just magic.</p>
        <div className="max-w-md mx-auto relative"><input type="text" placeholder="Find your event..." className="w-full rounded-full py-4 pl-6 text-slate-900" /><button className="absolute right-2 top-2 p-2 bg-indigo-600 rounded-full"><Search size={24}/></button></div>
      </section>
      <section className="py-24 bg-slate-50 max-w-7xl mx-auto px-6">
         <h2 className="text-3xl font-bold mb-12">Trending Galleries</h2>
         {recentEvents.length===0?<p className="text-center text-slate-500">No public events active.</p>:<div className="grid md:grid-cols-3 gap-8">{recentEvents.map(e=><Link key={e.id} to={`/gallery/${e.id}`} className="bg-white p-6 rounded-xl shadow hover:shadow-lg"><h3 className="font-bold text-lg">{e.name}</h3><p className="text-sm text-slate-500">{e.date}</p></Link>)}</div>}
      </section>
    </div>
  );
};
export default Landing;
