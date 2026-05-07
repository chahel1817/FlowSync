import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
};

export const projectService = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

export const customerService = {
  getAll: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
};

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

export default api;
