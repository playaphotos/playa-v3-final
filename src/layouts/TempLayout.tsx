import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';

interface AgencySidebarLayoutProps {
  children: React.ReactNode;
}

export const AgencySidebarLayout: React.FC<AgencySidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* The Sidebar (Navigation) */}
      <AdminSidebar />
      
      {/* The Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
};