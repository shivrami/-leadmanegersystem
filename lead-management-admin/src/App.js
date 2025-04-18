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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/counselorlogin" element={<Counselorlogin />} />

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
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
