import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Wifi } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

const EventWall: React.FC = () => {
  const { eventId } = useParams();
  
  // Stock photos for Demo Mode simulation
  const demoPhotos = [
    'https://images.unsplash.com/photo-1519671482538-518b5c2c681c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
  ];

  const [photos, setPhotos] = useState<any[]>(
    demoPhotos.map((url, i) => ({ id: `init-${i}`, url }))
  );

  // --- ZOMBIE KILLER LINK GENERATOR ---
  // The query param (?v=...) MUST go before the hash (#) to bypass Service Workers.
  const baseUrl = window.location.origin;
  const safeId = eventId || 'demo';
  // Result looks like: https://site.com/?v=12345678#/magic/demo
  const uploadUrl = `${baseUrl}/?v=${Date.now()}#/magic/${safeId}`;

  // 1. REAL DATA CONNECTION (Firebase)
  useEffect(() => {
    if (eventId && eventId !== 'demo') {
      const q = query(collection(db, 'photos'), where('eventId', '==', eventId), orderBy('createdAt', 'desc'), limit(50));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newPhotos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (newPhotos.length > 0) setPhotos(newPhotos);
      });
      return () => unsubscribe();
    }
  }, [eventId]);

  // 2. DEMO MODE SIMULATION (Injects fake photos)
  useEffect(() => {
    if (eventId && eventId !== 'demo') return;
    const interval = setInterval(() => {
      setPhotos(prev => {
        const randomPhoto = demoPhotos[Math.floor(Math.random() * demoPhotos.length)];
        const nextPhoto = { id: `new-${Date.now()}`, url: randomPhoto };
        return [nextPhoto, ...prev].slice(0, 15);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [eventId]);

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex font-sans">
      
      {/* LEFT SIDE: PHOTO MASONRY WALL */}
      <div className="flex-1 flex flex-col h-full relative">
         {/* Top Header */}
         <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-20 flex items-center justify-between px-8">
            <div className="flex items-center gap-3">
               <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20"><Camera size={28} className="text-white"/></div>
               <h1 className="text-3xl font-bold tracking-tight">Live <span className="text-indigo-400">Feed</span></h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 rounded-full border border-green-500/30 text-green-400 text-xs font-bold animate-pulse">
               <Wifi size={14} /> ONLINE
            </div>
         </div>
         
         {/* Scrollable Grid */}
         <div className="flex-1 overflow-y-auto p-6 pt-28 no-scrollbar">
            <Masonry breakpointCols={{default: 3, 1600: 3, 1200: 2, 700: 2, 500: 1}} className="flex -ml-6 w-auto" columnClassName="pl-6 bg-clip-padding">
               <AnimatePresence mode='popLayout'>
                  {photos.map((photo, i) => (
                     <motion.div layout key={photo.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} className="mb-6 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                           <img src={photo.url} alt="Live" className="w-full h-auto object-cover" />
                           {i === 0 && <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce"><Sparkles size={12} /> NEW</div>}
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </Masonry>
         </div>
         
         {/* Mobile Footer (Fallback for small screens) */}
         <div className="md:hidden h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 z-30">
             <div className="flex items-center gap-4">
                 <div className="bg-white p-1.5 rounded-lg"><QRCodeSVG value={uploadUrl} size={50} /></div>
                 <div><h2 className="font-bold text-lg">Scan to Join</h2></div>
             </div>
         </div>
      </div>
      
      {/* RIGHT SIDE: SIDEBAR (DESKTOP ONLY) */}
      <div className="hidden md:flex w-96 bg-slate-900 border-l border-slate-800 flex-col items-center justify-center p-8 text-center relative z-30 shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 w-full flex flex-col items-center">
             
             {/* QR Container */}
             <div className="bg-white p-4 rounded-3xl shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
                <QRCodeSVG value={uploadUrl} size={200} />
             </div>
             
             {/* DEBUG: Visible URL for Verification */}
             <div className="w-full mb-6 bg-slate-800 p-2 rounded text-[10px] text-slate-400 font-mono break-all border border-slate-700">
                {uploadUrl}
             </div>

             <h2 className="text-4xl font-extrabold mb-4">Scan to Upload</h2>
             <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Take a photo and see it on the big screen <span className="text-white font-bold">instantly.</span>
             </p>
         </div>
         <div className="absolute bottom-8 text-slate-600 text-sm font-bold tracking-widest uppercase">
            Powered by Playa Photos
         </div>
      </div>
    </div>
  );
};
export default EventWall;