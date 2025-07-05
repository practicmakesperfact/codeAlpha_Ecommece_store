import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",  // Use environment variable
  withCredentials: true,
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCart = () => api.get('/orders/?completed=false');
export const addToCart = (productId, quantity = 1) => 
  api.post('/orders/', { product: productId, quantity });
export const checkout = () => api.post('/orders/checkout/');
export const login = (username, password) => 
  api.post('/api-auth/login/', { username, password });
export const register = (username, password, email) => 
  api.post('/api-auth/register/', { username, password, email });

export default api;