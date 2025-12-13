import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { RoutePaths } from './types';
import { PublicLayout, AppLayout } from './components/Layouts';
import { CartProvider } from './contexts/CartContext';
import { LayoutDashboard, Image, Settings, BookOpen, LogOut, Bug } from 'lucide-react';

// --- EAGER IMPORTS (Safe Mode) ---
import Landing from './pages/Landing';
import AgencyLanding from './pages/AgencyLanding';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Success from './pages/Success';
import Features from './pages/Features';
import Pricing from './pages/Pricing';

// THE NEW COMPONENTS (Must match filenames exactly)
import EventWall from './pages/EventWall';       // The Sidebar Version
import MobileUpload from './pages/MobileUpload'; // The "No Error" Version
import EventGallery from './pages/EventGallery';

// Admin
import Dashboard from './pages/admin/Dashboard';
import EventsManager from './pages/admin/EventsManager';
import EventUploadManager from './pages/admin/EventUploadManager';
import Documentation from './pages/admin/Documentation';
import AdminSettings from './pages/admin/Settings';

const AgencyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen bg-slate-50">
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
    <main className="flex-1 overflow-y-auto relative">{children}</main>
  </div>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-[10px] font-bold text-center pointer-events-none opacity-50">
        VERSION 4.0 - ROUTER RESET
      </div>
      <HashRouter>
        <Routes>
          <Route path={RoutePaths.HOME} element={<PublicLayout><Landing /></PublicLayout>} />
          <Route path={RoutePaths.AGENCY_LANDING} element={<PublicLayout><AgencyLanding /></PublicLayout>} />
          <Route path={RoutePaths.LOGIN} element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
          <Route path={RoutePaths.TERMS} element={<PublicLayout><Terms /></PublicLayout>} />
          <Route path={RoutePaths.PRIVACY} element={<PublicLayout><Privacy /></PublicLayout>} />
          <Route path={RoutePaths.PRICING} element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path={RoutePaths.FEATURES} element={<PublicLayout><Features /></PublicLayout>} />
          
          {/* CRITICAL: Pointing to NEW Files */}
          <Route path="/live/:eventId" element={<EventWall />} />
          <Route path="/live/demo" element={<EventWall />} />
          <Route path="/upload/:eventId" element={<MobileUpload />} />

          <Route path={RoutePaths.APP_GALLERY} element={<AppLayout><EventGallery /></AppLayout>} />
          <Route path={RoutePaths.EVENT_SLUG} element={<AppLayout><EventGallery /></AppLayout>} />
          <Route path="/success" element={<PublicLayout><Success /></PublicLayout>} />
          <Route path={RoutePaths.CHECKOUT_SUCCESS} element={<PublicLayout><Success /></PublicLayout>} />

          <Route path={RoutePaths.ADMIN_DASHBOARD} element={<AgencyLayout><Dashboard /></AgencyLayout>} />
          <Route path={RoutePaths.ADMIN_EVENTS} element={<AgencyLayout><EventsManager /></AgencyLayout>} />
          <Route path={RoutePaths.ADMIN_EVENT_DETAIL} element={<AgencyLayout><EventUploadManager /></AgencyLayout>} />
          <Route path="/admin/documentation" element={<AgencyLayout><Documentation /></AgencyLayout>} />
          <Route path="/admin/settings" element={<AgencyLayout><AdminSettings /></AgencyLayout>} />
          
          <Route path="/selfie" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to={RoutePaths.HOME} replace />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
};
export default App;