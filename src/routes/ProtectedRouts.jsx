import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Send the user to login, but remember where they were going
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}