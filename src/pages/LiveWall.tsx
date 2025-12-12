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
  const [photos, setPhotos] = useState<any[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  // MOCK PHOTOS for the Sales Demo (Unsplash)
  const demoPhotos = [
    'https://images.unsplash.com/photo-1519671482538-518b5c2c681c',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    'https://images.unsplash.com/photo-1519741497674-611481863552',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
  ];

  useEffect(() => {
    // 1. Try to load REAL photos from Firebase
    if (eventId && eventId !== 'demo') {
      const q = query(
        collection(db, 'photos'),
        where('eventId', '==', eventId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newPhotos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (newPhotos.length > 0) {
          setPhotos(newPhotos);
          setIsDemo(false);
        } else {
          // If no real photos, fallback to DEMO mode
          setIsDemo(true);
        }
      });
      return () => unsubscribe();
    } else {
      setIsDemo(true);
    }
  }, [eventId]);

  // 2. DEMO MODE LOOP: Simulates live uploads every 3 seconds
  useEffect(() => {
    if (!isDemo) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setPhotos(prev => {
        const nextPhoto = { id: `demo-${Date.now()}`, url: demoPhotos[currentIndex % demoPhotos.length] };
        currentIndex++;
        return [nextPhoto, ...prev].slice(0, 20); // Keep last 20
      });
    }, 4000); // New photo every 4 seconds

    return () => clearInterval(interval);
  }, [isDemo]);

  // Grid Columns config
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      
      {/* HEADER BAR */}
      <div className="h-20 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg"><Camera size={24} className="text-white"/></div>
          <h1 className="text-2xl font-bold tracking-tight">Summer Gala <span className="text-indigo-400">Live</span></h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/20 rounded-full border border-green-500/30 text-green-400 text-sm font-bold animate-pulse">
          <Wifi size={16} /> LIVE FEED
        </div>
      </div>

      {/* MASONRY GRID */}
      <div className="flex-1 overflow-y-hidden p-6 pt-24 relative">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          <AnimatePresence>
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="mb-6 relative group"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={photo.url} alt="Live Event" className="w-full h-auto object-cover" />
                  {/* "Just Now" Badge for new photos */}
                  {i === 0 && (
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <Sparkles size={12} /> NEW
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Masonry>
      </div>

      {/* FOOTER CALL TO ACTION (The Viral Loop) */}
      <div className="h-32 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-12 z-20 relative">
        
        <div className="flex items-center gap-8">
          <div className="bg-white p-2 rounded-xl">
            <QRCodeSVG value={`https://playa.photos/upload/${eventId || 'demo'}`} size={80} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-1">Scan to Upload</h2>
            <p className="text-slate-400 text-lg">See your photos on the big screen instantly.</p>
          </div>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-slate-500 text-sm mb-1">Powered by</p>
          <h3 className="text-2xl font-bold text-white flex items-center justify-end gap-2">
            <Camera size={24} className="text-indigo-500" /> Playa Photos
          </h3>
        </div>

      </div>
    </div>
  );
};

export default LiveWall;