import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductQuickView } from '@/components/products/ProductQuickView';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Package, AlertCircle, Plus, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/api';

export default function Products() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
    staleTime: 30000,
  });

  const { getTotalItems, getTotalPrice } = useCartStore();
  const cartItemsCount = getTotalItems();
  const cartTotal = getTotalPrice();

  // Create Product Mutation
  const createMutation = useMutation({
    mutationFn: productsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsFormOpen(false);
      alert('✅ Product created successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error creating product: ${error.message}`);
    },
  });

  // Update Product Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsFormOpen(false);
      setEditingProduct(null);
      alert('✅ Product updated successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error updating product: ${error.message}`);
    },
  });

  // Delete Product Mutation
  const deleteMutation = useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('✅ Product deleted successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error deleting product: ${error.message}`);
    },
  });

  const handleCreateProduct = (data: any) => {
    createMutation.mutate(data);
  };

  const handleUpdateProduct = (data: any) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id_key, data });
    }
  };

  const handleDeleteProduct = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

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
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh opacity-30 pointer-events-none" />

      <div className="container mx-auto p-6 space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Package className="h-8 w-8 text-emerald-500" />
              </div>
              <h1 className="text-5xl font-black tracking-tight gradient-text-green">
                Product Catalog
              </h1>
            </div>
            <p className="text-zinc-400 text-lg ml-1">
              <span className="font-semibold text-emerald-500">{activeProducts.length}</span> products available
              {lowStockCount > 0 && (
                <span className="ml-2">
                  • <span className="text-amber-500 font-semibold">{lowStockCount}</span> low stock
                </span>
              )}
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 cyber-glow-strong hover-lift"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Button>
        </motion.div>

        {/* Sticky Cart Summary */}
        {cartItemsCount > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="sticky top-6 z-20"
          >
            <div className="glassmorphism-strong rounded-2xl p-6 border-2 border-emerald-500/30 cyber-glow">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <ShoppingBag className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Your Cart</p>
                    <p className="text-3xl font-black font-mono text-emerald-500">
                      ${cartTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{cartItemsCount} items</p>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 cyber-glow-strong hover-lift pulse-glow"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Checkout Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {activeProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 glassmorphism-strong rounded-2xl"
          >
            <Package className="h-20 w-20 mx-auto text-zinc-600 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-300 mb-3">
              No Products Available
            </h3>
            <p className="text-zinc-500 text-lg">
              Check back later for new products.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {activeProducts.map((product, index) => (
              <ProductCard
                key={product.id_key}
                product={product}
                index={index}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}

        {/* FOMO Banner */}
        {lowStockCount > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glassmorphism-strong rounded-2xl p-8 border-2 border-amber-500/30 cyber-glow-amber"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-xl bg-amber-500/10">
                <AlertCircle className="h-10 w-10 text-amber-500 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl mb-2 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  ⚡ Limited Stock Alert
                </h3>
                <p className="text-zinc-400 text-lg">
                  {lowStockCount} {lowStockCount === 1 ? 'product is' : 'products are'} running low on stock.
                  Order now before they're gone!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Product Form Dialog */}
        <ProductForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          isPending={createMutation.isPending || updateMutation.isPending}
        />

        {/* Quick View Modal */}
        <ProductQuickView
          product={quickViewProduct}
          open={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
        />
      </div>
    </div>
  );
}
