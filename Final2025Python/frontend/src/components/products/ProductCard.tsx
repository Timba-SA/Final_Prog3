import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/api';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, AlertCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCartStore();
  const cartQuantity = getItemQuantity(product.id);

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        className={`
          h-full glassmorphism transition-all duration-300 hover:scale-105 
          ${isLowStock ? 'ring-2 ring-amber-500/50 cyber-glow-amber' : ''}
          ${isOutOfStock ? 'opacity-60' : ''}
        `}
      >
        {/* Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-t-lg flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="h-16 w-16 text-zinc-600" />
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isLowStock && (
              <Badge
                variant="warning"
                className="animate-pulse font-bold shadow-lg"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                ¡Solo {product.stock} left!
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="destructive" className="font-bold">
                SOLD OUT
              </Badge>
            )}
            {cartQuantity > 0 && (
              <Badge variant="success" className="font-bold">
                {cartQuantity} in cart
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="pt-4">
          {/* Category */}
          {product.category && (
            <Badge variant="outline" className="mb-2 text-xs">
              {product.category.name}
            </Badge>
          )}

          {/* Name */}
          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Price & Stock Info */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-2xl font-bold font-mono text-emerald-500">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500">
                {product.stock > 5
                  ? `${product.stock} in stock`
                  : isOutOfStock
                  ? 'Out of stock'
                  : `Only ${product.stock} left`}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => addItem(product)}
            disabled={isOutOfStock}
            className="w-full"
            variant={isOutOfStock ? 'outline' : 'default'}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
