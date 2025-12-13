import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { RoutePaths } from './types';
import { PublicLayout, AppLayout } from './components/Layouts';
import { CartProvider } from './contexts/CartContext';
import { Loader2, LayoutDashboard, Image, Settings, BookOpen, LogOut } from 'lucide-react';

// CORE IMPORTS
import Landing from './pages/Landing';
import AgencyLanding from './pages/AgencyLanding';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Success from './pages/Success';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import EventWall from './pages/EventWall';     // <--- NEW FILE
import MobileUpload from './pages/MobileUpload'; // <--- NEW FILE

// Lazy Imports
const EventGallery = React.lazy(() => import('./pages/EventGallery'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const EventsManager = React.lazy(() => import('./pages/admin/EventsManager'));
const EventUploadManager = React.lazy(() => import('./pages/admin/EventUploadManager'));
const Documentation = React.lazy(() => import('./pages/admin/Documentation'));
const AdminSettings = React.lazy(() => import('./pages/admin/Settings'));

const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
  </div>
);

// INTERNAL AGENCY LAYOUT
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
          
          {/* UPDATED ROUTES */}
          <Route path="/live/:eventId" element={<EventWall />} />
          <Route path="/live/demo" element={<EventWall />} />
          <Route path="/upload/:eventId" element={<MobileUpload />} />

          <Route path={RoutePaths.APP_GALLERY} element={<AppLayout><Suspense fallback={<PageLoader />}><EventGallery /></Suspense></AppLayout>} />
          <Route path={RoutePaths.EVENT_SLUG} element={<AppLayout><Suspense fallback={<PageLoader />}><EventGallery /></Suspense></AppLayout>} />
          <Route path="/success" element={<PublicLayout><Success /></PublicLayout>} />
          <Route path={RoutePaths.CHECKOUT_SUCCESS} element={<PublicLayout><Success /></PublicLayout>} />

          <Route path={RoutePaths.ADMIN_DASHBOARD} element={<Suspense fallback={<PageLoader />}><AgencyLayout><Dashboard /></AgencyLayout></Suspense>} />
          <Route path={RoutePaths.ADMIN_EVENTS} element={<Suspense fallback={<PageLoader />}><AgencyLayout><EventsManager /></AgencyLayout></Suspense>} />
          <Route path={RoutePaths.ADMIN_EVENT_DETAIL} element={<Suspense fallback={<PageLoader />}><AgencyLayout><EventUploadManager /></AgencyLayout></Suspense>} />
          <Route path="/admin/documentation" element={<Suspense fallback={<PageLoader />}><AgencyLayout><Documentation /></AgencyLayout></Suspense>} />
          <Route path="/admin/settings" element={<Suspense fallback={<PageLoader />}><AgencyLayout><AdminSettings /></AgencyLayout></Suspense>} />
          
          <Route path="/selfie" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to={RoutePaths.HOME} replace />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
};
export default App;