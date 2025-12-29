import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// ============================================
// BACKEND TEMPORARILY DISCONNECTED
// ============================================
// All API calls are currently disabled and using mock data
// To re-enable backend, uncomment the code blocks below

// Configure the base URL via environment variable
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// Request interceptor for API calls
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor for API calls
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., redirect to login)
//       localStorage.removeItem('auth_token');
//       // basic window redirect to prevent circular dependency with router
//       if (window.location.pathname !== '/auth') {
//          window.location.href = '/auth';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Helper to map backend product to frontend product
const mapProduct = (data: any): Product => {
  return {
    ...data,
    image: data.image_url || data.image, // Handle both cases
  };
};

// Generic request wrapper
// async function request<T>(config: AxiosRequestConfig): Promise<T> {
//   try {
//     const response = await api(config);
//     // Handle the wrapper { success: true, data: ... }
//     const responseData = response.data;
//     
//     if (responseData && typeof responseData === 'object' && 'data' in responseData) {
//        return responseData.data;
//     }
//     
//     return responseData;
//   } catch (error: any) {
//     const message = error.response?.data?.message || error.message || 'Request failed';
//     throw new Error(message);
//   }
// }

// Mock data for frontend testing
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa',
    description: 'A beautiful modern sofa perfect for your living room',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    category: 'Furniture',
    stock: 10,
    featured: true
  },
  {
    id: '2',
    name: 'Elegant Table Lamp',
    description: 'Stylish lamp to brighten up any room',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    category: 'Lighting',
    stock: 25,
    featured: true
  },
  {
    id: '3',
    name: 'Wall Art Print',
    description: 'Contemporary wall art for modern spaces',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
    category: 'Decor',
    stock: 15,
    featured: false
  },
  {
    id: '4',
    name: 'Cozy Throw Blanket',
    description: 'Soft and warm blanket for comfortable evenings',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800',
    category: 'Textiles',
    stock: 30,
    featured: true
  }
];

// Product APIs
export const productApi = {
  getAll: async (params?: { category?: string; search?: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = [...MOCK_PRODUCTS];
    
    if (params?.category && params.category !== 'All') {
      filtered = filtered.filter(p => p.category === params.category);
    }
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
    
    // BACKEND CODE - DISABLED
    // const data = await request<any[]>({
    //   url: '/products',
    //   method: 'GET',
    //   params,
    // });
    // return data.map(mapProduct);
  },
  getById: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
    
    // BACKEND CODE - DISABLED
    // const data = await request<any>({ url: `/products/${id}`, method: 'GET' });
    // return mapProduct(data);
  },
  getFeatured: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS.filter(p => p.featured).slice(0, 4);
    
    // BACKEND CODE - DISABLED
    // const data = await productApi.getAll();
    // return data.slice(0, 4);
  },
  getCategories: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories: Category[] = [
      { id: '1', name: 'Furniture', slug: 'furniture' },
      { id: '2', name: 'Lighting', slug: 'lighting' },
      { id: '3', name: 'Decor', slug: 'decor' },
      { id: '4', name: 'Textiles', slug: 'textiles' }
    ];
    return categories;
    
    // BACKEND CODE - DISABLED
    // return request<Category[]>({ url: '/categories', method: 'GET' })
  },
  create: async (data: Partial<Product>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      id: String(MOCK_PRODUCTS.length + 1),
      name: data.name || '',
      description: data.description || '',
      price: data.price || 0,
      image: data.image || '',
      category: data.category || '',
      stock: data.stock || 0,
      featured: data.featured || false
    };
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
    
    // BACKEND CODE - DISABLED
    // const backendData = {
    //   ...data,
    //   image_url: data.image,
    // };
    // const res = await request<any>({ url: '/products', method: 'POST', data: backendData });
    // return mapProduct(res);
  },
  update: async (id: string, data: Partial<Product>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...data };
    return MOCK_PRODUCTS[index];
    
    // BACKEND CODE - DISABLED
    // const backendData = {
    //    ...data,
    //    image_url: data.image,
    // };
    // const res = await request<any>({ url: `/products/${id}`, method: 'PUT', data: backendData });
    // return mapProduct(res);
  },
  delete: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PRODUCTS.splice(index, 1);
    }
    
    // BACKEND CODE - DISABLED
    // return request<void>({ url: `/products/${id}`, method: 'DELETE' })
  },
};

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock authentication
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: email.includes('admin') ? 'admin' : 'user',
      user_metadata: { role: email.includes('admin') ? 'admin' : 'user' }
    };
    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now()
    };
    return mockResponse;
    
    // BACKEND CODE - DISABLED
    // return request<AuthResponse>({ url: '/auth/login', method: 'POST', data: { email, password } })
  },
  
  register: async (email: string, password: string, name: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock registration
    const mockUser: User = {
      id: String(Date.now()),
      email,
      name,
      role: 'user',
      user_metadata: { role: 'user' }
    };
    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now()
    };
    return mockResponse;
    
    // BACKEND CODE - DISABLED
    // return request<AuthResponse>({ url: '/auth/register', method: 'POST', data: { email, password, name } })
  },
    
  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },
  
  getProfile: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    throw new Error('Not authenticated');
    
    // BACKEND CODE - DISABLED
    // return request<User>({ url: '/auth/me', method: 'GET' })
  },
};

// Order APIs
export const orderApi = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [] as Order[];
    
    // BACKEND CODE - DISABLED
    // return request<Order[]>({ url: '/orders', method: 'GET' })
  },
  getById: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    throw new Error('Order not found');
    
    // BACKEND CODE - DISABLED
    // return request<Order>({ url: `/orders/${id}`, method: 'GET' })
  },
  create: async (data: CreateOrderData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockOrder: Order = {
      id: String(Date.now()),
      items: data.items.map(item => {
        const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
        return {
          productId: item.productId,
          productName: product?.name || 'Unknown',
          quantity: item.quantity,
          price: product?.price || 0
        };
      }),
      total: data.items.reduce((sum, item) => {
        const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
        return sum + (product?.price || 0) * item.quantity;
      }, 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return mockOrder;
    
    // BACKEND CODE - DISABLED
    // return request<Order>({ url: '/orders', method: 'POST', data })
  },
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

