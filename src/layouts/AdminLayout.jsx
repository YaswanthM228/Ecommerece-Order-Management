import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminToolbar } from '../components/admin/AdminToolbar';
import { Toast } from '../components/common/Toast';
import { useShop } from '../context/ShopContext';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdminLoggedIn } = useShop();
  const location = useLocation();

  // Route title helper
  const getPageTitle = (pathname) => {
    if (pathname.includes('/products')) return 'Product Catalog Management';
    if (pathname.includes('/categories')) return 'Category Hierarchy';
    if (pathname.includes('/orders')) return 'Order Fulfillment';
    if (pathname.includes('/customers')) return 'Customer Directory';
    if (pathname.includes('/inventory')) return 'Real-Time Inventory & Stock';
    if (pathname.includes('/reports')) return 'Sales Analytics & Reports';
    if (pathname.includes('/settings')) return 'Store Configuration';
    return 'Executive Dashboard';
  };

  // UI demo access check: if not logged in, redirect to /admin/login
  if (!isAdminLoggedIn && !location.pathname.includes('/admin/login')) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#070A1E] text-[#111827] dark:text-[#F8FAFC] flex transition-colors">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminToolbar
          onOpenSidebar={() => setSidebarOpen(true)}
          pageTitle={getPageTitle(location.pathname)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
};
