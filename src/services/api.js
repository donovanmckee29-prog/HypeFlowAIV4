import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Grader API
export const graderAPI = {
  getSchema: () => api.get('/grader/schema'),
  predict: (imageData) => api.post('/grader/predict', { image: imageData }),
};

// Market API
export const marketAPI = {
  getTopPicks: () => api.get('/market/top-picks'),
  getListings: (filters = {}) => api.get('/market/listings', { params: filters }),
  getMarketData: (cardId) => api.get(`/market/data/${cardId}`),
};

// Oracle API
export const oracleAPI = {
  query: (question, context = {}) => api.post('/oracle/query', { question, context }),
  getHistory: () => api.get('/oracle/history'),
};

// Portfolio API
export const portfolioAPI = {
  getValue: () => api.get('/portfolio/value'),
  getItems: () => api.get('/portfolio/items'),
  addItem: (item) => api.post('/portfolio/items', item),
  updateItem: (id, item) => api.put(`/portfolio/items/${id}`, item),
  deleteItem: (id) => api.delete(`/portfolio/items/${id}`),
};

// Compass API
export const compassAPI = {
  getWeekly: () => api.get('/compass/weekly'),
  getPlaybooks: () => api.get('/compass/playbooks'),
};

// Arena API
export const arenaAPI = {
  getLeaderboard: () => api.get('/arena/leaderboard'),
  getChallenges: () => api.get('/arena/challenges'),
  submitAction: (action) => api.post('/arena/actions', action),
};

// Futurecast API
export const futurecastAPI = {
  getPredictions: () => api.get('/futurecast/predictions'),
  getTrends: () => api.get('/futurecast/trends'),
};

export default api;
