import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock } from 'lucide-react';

export default function Blog() {
    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="h-12 w-12 text-emerald-500" />
                        <h1 className="text-5xl font-bold">Blog</h1>
                    </div>
                    <p className="text-zinc-400 text-xl">Noticias, tutoriales y novedades tecnológicas</p>
                </div>

                {/* Coming Soon */}
                <div className="glassmorphism p-12 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="h-12 w-12 text-emerald-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Próximamente</h2>
                        <p className="text-zinc-300 leading-relaxed mb-8">
                            Estamos trabajando en nuestro blog para traerte contenido de calidad sobre tecnología,
                            guías de compra, reviews de productos y las últimas tendencias del mercado tech.
                        </p>

                        <div className="bg-zinc-900 p-6 rounded-lg mb-8">
                            <h3 className="font-bold text-white mb-4">Mientras tanto, síguenos en:</h3>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                >
                                    Twitter
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-zinc-400">
                            <Clock className="h-5 w-5" />
                            <span className="text-sm">Lanzamiento estimado: Enero 2026</span>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 glassmorphism p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Suscríbete a Nuestro Newsletter</h3>
                    <p className="text-zinc-400 mb-6">
                        Sé el primero en enterarte cuando lancemos el blog y recibe ofertas exclusivas
                    </p>
                    <form className="max-w-md mx-auto flex gap-3">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow font-semibold"
                        >
                            Suscribirse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
