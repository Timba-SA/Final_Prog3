// ============================================
// API Types - Backend FastAPI Integration
// ============================================

export interface HealthCheck {
  status: string;
  timestamp: string;
  database: {
    status: string;
    latency_ms: number;
    pool_size: number;
    pool_in_use: number;
    utilization_percent: number;
  };
  redis: {
    status: string;
    latency_ms: number;
  };
  uptime_seconds: number;
  version: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  client_id: number;
  client?: Client;
  order_date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  order_details?: OrderDetail[];
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product?: Product;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Bill {
  id: number;
  order_id: number;
  order?: Order;
  bill_number: string;
  bill_date: string;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  client_id: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  client_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// API Error types
export interface ApiError {
  detail: string;
  status_code: number;
}
