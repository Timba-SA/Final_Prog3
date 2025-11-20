import { apiClient } from '@/lib/axios';
import type { HealthCheck, Product, Order, Category, Client, Address, Bill, OrderDetail, Review } from '@/types/api';

// ============================================
// Health Check Service
// ============================================
export const healthCheckService = {
  getStatus: async (): Promise<HealthCheck> => {
    const response = await apiClient.get<HealthCheck>('/health_check/');
    return response.data;
  },
};

// ============================================
// Products Service
// ============================================
export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}/`);
    return response.data;
  },
  
  create: async (product: Omit<Product, 'id_key' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await apiClient.post<Product>('/products/', product);
    return response.data;
  },
  
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}/`, product);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}/`);
  },
};

// ============================================
// Categories Service
// ============================================
export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}/`);
    return response.data;
  },

  create: async (category: Omit<Category, 'id_key' | 'created_at' | 'updated_at'>): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories/', category);
    return response.data;
  },
  
  update: async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}/`, category);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}/`);
  },
};

// ============================================
// Clients Service
// ============================================
export const clientsService = {
  getAll: async (): Promise<Client[]> => {
    const response = await apiClient.get<Client[]>('/clients/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Client> => {
    const response = await apiClient.get<Client>(`/clients/${id}/`);
    return response.data;
  },
  
  create: async (client: Omit<Client, 'id_key' | 'created_at' | 'updated_at'>): Promise<Client> => {
    const response = await apiClient.post<Client>('/clients/', client);
    return response.data;
  },
  
  update: async (id: number, client: Partial<Client>): Promise<Client> => {
    const response = await apiClient.put<Client>(`/clients/${id}/`, client);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/clients/${id}/`);
  },
};

// ============================================
// Addresses Service
// ============================================
export const addressesService = {
  getAll: async (): Promise<Address[]> => {
    const response = await apiClient.get<Address[]>('/addresses/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Address> => {
    const response = await apiClient.get<Address>(`/addresses/${id}/`);
    return response.data;
  },
  
  create: async (address: Omit<Address, 'id_key' | 'created_at' | 'updated_at'>): Promise<Address> => {
    const response = await apiClient.post<Address>('/addresses/', address);
    return response.data;
  },
  
  update: async (id: number, address: Partial<Address>): Promise<Address> => {
    const response = await apiClient.put<Address>(`/addresses/${id}/`, address);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/addresses/${id}/`);
  },
};

// ============================================
// Bills Service
// ============================================
export const billsService = {
  getAll: async (): Promise<Bill[]> => {
    const response = await apiClient.get<Bill[]>('/bills/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Bill> => {
    const response = await apiClient.get<Bill>(`/bills/${id}/`);
    return response.data;
  },
  
  create: async (bill: Omit<Bill, 'id_key' | 'created_at' | 'updated_at'>): Promise<Bill> => {
    const response = await apiClient.post<Bill>('/bills/', bill);
    return response.data;
  },
  
  update: async (id: number, bill: Partial<Bill>): Promise<Bill> => {
    const response = await apiClient.put<Bill>(`/bills/${id}/`, bill);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/bills/${id}/`);
  },
};

// ============================================
// Orders Service
// ============================================
export const ordersService = {
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}/`);
    return response.data;
  },
  
  create: async (order: Omit<Order, 'id_key' | 'created_at' | 'updated_at'>): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders/', order);
    return response.data;
  },
  
  update: async (id: number, order: Partial<Order>): Promise<Order> => {
    const response = await apiClient.put<Order>(`/orders/${id}/`, order);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}/`);
  },
};

// ============================================
// Order Details Service
// ============================================
export const orderDetailsService = {
  getAll: async (): Promise<OrderDetail[]> => {
    const response = await apiClient.get<OrderDetail[]>('/order_details/');
    return response.data;
  },
  
  getById: async (id: number): Promise<OrderDetail> => {
    const response = await apiClient.get<OrderDetail>(`/order_details/${id}/`);
    return response.data;
  },
  
  create: async (orderDetail: Omit<OrderDetail, 'id_key' | 'created_at' | 'updated_at'>): Promise<OrderDetail> => {
    const response = await apiClient.post<OrderDetail>('/order_details/', orderDetail);
    return response.data;
  },
  
  update: async (id: number, orderDetail: Partial<OrderDetail>): Promise<OrderDetail> => {
    const response = await apiClient.put<OrderDetail>(`/order_details/${id}/`, orderDetail);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/order_details/${id}/`);
  },
};

// ============================================
// Reviews Service
// ============================================
export const reviewsService = {
  getAll: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/reviews/');
    return response.data;
  },
  
  getById: async (id: number): Promise<Review> => {
    const response = await apiClient.get<Review>(`/reviews/${id}/`);
    return response.data;
  },
  
  create: async (review: Omit<Review, 'id_key' | 'created_at' | 'updated_at'>): Promise<Review> => {
    const response = await apiClient.post<Review>('/reviews/', review);
    return response.data;
  },
  
  update: async (id: number, review: Partial<Review>): Promise<Review> => {
    const response = await apiClient.put<Review>(`/reviews/${id}/`, review);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/reviews/${id}/`);
  },
};

