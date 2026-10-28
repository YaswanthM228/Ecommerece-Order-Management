import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Customer Pages
import { HomePage } from '../pages/customer/HomePage';
import { ProductListingPage } from '../pages/products/ProductListingPage';
import { ProductDetailPage } from '../pages/products/ProductDetailPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { OrderConfirmationPage } from '../pages/checkout/OrderConfirmationPage';
import { OrderDetailViewPage } from '../pages/customer/OrderDetailViewPage';
import { WishlistPage } from '../pages/customer/WishlistPage';
import { TrackOrderPage } from '../pages/customer/TrackOrderPage';
import { VIPMembershipPage } from '../pages/customer/VIPMembershipPage';
import { SupportPage } from '../pages/customer/SupportPage';
import { BrandsPage } from '../pages/customer/BrandsPage';
import { NotFoundPage } from '../pages/common/NotFoundPage';

// Account Pages
import { ProfilePage } from '../pages/account/ProfilePage';
import { OrdersHistoryPage } from '../pages/account/OrdersHistoryPage';
import { NotificationsPage } from '../pages/account/NotificationsPage';
import { SettingsPage } from '../pages/account/SettingsPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';

// Admin Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from '../pages/admin/AdminCustomersPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Storefront Routes (wrapped in CustomerLayout) */}
      <Route element={<CustomerLayout />}>
        {/* Home & Catalog Collections */}
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<ProductListingPage />} />
        <Route path="/category/:categorySlug" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/search" element={<ProductListingPage />} />
        <Route path="/deals" element={<ProductListingPage />} />
        <Route path="/new-arrivals" element={<ProductListingPage />} />
        <Route path="/best-sellers" element={<ProductListingPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/gift-cards" element={<VIPMembershipPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/vip-membership" element={<VIPMembershipPage />} />
        <Route path="/help" element={<SupportPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Product Details (Support /product/:id and /products/:id and /products/slug/:slug) */}
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/products/slug/:productId" element={<ProductDetailPage />} />

        {/* Shopping Cart & Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />

        {/* Customer Orders & Invoices */}
        <Route path="/orders" element={<OrdersHistoryPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailViewPage />} />
        <Route path="/orders/:orderId/invoice" element={<OrderDetailViewPage />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Customer Account Sub-Routes */}
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/profile" element={<ProfilePage />} />
        <Route path="/account/addresses" element={<ProfilePage />} />
        <Route path="/account/orders" element={<OrdersHistoryPage />} />
        <Route path="/account/notifications" element={<NotificationsPage />} />
        <Route path="/account/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* 404 Route within Customer Layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Standalone Authentication Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Portal Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
