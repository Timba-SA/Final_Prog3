// ============================================
// API Types - Backend FastAPI Integration
// ============================================

export interface HealthCheck {
  status: string;
  timestamp: string;
  checks: {
    database: {
      status: string;
      health: string;
      latency_ms: number;
      thresholds: {
        warning_ms: number;
        critical_ms: number;
      };
    };
    redis: {
      status: string;
      health: string;
    };
    db_pool: {
      health: string;
      size: number;
      checked_in: number;
      checked_out: number;
      overflow: number;
      total_capacity: number;
      utilization_percent: number;
      thresholds: {
        warning_percent: number;
        critical_percent: number;
      };
    };
  };
}

export interface Product {
  id_key: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id_key: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id_key: number;
  name: string;
  lastname: string;
  email: string;
  telephone?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id_key: number;
  date: string;
  total: number;
  delivery_method: 'pickup' | 'delivery' | 'shipping';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  client_id: number;
  bill_id: number;
  client?: Client;
  bill?: Bill;
  order_details?: OrderDetail[];
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id_key: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product?: Product;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id_key: number;
  bill_number: string;
  discount?: number;
  date: string;
  total: number;
  payment_type: 'cash' | 'credit_card' | 'debit_card' | 'transfer';
  client_id: number;
  client?: Client;
  order?: Order;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id_key: number;
  street: string;
  number?: string;
  city: string;
  client_id: number;
  client?: Client;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id_key: number;
  product_id: number;
  client_id: number;
  stars: number;
  comment?: string;
  product?: Product;
  client?: Client;
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
