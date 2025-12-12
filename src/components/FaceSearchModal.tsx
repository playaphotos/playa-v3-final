import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload, ScanFace, Search, RotateCcw } from 'lucide-react';

interface FaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFound: () => void;
}

export const FaceSearchModal: React.FC<FaceSearchModalProps> = ({ isOpen, onClose, onFound }) => {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setCameraActive(false);
    }
  };

  // 2. Start Camera
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied or unavailable. Please upload a file instead.");
      setCameraActive(false);
    }
  };

  // 3. Take Photo from Stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/png'));
        
        // Stop Camera Stream
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false);
      }
    }
  };

  // 4. Start AI Scan
  const startScan = () => {
    if (!image) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onFound();
      onClose();
    }, 3500);
  };

  // Cleanup on close
  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setScanning(false);
      setCameraActive(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"/>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-2 bg-black/50 rounded-full"><X size={20}/></button>

          {/* MAIN CONTENT */}
          <div className="p-8 text-center">
             
             {/* Header */}
             {!cameraActive && !scanning && !image && (
               <>
                 <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                    <ScanFace size={40} className="text-indigo-500"/>
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">Find Your Photos</h2>
                 <p className="text-slate-400 mb-8">Take a selfie or upload a photo to search.</p>
               </>
             )}

             {/* CAMERA VIEW */}
             {cameraActive && (
               <div className="mb-6 relative rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-2xl">
                 <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover bg-black" />
                 <canvas ref={canvasRef} className="hidden" />
                 <button onClick={capturePhoto} className="absolute bottom-4 left-0 right-0 mx-auto w-14 h-14 bg-white rounded-full border-4 border-slate-200 hover:scale-110 transition-transform shadow-lg"></button>
               </div>
             )}

             {/* SELECTED IMAGE PREVIEW */}
             {image && !scanning && (
               <div className="mb-6 relative">
                  <img src={image} alt="Selfie" className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-indigo-500 shadow-lg"/>
                  <button onClick={() => setImage(null)} className="absolute bottom-0 right-1/4 bg-slate-800 text-white p-2 rounded-full border border-slate-600 hover:bg-slate-700">
                    <RotateCcw size={16}/>
                  </button>
               </div>
             )}

             {/* SCANNING ANIMATION */}
             {scanning && (
               <div className="mb-8 relative overflow-hidden rounded-2xl">
                  <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-10"/>
                  <img src={image!} alt="Scanning" className="w-40 h-40 rounded-full object-cover mx-auto opacity-50 grayscale"/>
                  <h3 className="text-xl font-bold text-white mt-6 animate-pulse">Scanning Gallery...</h3>
               </div>
             )}

             {/* ACTIONS (Only show if not scanning) */}
             {!scanning && (
               <div className="space-y-3">
                 {/* 1. If Camera is Active -> Show Cancel */}
                 {cameraActive && (
                   <button onClick={() => setCameraActive(false)} className="text-slate-400 text-sm hover:text-white">Cancel Camera</button>
                 )}

                 {/* 2. If No Image & No Camera -> Show Options */}
                 {!image && !cameraActive && (
                   <div className="grid grid-cols-2 gap-3">
                     <button onClick={startCamera} className="py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 flex flex-col items-center justify-center gap-2">
                        <Camera size={24}/> Take Selfie
                     </button>
                     <button onClick={() => fileInputRef.current?.click()} className="py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 flex flex-col items-center justify-center gap-2">
                        <Upload size={24}/> Upload
                     </button>
                   </div>
                 )}

                 {/* 3. If Image Selected -> Start Search */}
                 {image && (
                    <button onClick={startScan} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                       <Search size={20}/> Start Face Search
                    </button>
                 )}
               </div>
             )}

             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};