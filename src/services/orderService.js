import apiClient from './apiClient';

export const orderService = {
  // Transactional checkout
  checkout: async (payload) => {
    return apiClient.post('/orders/checkout', payload);
  },

  // Customer order history
  getUserOrders: async () => {
    return apiClient.get('/orders');
  },

  // Single order details
  getOrderById: async (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },

  // Official Invoice
  getInvoice: async (orderId) => {
    return apiClient.get(`/orders/${orderId}/invoice`);
  },

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    return apiClient.put(`/orders/${orderId}/cancel`, { reason });
  },
};

export default orderService;
