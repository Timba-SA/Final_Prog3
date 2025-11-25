import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Info } from 'lucide-react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Breadcrumb */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                {/* Hero Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Cookie className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Política de Cookies</h1>
                    </div>
                    <p className="text-zinc-400 text-lg">
                        Última actualización: 25 de noviembre de 2025
                    </p>
                </div>

                {/* Content */}
                <div className="glassmorphism p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-zinc-300 leading-relaxed">
                            CyberStore utiliza cookies y tecnologías similares para mejorar su experiencia de navegación,
                            analizar el tráfico del sitio y personalizar el contenido. Esta política explica qué son las cookies,
                            cómo las usamos y cómo puede gestionarlas.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Info className="h-6 w-6 text-emerald-500" />
                            1. ¿Qué son las Cookies?
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o móvil)
                                cuando visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de Cookies que Utilizamos</h2>
                        <div className="space-y-6 text-zinc-300">
                            {/* Essential Cookies */}
                            <div className="border-l-4 border-emerald-500 pl-4">
                                <h3 className="text-xl font-bold text-white mb-2">2.1 Cookies Esenciales (Necesarias)</h3>
                                <p className="mb-2">
                                    Estas cookies son necesarias para el funcionamiento básico del sitio web. Sin ellas, el sitio no puede funcionar correctamente.
                                </p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li><strong>Sesión de usuario:</strong> Mantiene su sesión activa mientras navega</li>
                                    <li><strong>Carrito de compras:</strong> Recuerda los productos en su carrito</li>
                                    <li><strong>Seguridad:</strong> Protege contra ataques CSRF y otras amenazas</li>
                                </ul>
                                <p className="mt-2 text-sm text-emerald-400">
                                    ✓ Estas cookies NO requieren su consentimiento (son técnicamente necesarias)
                                </p>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="text-xl font-bold text-white mb-2">2.2 Cookies Analíticas</h3>
                                <p className="mb-2">
                                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                                </p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li><strong>Google Analytics:</strong> Analiza el tráfico y comportamiento del usuario</li>
                                    <li><strong>Métricas de rendimiento:</strong> Mide tiempos de carga y errores</li>
                                    <li><strong>Mapas de calor:</strong> Visualiza dónde hacen clic los usuarios</li>
                                </ul>
                                <p className="mt-2 text-sm text-yellow-400">
                                    ⚠ Estas cookies requieren su consentimiento
                                </p>
                            </div>

                            {/* Functional Cookies */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-xl font-bold text-white mb-2">2.3 Cookies Funcionales</h3>
                                <p className="mb-2">
                                    Permiten funcionalidades mejoradas y personalización.
                                </p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li><strong>Preferencias de idioma:</strong> Recuerda su idioma preferido</li>
                                    <li><strong>Configuración de visualización:</strong> Modo oscuro/claro, tamaño de fuente</li>
                                    <li><strong>Ubicación:</strong> Recuerda su ubicación para mostrar productos disponibles</li>
                                </ul>
                                <p className="mt-2 text-sm text-yellow-400">
                                    ⚠ Estas cookies requieren su consentimiento
                                </p>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="border-l-4 border-red-500 pl-4">
                                <h3 className="text-xl font-bold text-white mb-2">2.4 Cookies de Marketing</h3>
                                <p className="mb-2">
                                    Se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas publicitarias.
                                </p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li><strong>Facebook Pixel:</strong> Seguimiento de conversiones de anuncios</li>
                                    <li><strong>Google Ads:</strong> Remarketing y medición de campañas</li>
                                    <li><strong>Redes sociales:</strong> Compartir contenido y mostrar anuncios personalizados</li>
                                </ul>
                                <p className="mt-2 text-sm text-yellow-400">
                                    ⚠ Estas cookies requieren su consentimiento
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Duración de las Cookies</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">Cookies de Sesión:</strong> Se eliminan automáticamente cuando cierra su navegador.
                            </p>
                            <p>
                                <strong className="text-white">Cookies Persistentes:</strong> Permanecen en su dispositivo durante un período específico:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Preferencias de usuario: 1 año</li>
                                <li>Cookies analíticas: 2 años</li>
                                <li>Cookies de marketing: 90 días</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Settings className="h-6 w-6 text-emerald-500" />
                            4. Cómo Gestionar las Cookies
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">4.1 Configuración del Navegador:</strong> Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie.
                            </p>

                            <div className="bg-zinc-900 p-4 rounded-lg space-y-2">
                                <p className="font-semibold text-white">Instrucciones por navegador:</p>
                                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                                    <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                                    <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                                    <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
                                </ul>
                            </div>

                            <p className="mt-4">
                                <strong className="text-white">4.2 Banner de Cookies:</strong> Al visitar nuestro sitio por primera vez,
                                verá un banner de cookies donde puede aceptar o rechazar cookies no esenciales.
                            </p>

                            <p>
                                <strong className="text-white">4.3 Herramientas de Terceros:</strong> Puede optar por no participar en cookies de terceros:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google Analytics Opt-out</a></li>
                                <li><a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Facebook Ads Preferences</a></li>
                            </ul>

                            <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg mt-4">
                                <p className="text-yellow-400">
                                    <strong>Importante:</strong> Deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
                                    Por ejemplo, no podrá mantener productos en su carrito de compras.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Cookies de Terceros</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Algunos servicios de terceros que utilizamos pueden establecer sus propias cookies:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong className="text-white">Google Analytics:</strong> Análisis de tráfico web</li>
                                <li><strong className="text-white">Mercado Pago:</strong> Procesamiento de pagos</li>
                                <li><strong className="text-white">Facebook/Instagram:</strong> Integración de redes sociales</li>
                                <li><strong className="text-white">YouTube:</strong> Videos embebidos</li>
                            </ul>
                            <p className="mt-4">
                                Estas cookies están sujetas a las políticas de privacidad de los respectivos terceros.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Actualizaciones de esta Política</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas
                                o por razones operativas, legales o regulatorias. Le recomendamos revisar esta página regularmente.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
                        <p className="text-zinc-300 mb-4">
                            Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos:
                        </p>
                        <ul className="space-y-2 text-zinc-300">
                            <li><strong className="text-white">Email:</strong> privacy@cyberstore.com</li>
                            <li><strong className="text-white">Teléfono:</strong> +54 9 11 1234-5678</li>
                        </ul>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-8 flex gap-4 justify-center">
                    <Link
                        to="/privacy"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        Ver Política de Privacidad
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
