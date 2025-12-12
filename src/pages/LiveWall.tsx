import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Wifi } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

const LiveWall: React.FC = () => {
  const { eventId } = useParams();
  
  // MOCK DATA (High Res)
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

  // Dynamic Upload URL (Works on localhost, Vercel, and Custom Domain)
  // Ensures we include the /#/ for HashRouter
  const uploadUrl = `${window.location.origin}/#/upload/${eventId || 'demo'}`;

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

  // Demo Loop
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
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      
      {/* HEADER */}
      <div className="h-20 bg-gradient-to-b from-black/90 to-transparent absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg"><Camera size={24} className="text-white"/></div>
          <h1 className="text-2xl font-bold tracking-tight">Live <span className="text-indigo-400">Feed</span></h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/20 rounded-full border border-green-500/30 text-green-400 text-sm font-bold animate-pulse">
          <Wifi size={16} /> ONLINE
        </div>
      </div>

      {/* GRID AREA */}
      <div className="flex-1 overflow-y-hidden p-6 pt-24 relative">
        <Masonry breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}} className="flex -ml-6 w-auto" columnClassName="pl-6 bg-clip-padding">
          <AnimatePresence mode='popLayout'>
            {photos.map((photo, i) => (
              <motion.div layout key={photo.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} className="mb-6 relative">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={photo.url} alt="Live" className="w-full h-auto object-cover" />
                  {i === 0 && <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce"><Sparkles size={12} /> NEW</div>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Masonry>
      </div>

      {/* FOOTER */}
      <div className="h-32 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8 md:px-12 z-20 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="bg-white p-2 rounded-xl">
            {/* DYNAMIC QR CODE VALUE */}
            <QRCodeSVG value={uploadUrl} size={80} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Scan to Upload</h2>
            <p className="text-slate-400">Join the party instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveWall;