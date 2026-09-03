import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all products from the backend database
 */
export async function fetchProducts() {
  const response = await apiClient.get('/api/products');
  return response.data;
}

/**
 * Fetch single product details with variants and EMI plans by slug
 */
export async function fetchProductBySlug(slug) {
  const response = await apiClient.get(`/api/products/${slug}`);
  return response.data;
}

export default apiClient;
