import { Link } from 'react-router-dom';
import {
    Zap,
    Mail,
    Phone,
    MapPin,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    CreditCard
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glassmorphism border-t border-zinc-800 mt-12">
            <div className="container mx-auto px-6 py-12">
                {/* Main Footer Grid - 5 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

                    {/* Column 1: Branding */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative">
                                <Zap className="h-7 w-7 text-emerald-500" />
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl" />
                            </div>
                            <span className="text-xl font-bold">
                                Cyber<span className="text-emerald-500">Store</span>
                            </span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                            Tu tienda tech del futuro. Innovación, calidad y la mejor experiencia de compra en tecnología premium.
                        </p>
                        <p className="text-emerald-500 text-xs font-semibold italic">
                            "El futuro es ahora"
                        </p>
                    </div>

                    {/* Column 2: Quick Navigation */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                            Navegación Rápida
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Support & Help */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                            Soporte y Ayuda
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/help"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Centro de Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Preguntas Frecuentes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/orders"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Estado del Pedido
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/returns"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Devoluciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            Legal
                            <span className="text-xs text-emerald-500">⚖️</span>
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Términos y Condiciones
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cookies"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Política de Cookies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/refunds"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Reembolsos y Garantías
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/complaints"
                                    className="text-zinc-400 hover:text-emerald-500 transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Libro de Reclamaciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Contact & Social */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                            Contacto
                        </h3>
                        <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-2 text-zinc-400 text-sm">
                                <MapPin className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Av. Corrientes 1234,<br />Buenos Aires, Argentina</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-400 text-sm">
                                <Mail className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                <a href="mailto:info@cyberstore.com" className="hover:text-emerald-500 transition-colors">
                                    info@cyberstore.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-400 text-sm">
                                <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                <a href="tel:+5491112345678" className="hover:text-emerald-500 transition-colors">
                                    +54 9 11 1234-5678
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-zinc-400 text-sm">
                                <Clock className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Lun-Vie: 9:00 - 18:00<br />Sáb: 10:00 - 14:00</span>
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div>
                            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                                Síguenos
                            </h4>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 group"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 group"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 group"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 group"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-800 mb-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Left: Copyright */}
                    <div className="text-center lg:text-left">
                        <p className="text-zinc-400 text-sm">
                            © {currentYear} <span className="text-white font-semibold">CyberStore</span>. Todos los derechos reservados.
                        </p>
                        <p className="text-zinc-500 text-xs mt-1">
                            Desarrollado con ❤️ usando FastAPI + React
                        </p>
                    </div>

                    {/* Center: Payment Methods */}
                    <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs uppercase tracking-wider">Métodos de pago:</span>
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1.5 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-1.5">
                                <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-xs text-zinc-300 font-medium">Visa</span>
                            </div>
                            <div className="px-3 py-1.5 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-1.5">
                                <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-xs text-zinc-300 font-medium">Mastercard</span>
                            </div>
                            <div className="px-3 py-1.5 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-1.5">
                                <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-xs text-zinc-300 font-medium">Mercado Pago</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Version */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span>v1.0.0</span>
                        <span>•</span>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-500 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-6 pt-6 border-t border-zinc-800/50">
                    <p className="text-zinc-600 text-xs leading-relaxed text-center max-w-5xl mx-auto">
                        <strong className="text-zinc-500">Descargo de Responsabilidad:</strong> La información proporcionada en este sitio web es solo para fines informativos generales.
                        CyberStore no se hace responsable por errores, omisiones o inexactitudes en el contenido publicado. Los precios, especificaciones y disponibilidad
                        de productos están sujetos a cambios sin previo aviso. Las imágenes son ilustrativas y pueden no representar exactamente el producto final.
                        Al utilizar este sitio web, usted acepta expresamente nuestros{' '}
                        <Link to="/terms" className="text-emerald-600 hover:text-emerald-500 underline">Términos y Condiciones</Link> y{' '}
                        <Link to="/privacy" className="text-emerald-600 hover:text-emerald-500 underline">Política de Privacidad</Link>.
                        Para consultas legales específicas, por favor contacte a nuestro equipo legal.
                    </p>
                </div>
            </div>
        </footer>
    );
}
