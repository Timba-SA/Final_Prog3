import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText } from 'lucide-react';

export default function TermsAndConditions() {
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
                        <Scale className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
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
                            Bienvenido a CyberStore. Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso,
                            todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de todas las leyes locales aplicables.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <FileText className="h-6 w-6 text-emerald-500" />
                            1. Uso del Sitio Web
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">1.1 Licencia de Uso:</strong> Se le otorga permiso para descargar temporalmente una copia de los materiales
                                (información o software) en el sitio web de CyberStore solo para visualización transitoria personal y no comercial.
                            </p>
                            <p>
                                <strong className="text-white">1.2 Restricciones:</strong> Bajo esta licencia, usted no puede:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Modificar o copiar los materiales</li>
                                <li>Usar los materiales para cualquier propósito comercial o para exhibición pública</li>
                                <li>Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web</li>
                                <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Compras y Pagos</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">2.1 Precios:</strong> Todos los precios están expresados en pesos argentinos (ARS) e incluyen IVA.
                                Los precios están sujetos a cambios sin previo aviso.
                            </p>
                            <p>
                                <strong className="text-white">2.2 Métodos de Pago:</strong> Aceptamos tarjetas de crédito (Visa, Mastercard),
                                tarjetas de débito y Mercado Pago. Todos los pagos son procesados de forma segura.
                            </p>
                            <p>
                                <strong className="text-white">2.3 Confirmación de Pedido:</strong> Una vez realizado el pedido, recibirá un correo electrónico
                                de confirmación. La confirmación no garantiza la disponibilidad del producto.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Envíos y Entregas</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">3.1 Métodos de Entrega:</strong> Ofrecemos las siguientes opciones:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong>Drive-thru:</strong> Retiro en punto de entrega sin bajar del vehículo</li>
                                <li><strong>En mano:</strong> Retiro en nuestras oficinas</li>
                                <li><strong>Domicilio:</strong> Envío a la dirección especificada (CABA y GBA)</li>
                            </ul>
                            <p>
                                <strong className="text-white">3.2 Tiempos de Entrega:</strong> Los tiempos estimados son de 3 a 7 días hábiles
                                para CABA y GBA. Otras zonas pueden variar.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Devoluciones y Reembolsos</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">4.1 Período de Devolución:</strong> Tiene 30 días desde la recepción del producto
                                para solicitar una devolución. Consulte nuestra <Link to="/refunds" className="text-emerald-500 hover:underline">Política de Reembolsos</Link> para más detalles.
                            </p>
                            <p>
                                <strong className="text-white">4.2 Condiciones:</strong> Los productos deben estar sin usar, en su empaque original
                                y con todos los accesorios incluidos.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Privacidad y Datos Personales</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Su privacidad es importante para nosotros. Consulte nuestra{' '}
                                <Link to="/privacy" className="text-emerald-500 hover:underline">Política de Privacidad</Link> para
                                entender cómo recopilamos, usamos y protegemos su información personal.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitación de Responsabilidad</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                En ningún caso CyberStore o sus proveedores serán responsables de daños (incluyendo, sin limitación,
                                daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surjan del uso o
                                la imposibilidad de usar los materiales en el sitio web de CyberStore.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Propiedad Intelectual</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, iconos, imágenes, clips de audio,
                                descargas digitales y compilaciones de datos, es propiedad de CyberStore y está protegido por las leyes
                                de derechos de autor de Argentina e internacionales.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Ley Aplicable y Jurisdicción</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Estos términos y condiciones se rigen por las leyes de la República Argentina. Cualquier disputa relacionada
                                con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de la Ciudad Autónoma de Buenos Aires.
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Modificaciones</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                CyberStore se reserva el derecho de revisar estos términos y condiciones en cualquier momento sin previo aviso.
                                Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos y condiciones.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
                        <p className="text-zinc-300 mb-4">
                            Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos:
                        </p>
                        <ul className="space-y-2 text-zinc-300">
                            <li><strong className="text-white">Email:</strong> legal@cyberstore.com</li>
                            <li><strong className="text-white">Teléfono:</strong> +54 9 11 1234-5678</li>
                            <li><strong className="text-white">Dirección:</strong> Av. Corrientes 1234, Buenos Aires, Argentina</li>
                        </ul>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                    >
                        ¿Tienes dudas? Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
