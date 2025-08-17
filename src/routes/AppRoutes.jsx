// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import WithNav from '../layouts/WithNav';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRouts';
import Products from '../pages/Products';
import PageNotFound from '../pages/PageNotFound';
import PostProduct from '../pages/PostProduct';
import ProductView from '../pages/ProductView';
import FindProduct from '../pages/FindProduct';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyProfile from '../pages/MyProfile';
import PaymentSuccess from '../components/PaymentSuccess'
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<WithNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductView />} />
        <Route path="/find-product" element={<FindProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


      </Route>
      {/* <Route path="/login" element={<Login />} /> */}

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<WithNav />}>
        <Route path="/post-ad" element={<PostProduct />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
