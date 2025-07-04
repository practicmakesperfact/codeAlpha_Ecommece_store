import axios from 'axios';

const api = axios.create({
  baseURL: "https://expert-fortnight-wrgxxjvwwpw52gq75-8000.app.github.dev/api",
  withCredentials: true,  // If using cookies/session auth
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