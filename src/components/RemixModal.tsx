import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, Lock, Wand2, Download, Share2 } from 'lucide-react';

interface RemixModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const RemixModal: React.FC<RemixModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('headshot');

  const styles = [
    { id: 'headshot', name: 'Pro Headshot', emoji: '👔', desc: 'LinkedIn ready.' },
    { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🤖', desc: 'Neon futuristic.' },
    { id: 'anime', name: 'Anime 90s', emoji: '✨', desc: 'Retro studio style.' },
    { id: 'painting', name: 'Oil Painting', emoji: '🎨', desc: 'Classic museum art.' },
  ];

  const handleGenerate = () => {
    setProcessing(true);
    // Simulate AI delay for perceived value
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
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

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
            <X size={24} />
          </button>

          {/* STATE 1: SELECTION */}
          {!processing && !complete && (
            <div className="p-6">
              <div className="text-center mb-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                    <Sparkles size={12} /> AI Remix Engine
                 </div>
                 <h2 className="text-2xl font-bold text-white">Transform this Photo</h2>
                 <p className="text-slate-400 text-sm mt-1">Select a style to generate a new masterpiece.</p>
              </div>

              {/* Image Preview */}
              <div className="h-48 rounded-xl overflow-hidden mb-6 relative border border-slate-700">
                 <img src={imageUrl} alt="Original" className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm">Original Image</p>
                 </div>
              </div>

              {/* Style Selector */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                 {styles.map((style) => (
                    <button 
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedStyle === style.id 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                       <div className="text-xl mb-1">{style.emoji}</div>
                       <div className="font-bold text-sm">{style.name}</div>
                       <div className="text-xs opacity-70">{style.desc}</div>
                    </button>
                 ))}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleGenerate}
                className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                 <Zap className="text-orange-500" fill="currentColor"/> Generate for $0.99
              </button>
              <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                 <Lock size={10}/> Secure payment via Stripe
              </p>
            </div>
          )}

          {/* STATE 2: PROCESSING */}
          {processing && (
            <div className="p-12 text-center">
               <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Wand2 className="text-white animate-pulse" size={32}/>
                  </div>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Creating Magic...</h3>
               <p className="text-slate-400">Applying neural filters and style transfer.</p>
            </div>
          )}

          {/* STATE 3: COMPLETE (Upsell Success) */}
          {complete && (
            <div className="p-0">
               <div className="relative h-64 bg-slate-800">
                  {/* In a real app, this would be the generated image URL */}
                  <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                     <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-flex items-center gap-1"><Sparkles size={10}/> GENERATION COMPLETE</div>
                     <h3 className="text-white font-bold text-xl">Cyberpunk Edition</h3>
                  </div>
               </div>
               <div className="p-6 bg-slate-900">
                  <div className="flex gap-3">
                     <button className="flex-1 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 flex items-center justify-center gap-2">
                        <Download size={18}/> Download HD
                     </button>
                     <button className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 flex items-center justify-center gap-2">
                        <Share2 size={18}/> Share
                     </button>
                  </div>
                  <button onClick={() => {setComplete(false); setProcessing(false);}} className="w-full mt-4 text-slate-500 text-sm hover:text-white">Create Another</button>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};