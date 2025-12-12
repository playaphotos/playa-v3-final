import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Key, CreditCard, Globe, Lock, ShieldCheck, CheckCircle, Info, RefreshCw, AlertCircle, Copy } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Domain Verification Mock
  const [verifying, setVerifying] = useState(false);
  const [domainStatus, setDomainStatus] = useState<'pending' | 'active'>('pending');

  const [formData, setFormData] = useState({
    agencyName: 'Magic Moments Photography',
    domain: 'photos.magic-moments.com',
    stripeKey: 'sk_live_51N...',
    stripePublic: 'pk_live_51N...',
    aiKey: ''
  });

  // Calculate the subdomain for the instructions (e.g., "photos" from "photos.domain.com")
  const getSubdomain = () => {
    try {
        const parts = formData.domain.split('.');
        if (parts.length > 2) return parts[0]; // photos.domain.com -> photos
        return '@'; // domain.com -> @ (Root)
    } catch { return 'www'; }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const handleVerifyDomain = () => {
    setVerifying(true);
    setTimeout(() => {
        setVerifying(false);
        setDomainStatus('active');
    }, 2000);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agency Settings</h1>
        <p className="text-slate-500">Manage your payment gateways, API keys, and white-label branding.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
          {[
            { id: 'payments', label: 'Payments & Stripe', icon: CreditCard },
            { id: 'branding', label: 'White Labeling', icon: Globe },
            { id: 'security', label: 'API Keys', icon: Key },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          
          {/* --- TAB: PAYMENTS --- */}
          {activeTab === 'payments' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-indigo-600"/> Stripe Configuration
              </h2>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
                <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={20}/>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Direct Revenue Mode</h4>
                  <p className="text-blue-700 text-sm">You are in Direct Mode. 100% of customer payments go directly to your Stripe account.</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Stripe Secret Key (Live)</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={formData.stripeKey} 
                      onChange={(e) => setFormData({...formData, stripeKey: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Lock className="absolute left-3 top-3 text-slate-400" size={16}/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Stripe Publishable Key</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.stripePublic} 
                      onChange={(e) => setFormData({...formData, stripePublic: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Globe className="absolute left-3 top-3 text-slate-400" size={16}/>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- TAB: BRANDING (With Detailed DNS Instructions) --- */}
          {activeTab === 'branding' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="text-purple-600"/> White Label Settings
              </h2>
              
              <div className="space-y-6 max-w-2xl">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Agency Name</label>
                    <input 
                      type="text" 
                      value={formData.agencyName}
                      onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
                 
                 <div className="border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-slate-700">Custom Domain</label>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${domainStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {domainStatus === 'active' ? 'Verified' : 'Pending Configuration'}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <span className="text-slate-400 font-mono select-none">https://</span>
                       <input 
                         type="text" 
                         value={formData.domain}
                         onChange={(e) => {
                             setFormData({...formData, domain: e.target.value});
                             setDomainStatus('pending'); // Reset verification on edit
                         }}
                         className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                       />
                       <button 
                         onClick={handleVerifyDomain}
                         disabled={verifying || domainStatus === 'active'}
                         className="px-4 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
                       >
                         {verifying ? <RefreshCw className="animate-spin" size={16}/> : (domainStatus === 'active' ? <CheckCircle size={16}/> : 'Verify')}
                       </button>
                    </div>

                    {/* DNS INSTRUCTIONS CARD */}
                    {domainStatus === 'pending' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20}/>
                                <div>
                                    <h4 className="font-bold text-amber-900 text-sm">DNS Configuration Required</h4>
                                    <p className="text-amber-700 text-xs mt-1">
                                        Log in to your domain provider (GoDaddy, Namecheap, etc.) and add the following record:
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white border border-amber-200 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-amber-100/50 text-amber-900">
                                        <tr>
                                            <th className="p-3 border-r border-amber-100">Type</th>
                                            <th className="p-3 border-r border-amber-100">Name / Host</th>
                                            <th className="p-3">Value / Target</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono text-slate-700">
                                        <tr>
                                            <td className="p-3 border-r border-slate-100 font-bold">CNAME</td>
                                            <td className="p-3 border-r border-slate-100">{getSubdomain()}</td>
                                            <td className="p-3 flex justify-between items-center group cursor-pointer hover:bg-slate-50" title="Click to copy">
                                                <span>cname.playaphotos.com</span>
                                                <Copy size={12} className="text-slate-400 opacity-0 group-hover:opacity-100"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-amber-600/80 mt-3 text-center">DNS changes can take up to 24 hours to propagate.</p>
                        </div>
                    )}
                 </div>
              </div>
            </motion.div>
          )}

           {/* --- TAB: SECURITY --- */}
           {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
               <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Key className="text-orange-600"/> API Configurations
              </h2>
               <div className="space-y-6 max-w-2xl">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">OpenAI / Replicate API Key (Optional)</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value={formData.aiKey}
                        onChange={(e) => setFormData({...formData, aiKey: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <Key className="absolute left-3 top-3 text-slate-400" size={16}/>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* SAVE BUTTON */}
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (saved ? 'Changes Saved!' : 'Save Changes')}
              {saved ? <CheckCircle size={18}/> : <Save size={18}/>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default AdminSettings;