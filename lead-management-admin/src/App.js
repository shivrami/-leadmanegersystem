import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';




import AdminLeadSource from './pages/Admin/adminLeadsource/AdminLeadSource';
import AdminLeadStatus from './pages/Admin/leadstatus/AdminLeadStatus';
import AdminCourses from './pages/Admin/AdminCourses/AdminCourses';
import AdminUserManagement from './pages/Admin/AdminUserManagement/AdminUserManagement';

import PrivateRoute from './components/PrivateRoute';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import Counselorlogin from './pages/counselor/counselorlogin/Counselorlogin.js';

import AdminDashboardPage from './pages/Admin/dashborad/AdminDashboradPage';
import CounselorDashboardPage from './pages/counselor/dashborad/CounselorDashboradPage';
import ChangePassword from './pages/counselor/ChangePassword/ChangePassword.js';
import AllLead from './pages/counselor/lead/AllLead.js';
import LeadDetails from './pages/counselor/lead/LeadDetails.js';
import OpenLead from './pages/counselor/lead/OpenLead.js';
import ConvertedLead from './pages/counselor/lead/ConvertedLead.js';
import ClosedLead from './pages/counselor/lead/ClosedLead.js';
import TodayFollowUps from './pages/followup/TodayFollowUps.js';
import OverdueFollowUps from './pages/followup/OverdueFollowIps.js';
import FutureFollowUps from './pages/followup/FutureFollowUps.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<Counselorlogin />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/leadstatus"
          element={
            <PrivateRoute>
              <AdminLeadStatus />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/leadsource"
          element={
            <PrivateRoute>
              <AdminLeadSource />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/course"
          element={
            <PrivateRoute>
              <AdminCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/adminUserManagement"
          element={
            <PrivateRoute>
              <AdminUserManagement />
            </PrivateRoute>
          }
        />

        {/* Counselor Protected Route */}
        <Route
          path="/counselor/dashboard"
          element={
            <PrivateRoute>
              <CounselorDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/changepassword"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/allleads"
          element={
            <PrivateRoute>
              <AllLead />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/openleads"
          element={
            <PrivateRoute>
              <OpenLead />
            </PrivateRoute>
          }
        />

        <Route
          path="/counselor/convertedleads"
          element={
            <PrivateRoute>
              <ConvertedLead />
            </PrivateRoute>
          }
        />

        <Route
          path="/counselor/closedleads"
          element={
            <PrivateRoute>
              <ClosedLead />
            </PrivateRoute>
          }
        />


        <Route
          path="/counselor/todayfollowups"
          element={
            <PrivateRoute>
              <TodayFollowUps />
            </PrivateRoute>
          }
        />

        <Route
          path="/counselor/overduefollowups"
          element={
            <PrivateRoute>
              <OverdueFollowUps />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselor/futurefollowups"
          element={
            <PrivateRoute>
              <FutureFollowUps />
            </PrivateRoute>
          }
        />

        <Route path="/lead-details/:leadId" element={<LeadDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
