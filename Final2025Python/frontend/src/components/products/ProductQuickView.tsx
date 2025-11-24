import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/api';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, ExternalLink, Package, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProductQuickViewProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
    const { addItem, getItemQuantity } = useCartStore();
    const navigate = useNavigate();

    if (!product) return null;

    const cartQuantity = getItemQuantity(product.id_key);
    const isLowStock = product.stock > 0 && product.stock < 5;
    const isOutOfStock = product.stock === 0;

    const handleAddToCart = () => {
        addItem(product);
    };

    const handleViewDetails = () => {
        navigate(`/products/${product.id_key}`);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl glassmorphism-strong border-emerald-500/20 p-0 overflow-hidden">
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="grid md:grid-cols-2 gap-0"
                        >
                            {/* Left Side - Image */}
                            <div className="relative h-96 md:h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                                {product.image_url ? (
                                    <motion.img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ) : (
                                    <Package className="h-32 w-32 text-zinc-600" />
                                )}

                                {/* Stock Badge */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {isLowStock && (
                                        <Badge variant="warning" className="animate-pulse font-bold shadow-lg">
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

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Right Side - Details */}
                            <div className="p-8 flex flex-col">
                                <DialogHeader className="mb-6">
                                    {/* Category */}
                                    {product.category && (
                                        <Badge variant="outline" className="mb-3 w-fit text-xs">
                                            {product.category.name}
                                        </Badge>
                                    )}

                                    {/* Title */}
                                    <DialogTitle className="text-3xl font-bold mb-2 gradient-text-green">
                                        {product.name}
                                    </DialogTitle>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-black font-mono text-emerald-500">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-zinc-500">
                                            {product.stock > 5
                                                ? `${product.stock} in stock`
                                                : isOutOfStock
                                                    ? 'Out of stock'
                                                    : `Only ${product.stock} left`}
                                        </span>
                                    </div>
                                </DialogHeader>

                                {/* Description */}
                                <div className="flex-1 mb-6">
                                    {product.description ? (
                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wide">
                                                Description
                                            </h4>
                                            <p className="text-zinc-300 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-zinc-500 italic">No description available</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock}
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 cyber-glow-strong hover-lift"
                                    >
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                                    </Button>

                                    <Button
                                        onClick={handleViewDetails}
                                        variant="outline"
                                        size="lg"
                                        className="w-full border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10"
                                    >
                                        <ExternalLink className="h-5 w-5 mr-2" />
                                        View Full Details
                                    </Button>
                                </div>

                                {/* Additional Info */}
                                {isLowStock && !isOutOfStock && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30"
                                    >
                                        <p className="text-xs text-amber-500 font-medium flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Hurry! Limited stock available
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
