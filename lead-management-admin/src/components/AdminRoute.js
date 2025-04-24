// src/components/AdminRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!isLoggedIn || role !== 'admin') {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
