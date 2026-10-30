import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/products` 
  : 'https://curvy-kiwis-dance.loca.lt/api/products';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'bypass-tunnel-reminder': 'true'
  }
});

export const getProducts = () => {
  return apiClient.get('');
};

export const getProductById = (id) => {
  return apiClient.get(`/${id}`);
};

export const createProduct = (product) => {
  return apiClient.post('', product);
};

export const updateProduct = (id, product) => {
  return apiClient.put(`/${id}`, product);
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/${id}`);
};

