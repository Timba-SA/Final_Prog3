import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Zap,
  ShoppingBag,
  Shield,
  Truck,
  CreditCard,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { categoriesService, productsService } from '@/services/api';

export default function Landing() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
  });

  // Get trending products (first 6)
  const trendingProducts = products?.slice(0, 6) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: Truck,
      title: 'Envíos Rápidos',
      description: 'Entrega express en 24-48hs a todo el país',
      color: 'text-emerald-500',
      glow: 'cyber-glow',
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Protección total en todas tus transacciones',
      color: 'text-blue-500',
      glow: 'cyber-glow-rose',
    },
    {
      icon: CreditCard,
      title: 'Múltiples Pagos',
      description: 'Efectivo, tarjeta o transferencia bancaria',
      color: 'text-amber-500',
      glow: 'cyber-glow-amber',
    },
    {
      icon: Star,
      title: 'Productos Premium',
      description: 'Solo comercializamos productos de alta calidad',
      color: 'text-purple-500',
      glow: 'cyber-glow',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6">
        {/* Dynamic Animated Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-emerald-500/20 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">
                Tu tienda tech del futuro
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="gradient-text-green">
                CYBER
              </span>
              <br />
              <span className="text-white">STORE</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experimentá el futuro del shopping online. Productos premium, tecnología
              de punta y una experiencia de compra única.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-6 text-lg font-bold cyber-glow-strong transition-smooth hover-lift"
              >
                <Link to="/products" className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Ir al Catálogo
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-bold border-2 border-zinc-700 hover:border-emerald-500 hover:text-emerald-500 transition-smooth hover-lift hover:bg-emerald-500/10"
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Ver Dashboard
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-zinc-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué elegir <span className="text-emerald-500">CyberStore</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra con beneficios exclusivos
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 h-full glassmorphism border-zinc-800 hover:border-emerald-500/50 transition-all group">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-zinc-900 mb-4 ${feature.glow} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-24 px-6 border-t border-zinc-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Productos <span className="text-emerald-500">Destacados</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Los favoritos de nuestra comunidad tech
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trendingProducts.map((product) => (
              <motion.div key={product.id_key} variants={itemVariants}>
                <Link to={`/products/${product.id_key}`}>
                  <Card className="p-6 glassmorphism border-zinc-800 hover:border-emerald-500 transition-all group cursor-pointer overflow-hidden">
                    {/* Product Image Placeholder */}
                    <div className="relative aspect-square mb-4 bg-zinc-900 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-20 w-20 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-2 right-2 px-3 py-1 bg-amber-500 text-zinc-950 text-xs font-bold rounded-full">
                          ¡Últimas {product.stock} unidades!
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center">
                          <span className="text-red-500 font-bold">SIN STOCK</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-500">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-zinc-500">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-center gap-2 text-emerald-500 text-sm font-medium">
                        Ver detalles
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-zinc-700 hover:border-emerald-500 hover:text-emerald-500"
            >
              <Link to="/products" className="flex items-center gap-2">
                Ver todos los productos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-24 px-6 border-t border-zinc-800">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explorá por <span className="text-emerald-500">Categorías</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Encontrá exactamente lo que buscás
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.div key={category.id_key} variants={itemVariants}>
                  <Link to="/products">
                    <Card className="p-6 glassmorphism border-zinc-800 hover:border-emerald-500 transition-all group cursor-pointer text-center">
                      <div className="inline-flex p-4 rounded-lg bg-zinc-900 mb-3 cyber-glow group-hover:scale-110 transition-transform">
                        <Sparkles className="h-6 w-6 text-emerald-500" />
                      </div>
                      <h3 className="font-bold group-hover:text-emerald-500 transition-colors">
                        {category.name}
                      </h3>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-zinc-800">
        <div className="container mx-auto">
          <Card className="p-12 glassmorphism-strong border-emerald-500/30 cyber-glow-strong text-center relative overflow-hidden">
            {/* Animated background for CTA */}
            <div className="absolute inset-0 gradient-radial-emerald opacity-30" />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="h-16 w-16 text-emerald-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 shimmer">
                ¿Listo para empezar tu experiencia Cyber?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Registrate ahora y obtené acceso exclusivo a ofertas especiales
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-6 text-lg font-bold cyber-glow-strong transition-smooth hover-lift"
                >
                  <Link to="/register" className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Crear Cuenta Gratis
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-bold border-2 border-zinc-700 hover:border-emerald-500 hover:text-emerald-500 transition-smooth hover-lift hover:bg-emerald-500/10"
                >
                  <Link to="/login" className="flex items-center gap-2">
                    Ya tengo cuenta
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
