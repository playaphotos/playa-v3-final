import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../contexts/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { Camera, Search, ShoppingBag, Wand2, Download, Image as ImageIcon, X, Loader2, AlertCircle } from 'lucide-react';

// Dynamic import type placeholder
type FaceApiLib = any;

const EventGallery = () => {
  const { eventId: paramEventId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Face API State
  const [faceApi, setFaceApi] = useState<FaceApiLib | null>(null);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'camera' | 'processing'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const { addToCart, toggleCart, itemCount } = useCart();

  // 1. Load Event Data
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        if (!paramEventId) return;
        const eventDoc = await getDoc(doc(db, 'events', paramEventId));
        if (eventDoc.exists()) {
          const data = eventDoc.data();
          setEvent({ id: eventDoc.id, ...data, pricing: data.pricing || { socialPrice: 0.99, creditPrice: 1.00 } });
          
          const photoQ = query(collection(db, 'photos'), where('eventId', '==', paramEventId));
          const photoSnap = await getDocs(photoQ);
          const photoList = photoSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setPhotos(photoList);
          setFilteredPhotos(photoList);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchEvent();
  }, [paramEventId]);

  // 2. Dynamically Load Face API Models
  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Dynamically importing face-api.js...");
        const loadedFaceApi = await import('face-api.js'); // THE FIX FOR THE CRASH
        setFaceApi(loadedFaceApi);
        
        const MODEL_URL = '/models';
        console.log("Loading FaceAPI weights from", MODEL_URL);
        
        await Promise.all([
          loadedFaceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          loadedFaceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          loadedFaceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        
        console.log("FaceAPI models loaded successfully");
        setFaceApiLoaded(true);
      } catch (e) {
        console.warn("Face API models failed to load.", e);
      }
    };
    loadModels();
  }, []);

  // 3. Render
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-brand-600" /></div>;
  if (!event) return <div className="h-screen flex items-center justify-center">Event Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <CartDrawer />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-slate-900">{event.name}</h1></div>
          <button onClick={toggleCart} className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full">
             <ShoppingBag />
             {itemCount > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{itemCount}</span>}
          </button>
        </div>
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-center">
            <button onClick={() => setIsSearching(true)} className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:border-brand-500">
               <Search size={16} /> Find My Photos
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo: any) => (
            <div key={photo.id} className="relative group bg-slate-200 rounded-lg overflow-hidden aspect-[2/3]">
               <img src={photo.watermarkedUrl || photo.originalUrl} className="w-full h-full object-cover" loading="lazy" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <button onClick={() => addToCart({
                      photoId: photo.id,
                      thumbnailUrl: photo.watermarkedUrl || photo.originalUrl,
                      type: 'social',
                      price: event.pricing.socialPrice,
                      label: 'Social Download'
                  })} className="w-full bg-white/10 backdrop-blur text-white text-sm py-2 rounded-lg hover:bg-white/20 border border-white/10">
                    <Download size={14} className="inline mr-1" /> Add to Cart (${event.pricing.socialPrice})
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventGallery;