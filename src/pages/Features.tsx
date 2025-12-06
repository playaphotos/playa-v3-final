import React from 'react';
import { ShieldCheck, Wand2, Smartphone, Zap, Lock, Share2, Layers, Heart } from 'lucide-react';

const Features = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/50 to-transparent"></div>
         <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-brand-400 font-semibold tracking-wide uppercase text-sm mb-4">Why Playa Photos?</h2>
            <p className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
              More than just <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">files.</span><br/>
              It's an experience.
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We've rebuilt event photography from the ground up to be faster, smarter, and magical.
            </p>
         </div>
      </div>

      {/* Feature Grid */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Face Search", text: "Find yourself instantly without scrolling through thousands of photos.", color: "text-blue-500" },
              { icon: Wand2, title: "AI Remix", text: "Transform your photo into a cyberpunk, vintage, or oil painting masterpiece.", color: "text-purple-500" },
              { icon: Smartphone, title: "Mobile First", text: "Works perfectly on any phone. Install as an App for instant access.", color: "text-green-500" },
              { icon: Zap, title: "Instant Access", text: "Get your full-resolution downloads immediately after purchase.", color: "text-amber-500" },
              { icon: Lock, title: "Secure", text: "Bank-grade encryption for payments and photo storage.", color: "text-red-500" },
              { icon: Share2, title: "Social Ready", text: "Optimized sizing for Instagram, TikTok, and Facebook Stories.", color: "text-pink-500" },
              { icon: Layers, title: "High Res", text: "Download print-quality files up to 50MB in size.", color: "text-indigo-500" },
              { icon: Heart, title: "Memories", text: "We keep your gallery online for 1 year, so you never lose a moment.", color: "text-rose-500" },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
                <f.icon className={`w-10 h-10 ${f.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-xl text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Features;