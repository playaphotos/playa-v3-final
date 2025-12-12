import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, trigger Firebase password reset here
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        
        <Link to="/login" className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-bold mb-8 transition-colors">
           <ChevronLeft size={16}/> Back to Login
        </Link>

        {submitted ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32}/>
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Check your Inbox</h2>
             <p className="text-slate-400 mb-8">We've sent a password reset link to <strong className="text-white">{email}</strong>.</p>
             <button onClick={() => setSubmitted(false)} className="text-indigo-400 hover:text-white font-bold text-sm">Try another email</button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-slate-400 mb-8">Enter your email and we'll send you a link to get back into your account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Email Address</label>
                  <div className="relative">
                     <input 
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="name@company.com" 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                       required 
                     />
                     <Mail className="absolute left-4 top-4 text-slate-600" size={20}/>
                  </div>
               </div>

               <button type="submit" className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  Send Reset Link <ArrowRight size={20}/>
               </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;