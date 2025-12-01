import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoutePaths } from './types';
import { PublicLayout, AppLayout, AdminLayout } from './components/Layouts';
import { CartProvider } from './contexts/CartContext';
import { AgencySidebarLayout } from './layouts/AgencySidebarLayout'; // Ensure you have this

// Pages
import Landing from './pages/Landing';
import AgencyLanding from './pages/AgencyLanding';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import EventGallery from './pages/EventGallery'; // NEW GALLERY
import Success from './pages/Success';
import EventsManager from './pages/admin/EventsManager';
import EventUploadManager from './pages/admin/EventUploadManager';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path={RoutePaths.HOME} element={<PublicLayout><Landing /></PublicLayout>} />
          <Route path={RoutePaths.AGENCY_LANDING} element={<PublicLayout><AgencyLanding /></PublicLayout>} />
          <Route path={RoutePaths.LOGIN} element={<PublicLayout><Login /></PublicLayout>} />
          <Route path={RoutePaths.TERMS} element={<PublicLayout><Terms /></PublicLayout>} />
          <Route path={RoutePaths.PRIVACY} element={<PublicLayout><Privacy /></PublicLayout>} />
          
          {/* NEW: Full Featured Gallery */}
          <Route path={RoutePaths.APP_GALLERY} element={<AppLayout><EventGallery /></AppLayout>} />
          <Route path={RoutePaths.CHECKOUT_SUCCESS} element={<PublicLayout><Success /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path={RoutePaths.ADMIN_EVENTS} element={<AgencySidebarLayout><EventsManager /></AgencySidebarLayout>} />
          <Route path={RoutePaths.ADMIN_EVENT_DETAIL} element={<AgencySidebarLayout><EventUploadManager /></AgencySidebarLayout>} />
          
          <Route path="*" element={<Navigate to={RoutePaths.HOME} replace />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
};
export default App;