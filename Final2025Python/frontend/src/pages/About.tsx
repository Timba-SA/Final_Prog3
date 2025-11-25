import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Heart, Award, Users } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Zap className="h-12 w-12 text-emerald-500" />
                        <h1 className="text-5xl font-bold">Sobre CyberStore</h1>
                    </div>
                    <p className="text-zinc-400 text-xl italic">"El futuro es ahora"</p>
                </div>

                <div className="space-y-8">
                    {/* Our Story */}
                    <section className="glassmorphism p-8">
                        <h2 className="text-3xl font-bold text-white mb-6">Nuestra Historia</h2>
                        <div className="space-y-4 text-zinc-300 leading-relaxed">
                            <p>
                                CyberStore nació en 2025 con una visión clara: democratizar el acceso a la tecnología premium
                                en Argentina y Latinoamérica. Fundada por un equipo de apasionados por la innovación,
                                nos propusimos crear más que una tienda online: una experiencia de compra del futuro.
                            </p>
                            <p>
                                Desde nuestros inicios, hemos trabajado incansablemente para ofrecer productos de la más alta calidad,
                                combinados con un servicio al cliente excepcional y una plataforma tecnológica de vanguardia.
                            </p>
                        </div>
                    </section>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glassmorphism p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-8 w-8 text-emerald-500" />
                                <h3 className="text-2xl font-bold text-white">Misión</h3>
                            </div>
                            <p className="text-zinc-300 leading-relaxed">
                                Proporcionar acceso a tecnología premium de forma rápida, segura y confiable,
                                con la mejor experiencia de compra online en Argentina.
                            </p>
                        </div>

                        <div className="glassmorphism p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="h-8 w-8 text-emerald-500" />
                                <h3 className="text-2xl font-bold text-white">Visión</h3>
                            </div>
                            <p className="text-zinc-300 leading-relaxed">
                                Ser la plataforma líder de e-commerce tecnológico en Latinoamérica,
                                reconocida por nuestra innovación, calidad y compromiso con el cliente.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <section className="glassmorphism p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Heart className="h-8 w-8 text-emerald-500" />
                            <h2 className="text-3xl font-bold text-white">Nuestros Valores</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: 'Innovación', desc: 'Adoptamos las últimas tecnologías para mejorar constantemente' },
                                { title: 'Calidad', desc: 'Solo ofrecemos productos que nosotros mismos compraríamos' },
                                { title: 'Transparencia', desc: 'Comunicación clara y honesta en cada interacción' },
                                { title: 'Compromiso', desc: 'Dedicados a la satisfacción total de nuestros clientes' },
                                { title: 'Sostenibilidad', desc: 'Responsables con el medio ambiente y la sociedad' },
                                { title: 'Excelencia', desc: 'Superamos expectativas en cada detalle' }
                            ].map((value, index) => (
                                <div key={index} className="border-l-4 border-emerald-500 pl-4">
                                    <h3 className="font-bold text-white mb-1">{value.title}</h3>
                                    <p className="text-zinc-400 text-sm">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section className="glassmorphism p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="h-8 w-8 text-emerald-500" />
                            <h2 className="text-3xl font-bold text-white">Logros</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">10,000+</div>
                                <p className="text-zinc-400">Clientes Satisfechos</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">98%</div>
                                <p className="text-zinc-400">Satisfacción del Cliente</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">24/7</div>
                                <p className="text-zinc-400">Soporte Disponible</p>
                            </div>
                        </div>
                    </section>

                    {/* Team */}
                    <section className="glassmorphism p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="h-8 w-8 text-emerald-500" />
                            <h2 className="text-3xl font-bold text-white">Nuestro Equipo</h2>
                        </div>
                        <p className="text-zinc-300 leading-relaxed mb-6">
                            Somos un equipo diverso de profesionales apasionados por la tecnología y el servicio al cliente.
                            Desde desarrolladores hasta especialistas en logística, cada miembro de CyberStore trabaja
                            para hacer realidad nuestra visión de llevar el futuro al presente.
                        </p>
                        <div className="bg-emerald-900/20 border border-emerald-700 p-6 rounded-lg text-center">
                            <p className="text-emerald-400 font-semibold">
                                ¿Quieres formar parte de nuestro equipo?
                            </p>
                            <p className="text-zinc-400 text-sm mt-2">
                                Envía tu CV a: <a href="mailto:careers@cyberstore.com" className="text-emerald-500 hover:underline">careers@cyberstore.com</a>
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow font-semibold"
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
