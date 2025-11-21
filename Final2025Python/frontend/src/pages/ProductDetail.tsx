import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Package,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { productsService, reviewsService } from '@/services/api';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const productId = parseInt(id || '0');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsService.getById(productId),
    enabled: !!productId,
  });

  const { data: allReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsService.getAll,
  });

  // Filter reviews for this product
  const productReviews = allReviews?.filter(
    (review) => review.product_id === productId
  ) || [];

  // Calculate average rating
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, review) => sum + review.stars, 0) / productReviews.length
    : 0;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      // Show success animation or navigate to cart
      navigate('/cart');
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="h-12 w-12 text-emerald-500" />
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="p-8 max-w-md text-center glassmorphism border-red-500/20">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
          <p className="text-zinc-400 mb-6">
            El producto que buscás no existe o fue removido.
          </p>
          <Button asChild variant="outline">
            <Link to="/products">Volver al catálogo</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="hover:text-emerald-500"
          >
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 glassmorphism border-zinc-800">
              <div className="aspect-square bg-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden group">
                <Zap className="h-32 w-32 text-zinc-700 group-hover:text-emerald-500 transition-colors duration-500" />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center">
                    <span className="text-red-500 font-bold text-2xl">SIN STOCK</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            {product.category && (
              <Badge variant="outline" className="border-emerald-500/20 text-emerald-500">
                {product.category.name}
              </Badge>
            )}

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {productReviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-zinc-400">
                  {averageRating.toFixed(1)} ({productReviews.length} reseñas)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-emerald-500">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <Card className="p-6 glassmorphism border-zinc-800">
                <h3 className="text-lg font-bold mb-2">Descripción</h3>
                <p className="text-zinc-400 leading-relaxed">{product.description}</p>
              </Card>
            )}

            {/* Stock Info */}
            <Card className="p-6 glassmorphism border-zinc-800">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="font-medium">Stock disponible</p>
                  <p className="text-zinc-400">
                    {product.stock > 0 ? (
                      <>
                        {product.stock} unidades disponibles
                        {product.stock < 10 && (
                          <span className="text-amber-500 font-medium ml-2">
                            ¡Últimas unidades!
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-red-500 font-medium">Sin stock</span>
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <label className="text-sm font-medium">Cantidad</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="border-zinc-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="border-zinc-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-zinc-400 ml-4">
                    Subtotal: <span className="text-emerald-500 font-bold text-xl">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 text-lg font-bold cyber-glow"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </Button>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card className="p-8 glassmorphism border-zinc-800">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              <h2 className="text-3xl font-bold">Reseñas de Clientes</h2>
            </div>

            {productReviews.length > 0 ? (
              <div className="space-y-6">
                {productReviews.map((review) => (
                  <Card
                    key={review.id_key}
                    className="p-6 glassmorphism border-zinc-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {review.client && (
                            <span className="font-bold">
                              {review.client.name} {review.client.lastname}
                            </span>
                          )}
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.stars
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'text-zinc-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {new Date(review.created_at).toLocaleDateString('es-AR')}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-zinc-300 leading-relaxed">{review.comment}</p>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">
                  Aún no hay reseñas para este producto
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  ¡Sé el primero en compartir tu opinión!
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
