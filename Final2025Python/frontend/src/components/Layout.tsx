import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { 
  ShoppingCart, 
  LayoutDashboard, 
  Package, 
  Zap, 
  Home,
  LogIn,
  UserPlus,
  User,
  LogOut
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const location = useLocation();
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemsCount = getTotalItems();

  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Catálogo', icon: Package },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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

            {/* Main Nav Links */}
            <div className="flex items-center gap-1">
              {mainNavItems.map((item) => {
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
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <Link
                to="/cart"
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${
                    location.pathname === '/cart'
                      ? 'bg-emerald-600 text-white cyber-glow'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  }
                `}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">Carrito</span>
                {cartItemsCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-emerald-500 text-white"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-lg bg-zinc-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium hidden md:inline">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Salir</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  >
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span className="hidden sm:inline">Ingresar</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white cyber-glow"
                  >
                    <Link to="/register" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span className="hidden sm:inline">Registrarse</span>
                    </Link>
                  </Button>
                </div>
              )}
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
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-emerald-500" />
                <span className="text-lg font-bold">
                  Cyber<span className="text-emerald-500">Store</span>
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                Tu tienda tech del futuro. Productos premium y la mejor experiencia de compra.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/products" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                    Carrito
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>Email: info@cyberstore.com</li>
                <li>Tel: +54 9 11 1234-5678</li>
                <li>Buenos Aires, Argentina</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500">
            <p>© 2025 CyberStore. Built with FastAPI + React.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
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
