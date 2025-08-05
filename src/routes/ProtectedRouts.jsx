// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

// const isAuthenticated = () => {
//   // Replace this with your actual auth logic
//   return !!localStorage.getItem('token');
// };
let isAuthenticated = true

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
