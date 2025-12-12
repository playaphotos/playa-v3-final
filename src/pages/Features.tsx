import React, { useState } from 'react';
import { ShieldCheck, Wand2, Smartphone, Zap, Lock, Share2, Layers, Heart, Play } from 'lucide-react';
import { RemixModal } from '../components/RemixModal';

const Features = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="bg-white font-sans">
      {/* HEADER */}
      <div className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden text-center px-6">
         <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px]"></div>
         </div>
         <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-4">Why Playa Photos?</h2>
         <p className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
            More than just <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">files.</span><br/>
            It's an experience.
         </p>
         <button 
           onClick={() => setShowDemo(true)}
           className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl"
         >
            <Play size={18} fill="currentColor" /> Try AI Remix Demo
         </button>
      </div>

      {/* GRID */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Face Search", text: "Find yourself instantly without scrolling.", color: "text-blue-500" },
              { icon: Wand2, title: "AI Remix", text: "Transform your photo into a masterpiece.", color: "text-purple-500" },
              { icon: Smartphone, title: "Mobile First", text: "Works perfectly on any phone.", color: "text-green-500" },
              { icon: Zap, title: "Instant Access", text: "Get full-res downloads immediately.", color: "text-amber-500" },
              { icon: Lock, title: "Secure", text: "Bank-grade encryption.", color: "text-red-500" },
              { icon: Share2, title: "Social Ready", text: "Optimized for Instagram & TikTok.", color: "text-pink-500" },
              { icon: Layers, title: "High Res", text: "Download print-quality files.", color: "text-indigo-500" },
              { icon: Heart, title: "Memories", text: "Kept online for 1 year.", color: "text-rose-500" },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
                <f.icon className={`w-10 h-10 ${f.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-xl text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
        </div>
      </div>

      {/* THE MODAL (No imageUrl prop = triggers Upload Mode) */}
      <RemixModal 
        isOpen={showDemo} 
        onClose={() => setShowDemo(false)} 
      />
    </div>
  );
};
export default Features;