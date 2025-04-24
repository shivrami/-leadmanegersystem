import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role'); // e.g., 'admin' or 'counselor'
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect based on intended role
    return <Navigate to={userRole === 'admin' ? '/adminlogin' : '/'} state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    // Role mismatch, redirect to their respective dashboard or deny
    const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/counselor/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
