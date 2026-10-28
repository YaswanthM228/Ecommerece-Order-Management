import apiClient from './apiClient';

export const productService = {
  // Query products with filters, sorting, search, pagination
  getProducts: async (params = {}) => {
    return apiClient.get('/products', params);
  },

  // Get details by ID or Slug
  getProductByIdOrSlug: async (idOrSlug) => {
    return apiClient.get(`/products/${idOrSlug}`);
  },

  // Get deals of the day
  getDeals: async () => {
    return apiClient.get('/products/deals');
  },

  // Get trending products (optional category filter)
  getTrending: async (categoryId = null) => {
    return apiClient.get('/products/trending', categoryId ? { category_id: categoryId } : {});
  },

  // Get featured products
  getFeatured: async () => {
    return apiClient.get('/products/featured');
  },

  // Get new arrivals
  getNewArrivals: async () => {
    return apiClient.get('/products/new-arrivals');
  },

  // Get best sellers
  getBestSellers: async () => {
    return apiClient.get('/products/best-sellers');
  },

  // Get related products for a given product ID
  getRelated: async (productId) => {
    return apiClient.get(`/products/related/${productId}`);
  },
};

export default productService;
