import apiClient from './apiClient';

export const authService = {
  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    if (res?.data?.token) {
      localStorage.setItem('shopsphere_token', res.data.token);
      localStorage.setItem('shopsphere_auth_user', JSON.stringify(res.data.user));
    }
    return res;
  },

  register: async (userData) => {
    const res = await apiClient.post('/auth/register', userData);
    if (res?.data?.token) {
      localStorage.setItem('shopsphere_token', res.data.token);
      localStorage.setItem('shopsphere_auth_user', JSON.stringify(res.data.user));
    }
    return res;
  },

  getProfile: async () => {
    return apiClient.get('/auth/profile');
  },

  logout: () => {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_auth_user');
  },

  getCurrentUser: () => {
    try {
      const saved = localStorage.getItem('shopsphere_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
