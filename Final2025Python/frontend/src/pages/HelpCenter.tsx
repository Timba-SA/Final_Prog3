import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Search, BookOpen, MessageCircle, Package, CreditCard, Shield } from 'lucide-react';

export default function HelpCenter() {
    const categories = [
        {
            icon: Package,
            title: 'Pedidos y Envíos',
            description: 'Seguimiento, tiempos de entrega y métodos de envío',
            articles: 5,
            link: '/faq#envios'
        },
        {
            icon: CreditCard,
            title: 'Pagos y Facturación',
            description: 'Métodos de pago, facturas y reembolsos',
            articles: 4,
            link: '/faq#pagos'
        },
        {
            icon: Shield,
            title: 'Devoluciones y Garantías',
            description: 'Política de devoluciones y garantías de productos',
            articles: 6,
            link: '/refunds'
        },
        {
            icon: MessageCircle,
            title: 'Cuenta y Seguridad',
            description: 'Gestión de cuenta, contraseñas y privacidad',
            articles: 4,
            link: '/faq#cuenta'
        }
    ];

    const popularArticles = [
        { title: '¿Cómo rastreo mi pedido?', link: '/faq#rastreo' },
        { title: '¿Cuáles son los métodos de pago aceptados?', link: '/faq#metodos-pago' },
        { title: '¿Cuál es la política de devoluciones?', link: '/refunds' },
        { title: '¿Cómo cambio mi dirección de envío?', link: '/faq#cambiar-direccion' },
        { title: '¿Ofrecen garantía en los productos?', link: '/refunds#garantias' }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Breadcrumb */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="h-12 w-12 text-emerald-500" />
                        <h1 className="text-5xl font-bold">Centro de Ayuda</h1>
                    </div>
                    <p className="text-zinc-400 text-xl">
                        ¿En qué podemos ayudarte hoy?
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Buscar en el centro de ayuda..."
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Categorías de Ayuda</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={index}
                                    to={category.link}
                                    className="glassmorphism p-6 hover:border-emerald-500 transition-all group"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600/30 transition-colors">
                                            <Icon className="h-8 w-8 text-emerald-500" />
                                        </div>
                                        <h3 className="font-bold text-white mb-2">{category.title}</h3>
                                        <p className="text-zinc-400 text-sm mb-3">{category.description}</p>
                                        <span className="text-emerald-500 text-xs font-semibold">
                                            {category.articles} artículos
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Popular Articles */}
                <section className="mb-16">
                    <div className="glassmorphism p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="h-6 w-6 text-emerald-500" />
                            <h2 className="text-2xl font-bold text-white">Artículos Populares</h2>
                        </div>
                        <div className="space-y-3">
                            {popularArticles.map((article, index) => (
                                <Link
                                    key={index}
                                    to={article.link}
                                    className="block p-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-300 group-hover:text-emerald-500 transition-colors">
                                            {article.title}
                                        </span>
                                        <ArrowLeft className="h-4 w-4 text-zinc-600 group-hover:text-emerald-500 rotate-180 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section>
                    <div className="glassmorphism p-8 text-center">
                        <MessageCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">¿No encuentras lo que buscas?</h2>
                        <p className="text-zinc-400 mb-6">
                            Nuestro equipo de soporte está listo para ayudarte
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                to="/contact"
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                            >
                                Contactar Soporte
                            </Link>
                            <Link
                                to="/faq"
                                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                            >
                                Ver Preguntas Frecuentes
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
