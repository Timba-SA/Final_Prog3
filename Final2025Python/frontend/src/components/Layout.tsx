import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, LayoutDashboard, Package, Zap, Users, FolderTree, ShoppingBag, FileText, MapPin, Star, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Layout() {
  const location = useLocation();
  const { getTotalItems } = useCartStore();
  const cartItemsCount = getTotalItems();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/categories', label: 'Categories', icon: FolderTree },
    { path: '/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/bills', label: 'Bills', icon: FileText },
    { path: '/addresses', label: 'Addresses', icon: MapPin },
    { path: '/reviews', label: 'Reviews', icon: Star },
    { path: '/order-details', label: 'Order Details', icon: ClipboardList },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="glassmorphism border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Zap className="h-8 w-8 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-400/30 transition-colors" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Cyber<span className="text-emerald-500">Store</span>
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                      ${
                        active
                          ? 'bg-emerald-600 text-white cyber-glow'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative ml-4 flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="success"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold animate-pulse"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glassmorphism border-t border-zinc-800 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <p>© 2025 CyberStore. Built with FastAPI + React.</p>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span>•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-500 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
