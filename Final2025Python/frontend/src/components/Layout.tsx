import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import {
  ShoppingCart,
  Zap,
  Home,
  LogIn,
  UserPlus,
  User,
  LogOut
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function Layout() {
  const location = useLocation();
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemsCount = getTotalItems();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="glassmorphism border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Home Button + Logo */}
            <div className="flex items-center gap-4">
              {/* Home Button (Icon Only) */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <Link to="/" className="flex items-center">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>

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
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <Link
                to="/cart"
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${location.pathname === '/cart'
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
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10"
                  >
                    <Link to="/profile" className="flex items-center">
                      <User className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Perfil</span>
                    </Link>
                  </Button>
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
      <Footer />
    </div>
  );
}
