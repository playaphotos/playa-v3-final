import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload as UploadIcon, CheckCircle, ArrowLeft, Image as ImageIcon, X, Bug } from 'lucide-react';

const MobileUpload: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [eventName, setEventName] = useState('Loading...');

  // FORCE LOAD: No "Event Not Found" blocking screen ever.
  useEffect(() => {
    const safeId = (eventId || 'demo').toLowerCase();
    if (safeId === 'demo') {
      setEventName('Summer Gala 2025 (Demo)');
    } else {
      setEventName(`Event: ${safeId}`);
    }
  }, [eventId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setTimeout(() => navigate(`/live/${eventId || 'demo'}`), 2500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-white"><ArrowLeft size={24} /></button>
         <div className="text-center">
            <h1 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Upload To</h1>
            <p className="font-bold text-white text-sm truncate max-w-[200px]">{eventName}</p>
         </div>
         <div className="w-10"></div>
      </div>

      {/* DEBUG STRIP: PROOF THIS IS THE NEW FILE */}
      <div className="bg-green-900/30 text-green-200 text-xs p-2 text-center border-b border-green-900/50 flex items-center justify-center gap-2">
         <Bug size={12}/> V2.0 System Active
      </div>

      {/* MAIN CONTENT */}
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
                        <p className="text-slate-400 text-center mb-12">Snap a photo to see it on the big screen instantly.</p>
                        
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
                           {uploading ? (
                             <span className="flex items-center gap-2">Uploading...</span>
                           ) : (
                             <><UploadIcon size={24} /> Send to Screen</>
                           )}
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
                  <p className="text-slate-400 text-lg">Look at the screen!</p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};
export default MobileUpload;