// src/components/PrivateRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role'); // 'admin' or 'counselor'
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={userRole === 'counselor' ? '/counselorlogin' : '/adminlogin'} state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    // Prevent access if user is logged in but not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
