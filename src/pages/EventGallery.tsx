import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, Share2, ArrowLeft, Camera, Lock, Check, X } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../contexts/CartContext';
import { FaceSearchModal } from '../components/FaceSearchModal';

const EventGallery: React.FC = () => {
  const { eventId } = useParams();
  const { addToCart } = useCart();
  
  // State
  const [photos, setPhotos] = useState<any[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]); // For Face Search results
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('Event Gallery');
  
  // UI State
  const [isFaceSearchOpen, setIsFaceSearchOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // MOCK DATA for Demo
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
      if (eventId?.toLowerCase() === 'demo') {
        setTimeout(() => {
          setPhotos(demoPhotos);
          setFilteredPhotos(demoPhotos);
          setEventName('Summer Gala 2025 (Demo)');
          setLoading(false);
        }, 800);
        return;
      }
      // Real Firebase Fetch Logic...
      try {
        setEventName(`Event #${eventId}`);
        const q = query(collection(db, 'photos'), where('eventId', '==', eventId), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const realPhotos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPhotos(realPhotos);
        setFilteredPhotos(realPhotos);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchPhotos();
  }, [eventId]);

  // --- ACTIONS ---

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setToast('Link copied to clipboard!');
    setTimeout(() => setToast(null), 3000);
  };

  const toggleHeart = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(fid => fid !== id));
    } else {
      setFavorites(prev => [...prev, id]);
      setToast('Added to Favorites');
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleUnlockAll = () => {
    filteredPhotos.forEach(p => addToCart(p));
    setToast(`Added ${filteredPhotos.length} photos to Cart`);
    setTimeout(() => setToast(null), 2000);
  };

  // The "Fake" Search Logic: Just shows the first 3 photos
  const handleFaceFound = () => {
    setIsFiltered(true);
    setFilteredPhotos(photos.slice(0, 3)); // Simulate finding 3 matches
    setToast('Face Search Complete: 3 Matches Found!');
    setTimeout(() => setToast(null), 3000);
  };

  const clearSearch = () => {
    setIsFiltered(false);
    setFilteredPhotos(photos);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-20 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold">
               <Check size={16} className="text-green-400" /> {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></Link>
             <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none flex items-center gap-2">
                   {eventName} 
                   {isFiltered && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Filtered</span>}
                </h1>
                <p className="text-xs text-slate-500">{filteredPhotos.length} photos</p>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             {isFiltered ? (
                <button onClick={clearSearch} className="flex items-center gap-2 px-3 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 text-xs">
                   <X size={14}/> Clear
                </button>
             ) : (
                <button onClick={() => setIsFaceSearchOpen(true)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 text-sm">
                   <Search size={16}/> Find Me
                </button>
             )}
             
             <button onClick={handleUnlockAll} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                <Lock size={16}/> Unlock All
             </button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
           <div className="text-center py-20"><div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div><p className="text-slate-400">Loading gallery...</p></div>
        ) : filteredPhotos.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300"><Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-700">No Photos Yet</h3></div>
        ) : (
          <Masonry breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}} className="flex -ml-6 w-auto" columnClassName="pl-6 bg-clip-padding">
            {filteredPhotos.map((photo) => (
              <motion.div key={photo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="relative overflow-hidden cursor-pointer">
                   <img src={photo.url} alt="Event" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
                   
                   {/* ACTION OVERLAY */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => toggleHeart(photo.id)} 
                        className={`p-3 rounded-full shadow-lg transition-colors ${favorites.includes(photo.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                      >
                         <Heart size={20} fill={favorites.includes(photo.id) ? "currentColor" : "none"} />
                      </button>
                      <button onClick={handleShare} className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                         <Share2 size={20} />
                      </button>
                   </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                   <span className="text-slate-900 font-bold text-sm">${photo.price || 5}.00</span>
                   <button onClick={() => addToCart(photo)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><ShoppingCart size={18} /></button>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>

      {/* MODAL */}
      <FaceSearchModal isOpen={isFaceSearchOpen} onClose={() => setIsFaceSearchOpen(false)} onFound={handleFaceFound} />

    </div>
  );
};

export default EventGallery;