import React from 'react';
import { CheckCircle, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Complete!</h1>
        <Link to="/" className="text-slate-400 hover:text-slate-600 text-sm">Return to Home</Link>
      </div>
    </div>
  );
};
export default Success;