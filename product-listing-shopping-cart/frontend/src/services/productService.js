import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/products` 
  : 'http://localhost:8080/api/products';

export const getProducts = () => {
  return axios.get(API_BASE_URL);
};

export const getProductById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const createProduct = (product) => {
  return axios.post(API_BASE_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_BASE_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

