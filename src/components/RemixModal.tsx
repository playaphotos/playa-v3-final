import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, Lock, Wand2, Download, Share2, Upload, Camera } from 'lucide-react';

interface RemixModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string; // Optional now, since we allow uploads
}

export const RemixModal: React.FC<RemixModalProps> = ({ isOpen, onClose, imageUrl: initialImage }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STYLES with actual CSS filters for the demo
  const styles = [
    { id: 'headshot', name: 'Pro Headshot', filter: 'brightness(1.1) contrast(1.1) grayscale(0.2)', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100' },
    { id: 'cyberpunk', name: 'Cyberpunk', filter: 'contrast(1.4) saturate(2) hue-rotate(180deg)', img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=100' },
    { id: 'vintage', name: 'Vintage Vogue', filter: 'sepia(0.8) contrast(1.2)', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
    { id: 'anime', name: 'Anime Style', filter: 'saturate(3) brightness(1.2) contrast(0.9)', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=100' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleGenerate = () => {
    if (!image) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 3000); // 3-second "AI" suspense
  };

  // Reset state when modal closes/opens
  React.useEffect(() => {
    if (isOpen && !initialImage) setImage(null);
    if (isOpen) { setProcessing(false); setComplete(false); }
  }, [isOpen, initialImage]);

  if (!isOpen) return null;

  const currentFilter = styles.find(s => s.id === selectedStyle)?.filter || 'none';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" />

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"><X size={20} /></button>

          {/* STATE 1: UPLOAD (If no image) */}
          {!image && (
            <div className="p-12 flex flex-col items-center text-center justify-center min-h-[400px]">
               <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                  <Camera size={40} className="text-indigo-500" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Upload a Selfie</h2>
               <p className="text-slate-400 mb-8 max-w-xs">See what you look like as a Cyberpunk character or Professional CEO.</p>
               <button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Upload size={18}/> Choose Photo
               </button>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
          )}

          {/* STATE 2: CONFIGURE (Image Selected) */}
          {image && !processing && !complete && (
            <div className="flex flex-col h-full">
              <div className="relative h-64 bg-black shrink-0">
                 <img src={image} alt="Original" className="w-full h-full object-contain" />
                 <button onClick={() => setImage(null)} className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md hover:bg-black/70">Change Photo</button>
              </div>

              <div className="p-6 bg-slate-900 flex-1 overflow-y-auto">
                 <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Wand2 size={16} className="text-purple-400"/> Choose a Style</h3>
                 <div className="grid grid-cols-2 gap-3 mb-6">
                    {styles.map((style) => (
                       <button 
                         key={style.id}
                         onClick={() => setSelectedStyle(style.id)}
                         className={`relative p-2 rounded-xl border flex items-center gap-3 overflow-hidden transition-all ${
                           selectedStyle === style.id ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                         }`}
                       >
                          <img src={style.img} alt={style.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="text-left">
                             <div className={`font-bold text-sm ${selectedStyle === style.id ? 'text-white' : 'text-slate-300'}`}>{style.name}</div>
                          </div>
                          {selectedStyle === style.id && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,1)]"></div>}
                       </button>
                    ))}
                 </div>

                 <button onClick={handleGenerate} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2">
                    <Zap fill="currentColor" size={18} className="text-yellow-300"/> Generate (Free Demo)
                 </button>
                 <p className="text-center text-xs text-slate-500 mt-3">Usually $0.99 • Free for this demo</p>
              </div>
            </div>
          )}

          {/* STATE 3: PROCESSING */}
          {processing && (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
               <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <Wand2 className="absolute inset-0 m-auto text-white animate-pulse" size={32}/>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Remixing Pixels...</h3>
               <p className="text-slate-400 text-sm">Applying {styles.find(s => s.id === selectedStyle)?.name} neural filters.</p>
            </div>
          )}

          {/* STATE 4: RESULT (CSS Filter Applied) */}
          {complete && image && (
            <div className="flex flex-col h-full">
               <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                  {/* THE TRICK: Apply CSS filter to the user's image */}
                  <img src={image} alt="Generated" className="w-full h-full object-contain transition-all duration-1000" style={{ filter: currentFilter }} />
                  
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                     <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md inline-flex items-center gap-1">
                        <Sparkles size={10}/> AI REMIX COMPLETE
                     </span>
                  </div>
               </div>
               <div className="p-6 bg-slate-900 shrink-0">
                  <div className="flex gap-3 mb-3">
                     <button className="flex-1 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 flex items-center justify-center gap-2">
                        <Download size={18}/> Save
                     </button>
                     <button className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 flex items-center justify-center gap-2">
                        <Share2 size={18}/> Share
                     </button>
                  </div>
                  <button onClick={() => {setComplete(false); setProcessing(false);}} className="w-full py-2 text-slate-500 text-sm hover:text-white">Try Another Style</button>
               </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};