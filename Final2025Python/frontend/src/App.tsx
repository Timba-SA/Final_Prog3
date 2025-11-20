import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Products from '@/pages/Products';
import Clients from '@/pages/Clients';
import Categories from '@/pages/Categories';
import Orders from '@/pages/Orders';
import Bills from '@/pages/Bills';
import Addresses from '@/pages/Addresses';
import Reviews from '@/pages/Reviews';
import OrderDetails from '@/pages/OrderDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="clients" element={<Clients />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="bills" element={<Bills />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="order-details" element={<OrderDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

