import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

// Products
export const getProducts = (params) => api.get('/products', { params });
export const searchProducts = (q) => api.get('/products/search', { params: { q } });
export const getCategories = () => api.get('/products/categories');
export const getProductById = (id) => api.get(`/products/${id}`);

// Reviews
export const getProductReviews = (productId) => api.get(`/reviews/product/${productId}`);
export const createReview = (data) => api.post('/reviews', data);

// Wishlist (Phase 9)
export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (productId) => api.post('/wishlist', { productId });
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`);

// Search History (Phase 9)
export const getSearchHistory = () => api.get('/search-history');
export const deleteSearchHistory = (id) => api.delete(`/search-history/${id}`);

// AI (Phase 6)
export const sendAIChat = (query) => api.post('/ai/chat', { query });

export default api;
