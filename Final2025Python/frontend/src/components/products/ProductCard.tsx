import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/api';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, AlertCircle, Package, Pencil, Trash2, Eye, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index: number;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number, name: string) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index, onEdit, onDelete, onQuickView }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCartStore();
  const navigate = useNavigate();
  const cartQuantity = getItemQuantity(product.id_key);

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  const handleViewDetails = () => {
    navigate(`/products/${product.id_key}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group"
    >
      <Card
        className={`
          h-full glassmorphism-strong border-zinc-800 transition-all duration-300 
          hover:scale-[1.02] hover:border-emerald-500/30 hover-lift
          ${isLowStock ? 'ring-2 ring-amber-500/50 cyber-glow-amber' : ''}
          ${isOutOfStock ? 'opacity-60' : ''}
        `}
      >
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-t-lg flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <motion.img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Package className="h-20 w-20 text-zinc-600" />
          )}

          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => onQuickView?.(product)}
              className="bg-emerald-600/90 hover:bg-emerald-500 backdrop-blur-sm cyber-glow transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <Eye className="h-5 w-5 mr-2" />
              Quick View
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleViewDetails}
              className="border-emerald-500/50 hover:bg-emerald-500/20 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Details
            </Button>
          </div>

          {/* Admin Actions */}
          {(onEdit || onDelete) && (
            <div className="absolute top-3 left-3 flex gap-2">
              {onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(product)}
                  className="h-8 w-8 p-0 bg-zinc-900/80 hover:bg-emerald-600 backdrop-blur-sm"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(product.id_key, product.name)}
                  className="h-8 w-8 p-0 bg-zinc-900/80 hover:bg-red-600 backdrop-blur-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Stock Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isLowStock && (
              <Badge
                variant="warning"
                className="animate-pulse font-bold shadow-lg backdrop-blur-sm"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                ¡{product.stock} left!
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="destructive" className="font-bold backdrop-blur-sm">
                SOLD OUT
              </Badge>
            )}
            {cartQuantity > 0 && (
              <Badge variant="success" className="font-bold backdrop-blur-sm">
                {cartQuantity} in cart
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="pt-5 pb-4">
          {/* Category */}
          {product.category && (
            <Badge variant="outline" className="mb-3 text-xs border-emerald-500/30">
              {product.category.name}
            </Badge>
          )}

          {/* Name */}
          <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-emerald-500 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Price & Stock Info */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-3xl font-black font-mono text-emerald-500">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {product.stock > 5
                  ? `${product.stock} in stock`
                  : isOutOfStock
                    ? 'Out of stock'
                    : `Only ${product.stock} left`}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            onClick={() => addItem(product)}
            disabled={isOutOfStock}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 cyber-glow hover-lift"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
