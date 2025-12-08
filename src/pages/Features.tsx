import React from 'react';
import { ShieldCheck, Wand2, Smartphone, Zap, Lock, Share2, Layers, Heart } from 'lucide-react';
const Features = () => (
  <div className="bg-white py-24 max-w-7xl mx-auto px-6">
    <div className="text-center mb-16"><h2 className="text-indigo-600 font-bold">Why Playa Photos?</h2><p className="text-5xl font-extrabold mt-4">More than just files.</p></div>
    <div className="grid md:grid-cols-4 gap-8">
      {[ {i:ShieldCheck,t:"Face Search"},{i:Wand2,t:"AI Remix"},{i:Smartphone,t:"Mobile First"},{i:Zap,t:"Instant Access"},{i:Lock,t:"Secure"},{i:Share2,t:"Social Ready"},{i:Layers,t:"High Res"},{i:Heart,t:"Memories"} ].map((f,k)=><div key={k} className="p-6 bg-slate-50 rounded-xl"><f.i className="w-10 h-10 text-indigo-500 mb-4"/><h3 className="font-bold">{f.t}</h3></div>)}
    </div>
  </div>
);
export default Features;
