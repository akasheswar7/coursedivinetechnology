import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LeadProvider } from './context/LeadContext';

// Pages
import { LandingPage } from './pages/LandingPage';

// Admin Views
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminAddLead } from './pages/admin/AdminAddLead';
import { AdminDistribution } from './pages/admin/AdminDistribution';
import { AdminEmployees } from './pages/admin/AdminEmployees';
import { AdminSettings } from './pages/admin/AdminSettings';

// Employee Views
import { UserLogin } from './pages/user/UserLogin';
import { UserLayout } from './layouts/UserLayout';
import { UserDashboard } from './pages/user/UserDashboard';
import { UserMyLeads } from './pages/user/UserMyLeads';
import { UserProfile } from './pages/user/UserProfile';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeadProvider>
          <Routes>
            {/* Gateway Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Admin Portal */}
            <Route path="/adminportal" element={<AdminLogin />} />
            <Route path="/adminportal" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="add-lead" element={<AdminAddLead />} />
              <Route path="distribution" element={<AdminDistribution />} />
              <Route path="employees" element={<AdminEmployees />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Employee Portal */}
            <Route path="/userportal" element={<UserLogin />} />
            <Route path="/userportal" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="my-leads" element={<UserMyLeads />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LeadProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
