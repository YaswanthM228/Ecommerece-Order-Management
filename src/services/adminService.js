import apiClient from './apiClient';

export const adminService = {
  // Admin login
  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    if (res?.data?.token && res?.data?.user?.role === 'admin') {
      localStorage.setItem('shopsphere_admin_token', res.data.token);
      localStorage.setItem('shopsphere_token', res.data.token);
      localStorage.setItem('shopsphere_admin_user', JSON.stringify(res.data.user));
    }
    return res;
  },

  // Admin dashboard metrics
  getDashboardStats: async () => {
    return apiClient.get('/admin/dashboard');
  },

  // Inventory list
  getInventory: async (params = {}) => {
    return apiClient.get('/admin/inventory', params);
  },

  // Update inventory stock
  updateStock: async (productId, stockQuantity) => {
    return apiClient.patch(`/admin/inventory/${productId}`, { stock_quantity: stockQuantity });
  },

  // Reports
  getSalesReport: async (timeframe = '30d') => {
    return apiClient.get('/admin/reports/sales', { timeframe });
  },

  getInventoryReport: async () => {
    return apiClient.get('/admin/reports/inventory');
  },

  // Orders management
  getAllOrders: async (params = {}) => {
    return apiClient.get('/admin/orders', params);
  },

  updateOrderStatus: async (orderId, orderStatus, trackingNumber = null) => {
    return apiClient.put(`/admin/orders/${orderId}/status`, { order_status: orderStatus, tracking_number: trackingNumber });
  },
};

export default adminService;
