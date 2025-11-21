import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center glassmorphism border-zinc-800 max-w-md">
            <ShoppingCart className="h-20 w-20 text-zinc-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-zinc-400 mb-8">
              Empezá a agregar productos para poder realizar tu compra
            </p>
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white cyber-glow"
            >
              <Link to="/products" className="flex items-center gap-2">
                Explorar Productos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="hover:text-emerald-500 mb-4"
          >
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Seguir comprando
            </Link>
          </Button>
          
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-10 w-10 text-emerald-500" />
            <div>
              <h1 className="text-4xl font-bold">Tu Carrito</h1>
              <p className="text-zinc-400">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id_key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 glassmorphism border-zinc-800">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-zinc-900 rounded-lg flex items-center justify-center">
                        <Package className="h-10 w-10 text-zinc-700" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product.id_key}`}
                        className="text-xl font-bold hover:text-emerald-500 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.description && (
                        <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
                          {item.product.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-500">
                          ${item.product.price.toFixed(2)}
                        </span>
                        <span className="text-zinc-500 text-sm">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-zinc-500 mb-1">Subtotal</p>
                        <p className="text-2xl font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id_key, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 border-zinc-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="text-lg font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id_key, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="h-8 w-8 border-zinc-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id_key)}
                          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.product.stock && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-amber-500 text-sm">
                        ⚠️ Alcanzaste el stock máximo disponible
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 glassmorphism border-zinc-800 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Resumen de Compra</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-zinc-400">Productos ({totalItems})</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-zinc-400">Envío</span>
                  <span className="font-medium text-emerald-500">GRATIS</span>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="text-emerald-500">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => navigate('/checkout')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold cyber-glow mb-4"
              >
                Proceder al Checkout
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-zinc-700 hover:border-emerald-500 hover:text-emerald-500"
              >
                <Link to="/products">Agregar más productos</Link>
              </Button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">✓</div>
                  <div>
                    <p className="font-medium">Envío Gratis</p>
                    <p className="text-zinc-500">En todos los pedidos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">✓</div>
                  <div>
                    <p className="font-medium">Compra Segura</p>
                    <p className="text-zinc-500">Protección total</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">✓</div>
                  <div>
                    <p className="font-medium">Garantía</p>
                    <p className="text-zinc-500">30 días de devolución</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
