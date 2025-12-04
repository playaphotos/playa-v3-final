import React from 'react';
import { CreditCard, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Agency Settings</h1>

      {/* Stripe Connect Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Payout Settings</h2>
            <p className="text-slate-500 text-sm">Connect Stripe to receive payouts from your photo sales.</p>
          </div>
        </div>
        
        <button 
          onClick={() => alert("This requires a live Stripe Production Key to work.")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          Connect with Stripe
        </button>
      </div>

      {/* API Keys Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">AI Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Google Vertex AI Key</label>
            <input type="password" className="w-full border border-slate-300 rounded-lg p-2" placeholder="AIzaSy..." />
          </div>
          <button className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;