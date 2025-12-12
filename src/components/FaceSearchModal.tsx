import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload, ScanFace, CheckCircle, Search } from 'lucide-react';

interface FaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFound: () => void; // Callback when "matches" are found
}

export const FaceSearchModal: React.FC<FaceSearchModalProps> = ({ isOpen, onClose, onFound }) => {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const startScan = () => {
    if (!image) return;
    setScanning(true);
    
    // SIMULATE AI SCANNING DELAY
    setTimeout(() => {
      setScanning(false);
      onFound(); // Filter the gallery
      onClose(); // Close modal
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"><X size={24}/></button>

          {/* STATE 1: UPLOAD */}
          {!scanning && (
            <div className="p-8 text-center">
               <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                  <ScanFace size={40} className="text-indigo-500"/>
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Find Your Photos</h2>
               <p className="text-slate-400 mb-8">Upload a clear selfie. Our AI will search the entire gallery for you.</p>

               {image ? (
                 <div className="mb-6">
                    <img src={image} alt="Selfie" className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-indigo-500 shadow-lg"/>
                    <button onClick={() => setImage(null)} className="text-xs text-slate-500 mt-2 hover:text-white">Change Photo</button>
                 </div>
               ) : null}

               {!image ? (
                  <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 flex items-center justify-center gap-2">
                     <Camera size={20}/> Take / Upload Selfie
                  </button>
               ) : (
                  <button onClick={startScan} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 flex items-center justify-center gap-2">
                     <Search size={20}/> Start Face Search
                  </button>
               )}
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
          )}

          {/* STATE 2: SCANNING ANIMATION */}
          {scanning && (
            <div className="p-12 text-center relative overflow-hidden">
               {/* Scanning Line Animation */}
               <motion.div 
                 animate={{ top: ['0%', '100%', '0%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-10"
               />
               
               <div className="relative z-0">
                  <img src={image!} alt="Scanning" className="w-32 h-32 rounded-full object-cover mx-auto mb-8 opacity-50 grayscale"/>
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Scanning Gallery...</h3>
               <p className="text-slate-400">Comparing 128 facial landmarks.</p>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};