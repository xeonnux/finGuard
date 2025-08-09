import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  Product,
  PricePoint,
  PriceAlert,
  Budget,
  Bill,
  BillRecommendation,
  AffordabilityQuery,
  AffordabilitySuggestion,
  InflationData,
} from '@/types';

// API Configuration
const API_BASE_URL = 'https://api.finguard.com'; // Replace with actual API URL
const API_VERSION = 'v1';

const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('auth_token');
      AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    await AsyncStorage.setItem('auth_token', token);
    return user;
  },

  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    const { token, user } = response.data;
    await AsyncStorage.setItem('auth_token', token);
    return user;
  },

  logout: async () => {
    await api.post('/auth/logout');
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    const { token } = response.data;
    await AsyncStorage.setItem('auth_token', token);
    return token;
  },
};

// User Services
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  deleteAccount: async () => {
    await api.delete('/user/account');
  },
};

// Price Tracking Services
export const priceAPI = {
  searchProducts: async (query: string, category?: string): Promise<Product[]> => {
    const response = await api.get('/products/search', {
      params: { query, category },
    });
    return response.data;
  },

  addProductToWatchlist: async (productData: {
    name: string;
    url?: string;
    targetPrice: number;
    category: string;
  }): Promise<Product> => {
    const response = await api.post('/products/watchlist', productData);
    return response.data;
  },

  getWatchlist: async (): Promise<Product[]> => {
    const response = await api.get('/products/watchlist');
    return response.data;
  },

  removeFromWatchlist: async (productId: string) => {
    await api.delete(`/products/watchlist/${productId}`);
  },

  getPriceHistory: async (productId: string): Promise<PricePoint[]> => {
    const response = await api.get(`/products/${productId}/prices`);
    return response.data;
  },

  getCurrentPrices: async (productId: string): Promise<PricePoint[]> => {
    const response = await api.get(`/products/${productId}/prices/current`);
    return response.data;
  },

  getPriceAlerts: async (): Promise<PriceAlert[]> => {
    const response = await api.get('/alerts/price');
    return response.data;
  },

  updatePriceAlert: async (alertId: string, targetPrice: number) => {
    await api.put(`/alerts/price/${alertId}`, { targetPrice });
  },
};

// Budget Services
export const budgetAPI = {
  getBudgets: async (month?: string): Promise<Budget[]> => {
    const response = await api.get('/budgets', {
      params: { month },
    });
    return response.data;
  },

  createBudget: async (budgetData: {
    category: string;
    allocatedAmount: number;
    month: string;
  }): Promise<Budget> => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  updateBudget: async (budgetId: string, budgetData: Partial<Budget>): Promise<Budget> => {
    const response = await api.put(`/budgets/${budgetId}`, budgetData);
    return response.data;
  },

  deleteBudget: async (budgetId: string) => {
    await api.delete(`/budgets/${budgetId}`);
  },

  getBudgetInsights: async (month?: string) => {
    const response = await api.get('/budgets/insights', {
      params: { month },
    });
    return response.data;
  },

  adjustBudgetForInflation: async (budgetId: string) => {
    const response = await api.post(`/budgets/${budgetId}/adjust-inflation`);
    return response.data;
  },
};

// Bill Services
export const billAPI = {
  getBills: async (): Promise<Bill[]> => {
    const response = await api.get('/bills');
    return response.data;
  },

  createBill: async (billData: {
    name: string;
    category: string;
    amount: number;
    provider: string;
    dueDate: string;
    frequency: string;
  }): Promise<Bill> => {
    const response = await api.post('/bills', billData);
    return response.data;
  },

  updateBill: async (billId: string, billData: Partial<Bill>): Promise<Bill> => {
    const response = await api.put(`/bills/${billId}`, billData);
    return response.data;
  },

  deleteBill: async (billId: string) => {
    await api.delete(`/bills/${billId}`);
  },

  getBillRecommendations: async (): Promise<BillRecommendation[]> => {
    const response = await api.get('/bills/recommendations');
    return response.data;
  },

  initiateSwitch: async (recommendationId: string) => {
    const response = await api.post(`/bills/recommendations/${recommendationId}/switch`);
    return response.data;
  },
};

// Affordability Services
export const affordabilityAPI = {
  getSuggestions: async (query: AffordabilityQuery): Promise<AffordabilitySuggestion[]> => {
    const response = await api.post('/affordability/suggestions', query);
    return response.data;
  },

  getPopularSuggestions: async (category: string, location?: string) => {
    const response = await api.get('/affordability/popular', {
      params: { category, location },
    });
    return response.data;
  },
};

// Inflation & Market Data Services
export const marketAPI = {
  getInflationData: async (country?: string, category?: string): Promise<InflationData[]> => {
    const response = await api.get('/market/inflation', {
      params: { country, category },
    });
    return response.data;
  },

  getMarketTrends: async (category: string, location?: string) => {
    const response = await api.get('/market/trends', {
      params: { category, location },
    });
    return response.data;
  },

  getCurrencyRates: async (baseCurrency: string) => {
    const response = await api.get('/market/currency', {
      params: { base: baseCurrency },
    });
    return response.data;
  },
};

// Notification Services
export const notificationAPI = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    await api.put(`/notifications/${notificationId}/read`);
  },

  updateSettings: async (settings: {
    priceAlerts: boolean;
    budgetWarnings: boolean;
    billReminders: boolean;
    savingsOpportunities: boolean;
  }) => {
    await api.put('/notifications/settings', settings);
  },

  registerPushToken: async (token: string, platform: 'ios' | 'android') => {
    await api.post('/notifications/push-token', { token, platform });
  },
};

// Analytics Services
export const analyticsAPI = {
  getSavingsReport: async (period: 'month' | 'quarter' | 'year') => {
    const response = await api.get('/analytics/savings', {
      params: { period },
    });
    return response.data;
  },

  getSpendingAnalysis: async (period: 'month' | 'quarter' | 'year') => {
    const response = await api.get('/analytics/spending', {
      params: { period },
    });
    return response.data;
  },

  exportData: async (format: 'csv' | 'json') => {
    const response = await api.get('/analytics/export', {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
