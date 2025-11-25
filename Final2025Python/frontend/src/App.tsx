import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Clients from '@/pages/Clients';
import Categories from '@/pages/Categories';
import Orders from '@/pages/Orders';
import Bills from '@/pages/Bills';
import Addresses from '@/pages/Addresses';
import Reviews from '@/pages/Reviews';
import OrderDetails from '@/pages/OrderDetails';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import TermsAndConditions from '@/pages/TermsAndConditions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CookiePolicy from '@/pages/CookiePolicy';
import RefundsPolicy from '@/pages/RefundsPolicy';
import ComplaintsBook from '@/pages/ComplaintsBook';
import HelpCenter from '@/pages/HelpCenter';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Returns from '@/pages/Returns';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import ScrollToTop from '@/components/ScrollToTop';

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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="clients" element={<Clients />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="bills" element={<Bills />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="order-details" element={<OrderDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            {/* Legal Pages */}
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="refunds" element={<RefundsPolicy />} />
            <Route path="complaints" element={<ComplaintsBook />} />
            {/* Support Pages */}
            <Route path="help" element={<HelpCenter />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="returns" element={<Returns />} />
            {/* Info Pages */}
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
          </Route>
          {/* Auth routes without Layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

