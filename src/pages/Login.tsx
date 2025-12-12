import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, Lock, Mail, Sparkles, User, Briefcase } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'guest' | 'agency'>('agency');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // SIMULATED LOGIN DELAY
    setTimeout(() => {
      setLoading(false);
      if (userType === 'agency') {
        navigate('/admin/dashboard');
      } else {
        // In a real app, this goes to the user's specific gallery
        navigate('/'); 
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-white">
      
      {/* LEFT SIDE: VISUALS (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90"></div>
        <img 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000" 
            alt="Event" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        
        <div className="relative z-10 max-w-md px-12 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
               className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20"
            >
                <Camera size={32} className="text-white" />
            </motion.div>
            <motion.h2 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
               className="text-4xl font-bold mb-6"
            >
               Capture the moment.<br/>Relive it forever.
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
               className="text-indigo-200 text-lg"
            >
               Join 500+ agencies delivering millions of memories automatically with AI.
            </motion.p>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
         <div className="w-full max-w-md">
            
            <div className="text-center mb-10">
               <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 font-bold mb-8 hover:text-white transition-colors">
                  <Camera size={20}/> Playa Photos
               </Link>
               <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
               <p className="text-slate-400">Enter your credentials to access your account.</p>
            </div>

            {/* USER TYPE TOGGLE */}
            <div className="bg-slate-900 p-1 rounded-xl flex mb-8 border border-slate-800">
               <button 
                 onClick={() => setUserType('agency')}
                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${userType === 'agency' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  <Briefcase size={16}/> Photographer
               </button>
               <button 
                 onClick={() => setUserType('guest')}
                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${userType === 'guest' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  <User size={16}/> Event Guest
               </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
               <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                  <div className="relative">
                     <input type="email" placeholder="name@company.com" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" required />
                     <Mail className="absolute left-4 top-4 text-slate-500" size={20}/>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Password</label>
                  <div className="relative">
                     <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" required />
                     <Lock className="absolute left-4 top-4 text-slate-500" size={20}/>
                  </div>
                  <div className="text-right mt-2">
                     <a href="#" className="text-xs text-indigo-400 hover:text-white">Forgot password?</a>
                  </div>
               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mt-4"
               >
                  {loading ? (
                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> Signing in...</span>
                  ) : (
                    <>Sign In <ArrowRight size={20}/></>
                  )}
               </button>
            </form>

            <p className="text-center text-slate-500 mt-8 text-sm">
               Don't have an account? <Link to="/agency" className="text-indigo-400 font-bold hover:text-white">Start Free Trial</Link>
            </p>

         </div>
      </div>

    </div>
  );
};

export default Login;