// API Service - Abstracted API calls for the e-commerce store
// Configure the base URL via environment variable

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Product APIs
export const productApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    const query = searchParams.toString();
    return request<Product[]>(`/products${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => request<Product>(`/products/${id}`),
  getFeatured: () => request<Product[]>('/products/featured'),
  getCategories: () => request<Category[]>('/categories'),
  create: (data: Partial<Product>) => request<Product>('/products', { method: 'POST', body: data }),
  update: (id: string, data: Partial<Product>) => request<Product>(`/products/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request<void>(`/products/${id}`, { method: 'DELETE' }),
};

// Auth APIs
export const authApi = {
  login: (email: string, password: string) => 
    request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } }),
  signup: (email: string, password: string, name: string) => 
    request<AuthResponse>('/auth/signup', { method: 'POST', body: { email, password, name } }),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
  getProfile: () => request<User>('/auth/profile'),
};

// Order APIs
export const orderApi = {
  getAll: () => request<Order[]>('/orders'),
  getById: (id: string) => request<Order>(`/orders/${id}`),
  create: (data: CreateOrderData) => request<Order>('/orders', { method: 'POST', body: data }),
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
  name: string;
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
