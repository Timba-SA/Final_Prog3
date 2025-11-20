import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { ProductCard } from '@/components/products/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Package, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Products() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
    staleTime: 30000, // Cache por 30 segundos
  });

  const { getTotalItems, getTotalPrice } = useCartStore();
  const cartItemsCount = getTotalItems();
  const cartTotal = getTotalPrice();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-emerald-500">
            <Package className="h-12 w-12 mx-auto animate-spin" />
          </div>
          <p className="text-zinc-400">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto text-rose-500" />
          <h2 className="text-xl font-bold text-zinc-100">
            Unable to Load Products
          </h2>
          <p className="text-zinc-400">
            There was an error loading the product catalog. Please try again
            later.
          </p>
          <Badge variant="destructive">API Error</Badge>
        </div>
      </div>
    );
  }

  const activeProducts = products || [];
  const lowStockCount = activeProducts.filter(
    (p) => p.stock > 0 && p.stock < 5
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Package className="h-10 w-10 text-emerald-500" />
            Product Catalog
          </h1>
          <p className="text-zinc-400 mt-2">
            {activeProducts.length} products available
            {lowStockCount > 0 && (
              <span className="ml-2">
                • <span className="text-amber-500 font-semibold">{lowStockCount}</span> low stock items
              </span>
            )}
          </p>
        </div>

        {/* Cart Summary */}
        {cartItemsCount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glassmorphism rounded-lg p-4 border-emerald-500/30 border-2"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-zinc-400">Your Cart</p>
                <p className="text-2xl font-bold font-mono text-emerald-500">
                  ${cartTotal.toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">{cartItemsCount} items</p>
              </div>
              <Button size="lg" className="cyber-glow">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Checkout
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Products Grid */}
      {activeProducts.length === 0 ? (
        <div className="text-center py-20">
          <Package className="h-16 w-16 mx-auto text-zinc-600 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            No Products Available
          </h3>
          <p className="text-zinc-500">
            Check back later for new products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeProducts.map((product, index) => (
            <ProductCard key={product.id_key} product={product} index={index} />
          ))}
        </div>
      )}

      {/* FOMO Banner */}
      {lowStockCount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glassmorphism rounded-lg p-6 border-amber-500/30 border-2 cyber-glow-amber"
        >
          <div className="flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-amber-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-lg">⚡ Limited Stock Alert</h3>
              <p className="text-sm text-zinc-400">
                {lowStockCount} {lowStockCount === 1 ? 'product is' : 'products are'} running low on stock. 
                Order now before they're gone!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
