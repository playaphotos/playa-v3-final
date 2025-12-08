import React from 'react';
import { Check, Star } from 'lucide-react';
const Pricing = () => (
  <div className="bg-slate-50 py-24"><div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16"><h2 className="text-5xl font-bold">Simple, Fair Pricing</h2></div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl"><h3 className="text-2xl font-bold">Single Photo</h3><p className="text-5xl font-bold my-8">$4.99</p><button className="w-full py-4 bg-slate-100 rounded-xl font-bold">Buy Now</button></div>
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border-2 border-indigo-500"><div className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><Star size={16}/> BEST VALUE</div><h3 className="text-2xl font-bold">Event Bundle</h3><p className="text-5xl font-bold my-8">$29.99</p><button className="w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500">Buy Now</button></div>
      <div className="bg-purple-50 p-8 rounded-3xl shadow-xl"><h3 className="text-2xl font-bold">AI Remix</h3><p className="text-5xl font-bold my-8">$0.99</p><button className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold">Buy Now</button></div>
    </div>
    <div className="mt-16 text-center"><p className="text-slate-500">Photographer? <a href="/#/agency" className="text-indigo-600 font-bold underline">View Agency Pricing</a></p></div>
  </div></div>
);
export default Pricing;
