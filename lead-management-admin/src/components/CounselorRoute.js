// src/components/CounselorRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const CounselorRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!isLoggedIn || role !== 'counselor') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default CounselorRoute;
