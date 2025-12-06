import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Image, Settings, BookOpen, LogOut } from 'lucide-react';

// We built a simple sidebar directly here to ensure no other missing file errors occur
const AdminSidebar = () => (
  <div className="w-64 bg-slate-900 h-full flex flex-col text-white">
    <div className="p-6 font-bold text-xl tracking-tight">Agency Portal</div>
    <nav className="flex-1 px-4 space-y-2">
      <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"><LayoutDashboard size={20}/> Dashboard</Link>
      <Link to="/admin/events" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"><Image size={20}/> Events</Link>
      <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"><Settings size={20}/> Settings</Link>
      <Link to="/admin/documentation" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"><BookOpen size={20}/> Docs</Link>
    </nav>
    <div className="p-4 border-t border-slate-800">
      <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg"><LogOut size={20}/> Exit</Link>
    </div>
  </div>
);

export const AgencyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
};