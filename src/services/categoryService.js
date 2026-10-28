import apiClient from './apiClient';

export const categoryService = {
  // Get all active categories with product count
  getCategories: async () => {
    return apiClient.get('/categories');
  },

  // Get single category by slug
  getCategoryBySlug: async (slug) => {
    return apiClient.get(`/categories/${slug}`);
  },

  // Get products of a category
  getCategoryProducts: async (slug, params = {}) => {
    return apiClient.get(`/categories/${slug}/products`, params);
  },
};

export default categoryService;
