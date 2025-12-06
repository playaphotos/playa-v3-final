import React from 'react';
import { Check, Star } from 'lucide-react';

const tiers = [
  { name: 'Single Photo', price: '$4.99', desc: 'Perfect for that one amazing shot.', features: ['High Resolution', 'Print License', 'Instant Download', 'No Watermark'], featured: false, color: 'bg-white', btn: 'bg-slate-100 text-slate-900 hover:bg-slate-200' },
  { name: 'Event Bundle', price: '$29.99', desc: 'Get every photo you appear in.', features: ['All Your Photos', 'Face Recognition Search', 'Priority Support', 'Forever Cloud Backup'], featured: true, color: 'bg-slate-900 text-white', btn: 'bg-indigo-600 text-white hover:bg-indigo-500' },
  { name: 'AI Remix', price: '$0.99', desc: 'Transform your look with magic.', features: ['1 AI Generation', 'Cyberpunk / Art Styles', 'Fun Social Share', 'Unique Result'], featured: false, color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100', btn: 'bg-purple-600 text-white hover:bg-purple-700' },
];

const Pricing = () => {
  return (
    <div className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16"><h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Simple, Fair Pricing</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rounded-3xl p-8 shadow-xl ring-1 ring-slate-900/5 ${tier.color} flex flex-col`}>
              {tier.featured && <div className="text-indigo-400 font-bold text-sm tracking-wide uppercase mb-2 flex items-center gap-2"><Star size={16} fill="currentColor" /> Best Value</div>}
              <h3 className={`text-2xl font-bold ${tier.featured ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
              <div className="my-8"><span className={`text-5xl font-extrabold ${tier.featured ? 'text-white' : 'text-slate-900'}`}>{tier.price}</span></div>
              <ul className="space-y-4 mb-8 flex-1">{tier.features.map((feature) => (<li key={feature} className="flex gap-3"><Check className={`h-6 w-5 flex-none ${tier.featured ? 'text-indigo-400' : 'text-green-500'}`} /><span className={tier.featured ? 'text-slate-300' : 'text-slate-600'}>{feature}</span></li>))}</ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.btn}`}>Buy Now</button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center"><p className="text-slate-500">Are you a photographer? <a href="/#/agency" className="text-indigo-600 font-bold hover:underline">View Agency Pricing &rarr;</a></p></div>
      </div>
    </div>
  );
};
export default Pricing;