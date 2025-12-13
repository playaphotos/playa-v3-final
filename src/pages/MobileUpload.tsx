import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload as UploadIcon, CheckCircle, ArrowLeft, Image as ImageIcon, X, Bug } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase'; // <--- IMPORTING THE BACKEND

const MobileUpload: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [eventName, setEventName] = useState('Loading...');

  useEffect(() => {
    const safeId = (eventId || 'demo').toLowerCase();
    setEventName(safeId === 'demo' ? 'Summer Gala 2025 (Demo)' : `Event: ${safeId}`);
  }, [eventId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    // SAFETY CHECK: If we are in "Mock Mode" (no API keys), simulate success
    if (process.env.REACT_APP_FIREBASE_API_KEY === undefined && !window.location.href.includes('localhost')) {
        console.warn("No Firebase Keys found. Simulating upload.");
        setTimeout(() => {
            setUploading(false);
            setSuccess(true);
        }, 2000);
        return;
    }

    try {
      // 1. Upload File to Firebase Storage
      const safeId = eventId || 'demo';
      const storageRef = ref(storage, `events/${safeId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 2. Add Entry to Firestore Database
      await addDoc(collection(db, 'photos'), {
        eventId: safeId,
        url: downloadURL,
        createdAt: serverTimestamp(),
        type: 'upload',
        price: 5, // Default price
        status: 'active'
      });

      setUploading(false);
      setSuccess(true);
      
      // Clear file after success
      setTimeout(() => {
         setFile(null);
         setPreview(null);
         setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-white"><ArrowLeft size={24} /></button>
         <div className="text-center">
            <h1 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Upload To</h1>
            <p className="font-bold text-white text-sm truncate max-w-[200px]">{eventName}</p>
         </div>
         <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
         <AnimatePresence>
            {!success ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md flex flex-col items-center">
                  {!preview ? (
                     <>
                        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-8 border-2 border-dashed border-slate-700 animate-pulse">
                           <Camera size={48} className="text-indigo-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-center mb-4">Share the Moment</h2>
                        <div className="w-full grid gap-4">
                           <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 text-lg transform active:scale-95 transition-all">
                              <Camera size={24} /> Take Photo
                           </button>
                           <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 flex items-center justify-center gap-3 text-lg">
                              <ImageIcon size={24} /> Choose from Library
                           </button>
                        </div>
                     </>
                  ) : (
                     <div className="w-full flex flex-col items-center">
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-slate-700 shadow-2xl">
                           <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                           <button onClick={() => { setFile(null); setPreview(null); }} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md border border-white/20"><X size={20} /></button>
                        </div>
                        <button onClick={handleUpload} disabled={uploading} className="w-full py-5 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-400 shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 text-lg transform active:scale-95 transition-all disabled:opacity-50">
                           {uploading ? 'Uploading...' : <><UploadIcon size={24} /> Send to Screen</>}
                        </button>
                     </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
               </motion.div>
            ) : (
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.6)]">
                     <CheckCircle size={64} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Sent!</h2>
                  <p className="text-slate-400 text-lg">Check the big screen!</p>
                  <button onClick={() => setSuccess(false)} className="mt-8 text-indigo-400 font-bold">Upload Another</button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};
export default MobileUpload;