import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { Search, Download, ShoppingCart, Heart, Share2, ArrowLeft, Camera, Lock } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../contexts/CartContext';

const EventGallery: React.FC = () => {
  const { eventId } = useParams();
  const { addToCart } = useCart();
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('Event Gallery');

  // MOCK DATA for "DEMO" code
  const demoPhotos = [
    { id: 'd1', url: 'https://images.unsplash.com/photo-1519671482538-518b5c2c681c?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd2', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd3', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd4', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd5', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd6', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd7', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', price: 5 },
    { id: 'd8', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800', price: 5 },
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      
      // SCENARIO 1: DEMO MODE
      if (eventId?.toLowerCase() === 'demo') {
        setTimeout(() => {
          setPhotos(demoPhotos);
          setEventName('Summer Gala 2025 (Demo)');
          setLoading(false);
        }, 800); // Fake loading delay
        return;
      }

      // SCENARIO 2: REAL FIREBASE DATA
      try {
        // 1. Get Event Details
        // (In a real app we would fetch the event doc to get the name)
        setEventName(`Event #${eventId}`);

        // 2. Get Photos
        const q = query(
            collection(db, 'photos'), 
            where('eventId', '==', eventId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const realPhotos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPhotos(realPhotos);
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [eventId]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                <ArrowLeft size={20} />
             </Link>
             <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">{eventName}</h1>
                <p className="text-xs text-slate-500">{photos.length} photos</p>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 text-sm">
                <Search size={16}/> Find Me
             </button>
             <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                <Lock size={16}/> Unlock All
             </button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
           <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Loading gallery...</p>
           </div>
        ) : photos.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700">No Photos Yet</h3>
              <p className="text-slate-500">Photos will appear here as they are uploaded.</p>
           </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {photos.map((photo) => (
              <motion.div 
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <div className="relative overflow-hidden cursor-pointer">
                   <img src={photo.url} alt="Event" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
                   
                   {/* OVERLAY ACTIONS */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                         <Heart size={20} />
                      </button>
                      <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                         <Share2 size={20} />
                      </button>
                   </div>
                </div>

                <div className="p-3 flex justify-between items-center">
                   <span className="text-slate-900 font-bold text-sm">${photo.price || 5}.00</span>
                   <button 
                     onClick={() => addToCart(photo)}
                     className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                   >
                      <ShoppingCart size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>

    </div>
  );
};

export default EventGallery;