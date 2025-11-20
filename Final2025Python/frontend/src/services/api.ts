import { apiClient } from '@/lib/axios';
import type { HealthCheck, Product, Order, Category } from '@/types/api';

// ============================================
// Health Check Service
// ============================================
export const healthCheckService = {
  getStatus: async (): Promise<HealthCheck> => {
    const response = await apiClient.get<HealthCheck>('/health_check');
    return response.data;
  },
};

// ============================================
// Products Service
// ============================================
export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },
  
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
  
  create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  },
  
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, product);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

// ============================================
// Categories Service
// ============================================
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },
  
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    return response.data;
  },
};

// ============================================
// Orders Service
// ============================================
export const ordersService = {
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders');
    return response.data;
  },
  
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },
  
  create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', order);
    return response.data;
  },
  
  updateStatus: async (id: number, status: Order['status']): Promise<Order> => {
    const response = await apiClient.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },
};
