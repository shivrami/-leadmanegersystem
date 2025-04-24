import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Admin Pages
import AdminLeadSource from './pages/Admin/adminLeadsource/AdminLeadSource';
import AdminLeadStatus from './pages/Admin/leadstatus/AdminLeadStatus';
import AdminCourses from './pages/Admin/AdminCourses/AdminCourses';
import AdminUserManagement from './pages/Admin/AdminUserManagement/AdminUserManagement';

// Counselor Pages
import Counselorlogin from './pages/counselor/counselorlogin/Counselorlogin';
import CounselorDashboardPage from './pages/counselor/dashborad/CounselorDashboradPage';
import ChangePassword from './pages/counselor/ChangePassword/ChangePassword';
import AllLead from './pages/counselor/lead/AllLead';
import OpenLead from './pages/counselor/lead/OpenLead';
import ConvertedLead from './pages/counselor/lead/ConvertedLead';
import ClosedLead from './pages/counselor/lead/ClosedLead';
import LeadDetails from './pages/counselor/lead/LeadDetails';

// Follow-ups
import TodayFollowUps from './pages/followup/TodayFollowUps';
import OverdueFollowUps from './pages/followup/OverdueFollowIps';
import FutureFollowUps from './pages/followup/FutureFollowUps';

// Auth
import AdminLogin from './pages/Admin/Login/AdminLogin';

// Components
import PrivateRoute from './components/PrivateRoute';

import { Navigate } from 'react-router-dom';
import AdminDashboardPage from './pages/Admin/dashborad/AdminDashboardPage ';
// Optional: Not Found Page
// import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<Navigate to="/counselor" replace />} />
        <Route path="/counselor" element={<Counselorlogin />} />


        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/leadstatus"
          element={
            <PrivateRoute role="admin">
              <AdminLeadStatus />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/leadsource"
          element={
            <PrivateRoute role="admin">
              <AdminLeadSource />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/course"
          element={
            <PrivateRoute role="admin">
              <AdminCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/adminUserManagement"
          element={
            <PrivateRoute role="admin">
              <AdminUserManagement />
            </PrivateRoute>
          }
        />

        {/* Counselor Protected Routes */}
        <Route
          path="/counselor/dashboard"
          element={
            <PrivateRoute role="counselor">
              <CounselorDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/changepassword"
          element={
            <PrivateRoute role="counselor">
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/allleads"
          element={
            <PrivateRoute role="counselor">
              <AllLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/openleads"
          element={
            <PrivateRoute role="counselor">
              <OpenLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/convertedleads"
          element={
            <PrivateRoute role="counselor">
              <ConvertedLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/closedleads"
          element={
            <PrivateRoute role="counselor">
              <ClosedLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/todayfollowups"
          element={
            <PrivateRoute role="counselor">
              <TodayFollowUps />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/overduefollowups"
          element={
            <PrivateRoute role="counselor">
              <OverdueFollowUps />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/futurefollowups"
          element={
            <PrivateRoute role="counselor">
              <FutureFollowUps />
            </PrivateRoute>
          }
        />

        {/* Lead Details - visible to both roles if needed */}
        <Route
          path="/lead-details/:leadId"
          element={
            <PrivateRoute>
              <LeadDetails />
            </PrivateRoute>
          }
        />

        {/* Optional 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
