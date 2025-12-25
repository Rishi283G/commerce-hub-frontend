import axios, { AxiosRequestConfig } from 'axios';

// Configure the base URL via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('auth_token');
      // basic window redirect to prevent circular dependency with router
      if (window.location.pathname !== '/auth') {
         window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// Generic request wrapper
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Request failed';
    throw new Error(message);
  }
}

// Product APIs
export const productApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    return request<Product[]>({
      url: '/products',
      method: 'GET',
      params,
    });
  },
  getById: (id: string) => request<Product>({ url: `/products/${id}`, method: 'GET' }),
  getFeatured: () => request<Product[]>({ url: '/products/featured', method: 'GET' }),
  getCategories: () => request<Category[]>({ url: '/categories', method: 'GET' }),
  create: (data: Partial<Product>) => request<Product>({ url: '/products', method: 'POST', data }),
  update: (id: string, data: Partial<Product>) => request<Product>({ url: `/products/${id}`, method: 'PUT', data }),
  delete: (id: string) => request<void>({ url: `/products/${id}`, method: 'DELETE' }),
};

// Auth APIs
export const authApi = {
  login: (email: string, password: string) => 
    request<AuthResponse>({ url: '/auth/login', method: 'POST', data: { email, password } }),
  
  // Changed from signup to register as per backend requirements
  register: (email: string, password: string, name: string) => 
    request<AuthResponse>({ url: '/auth/register', method: 'POST', data: { email, password, name } }),
    
  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },
  
  getProfile: () => request<User>({ url: '/auth/me', method: 'GET' }), // Assuming backend has a /me or profile endpoint, if not we rely on stored user
};

// Order APIs
export const orderApi = {
  getAll: () => request<Order[]>({ url: '/orders', method: 'GET' }),
  getById: (id: string) => request<Order>({ url: `/orders/${id}`, method: 'GET' }),
  create: (data: CreateOrderData) => request<Order>({ url: '/orders', method: 'POST', data }),
};

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string; 
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  items: { productId: string; quantity: number }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

