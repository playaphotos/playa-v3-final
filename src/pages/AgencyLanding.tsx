import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Shield, Zap, Globe, Camera, ChevronRight, CheckCircle, Lock } from 'lucide-react';

const AgencyLanding: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-6">
              <Zap size={14} /> <span>For Professional Photographers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Your Empire. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Your Revenue.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Stop paying 20% commissions to legacy platforms. 
              Build your own <strong>White Label</strong> event photography business powered by our AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                Start Selling <ChevronRight size={20} />
              </Link>
              <a href="#features" className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center">
                View Features
              </a>
            </div>
            
            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500"/> No Credit Card Required</div>
              <div className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500"/> Cancel Anytime</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Dashboard Mockup */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
              
              {/* Floating Cards */}
              <div className="absolute top-8 left-8 right-8 p-6 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                   <div>
                     <p className="text-slate-400 text-sm">Total Revenue</p>
                     <p className="text-3xl font-bold text-white">$12,450.00</p>
                   </div>
                   <div className="p-3 bg-green-500/20 rounded-lg text-green-400"><DollarSign size={24} /></div>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="w-[75%] bg-green-500 h-full"></div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 left-20 p-4 bg-indigo-600 rounded-xl shadow-lg transform group-hover:translate-y-[-10px] transition-transform duration-500">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg"><Globe size={20} className="text-white"/></div>
                    <div>
                      <p className="text-indigo-100 text-xs font-bold uppercase">White Label Domain</p>
                      <p className="text-white font-bold">photos.your-agency.com</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REVENUE CALCULATOR / BENEFITS --- */}
      <section id="features" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Top Agencies Switch</h2>
            <p className="text-slate-400 text-lg">We provide the engine. You keep the fuel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: DollarSign, 
                title: "Keep 100% Revenue", 
                desc: "Connect your own Stripe account. Payments go directly to you. We take 0% commission on your sales." 
              },
              { 
                icon: Globe, 
                title: "White Label Branding", 
                desc: "Your logo. Your colors. Your domain. Clients will never know Playa Photos exists." 
              },
              { 
                icon: Lock, 
                title: "Data Ownership", 
                desc: "You own the client data. Export emails, phone numbers, and sales reports instantly." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-slate-950 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Scale?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join 500+ agencies using Playa Photos to deliver millions of memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/login" className="px-10 py-5 bg-white text-indigo-900 font-bold text-lg rounded-xl hover:bg-slate-100 transition-colors shadow-xl">
               Create Agency Account
             </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">14-day free trial. No credit card required.</p>
        </div>
      </section>

    </div>
  );
};

export default AgencyLanding;