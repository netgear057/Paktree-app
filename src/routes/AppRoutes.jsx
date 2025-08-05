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
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<WithNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/post-ad" element={<PostProduct />} />
        <Route path="/product-details/:id" element={<ProductView />} />
        <Route path="/find-product" element={<FindProduct />} />

      </Route>
      {/* <Route path="/login" element={<Login />} /> */}

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<WithNav />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
