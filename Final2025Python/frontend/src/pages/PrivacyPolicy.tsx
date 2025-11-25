import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPolicy() {
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
                        <Shield className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Política de Privacidad</h1>
                    </div>
                    <p className="text-zinc-400 text-lg">
                        Última actualización: 25 de noviembre de 2025
                    </p>
                    <p className="text-zinc-400 mt-2">
                        Cumplimiento GDPR y Ley de Protección de Datos Personales (Ley 25.326 - Habeas Data)
                    </p>
                </div>

                {/* Content */}
                <div className="glassmorphism p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-zinc-300 leading-relaxed">
                            En CyberStore, valoramos y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos,
                            usamos, compartimos y protegemos su información personal cuando utiliza nuestro sitio web y servicios.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Database className="h-6 w-6 text-emerald-500" />
                            1. Información que Recopilamos
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">1.1 Información Personal:</strong> Recopilamos información que usted nos proporciona directamente:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Nombre y apellido</li>
                                <li>Dirección de correo electrónico</li>
                                <li>Número de teléfono</li>
                                <li>Dirección de envío y facturación</li>
                                <li>Información de pago (procesada de forma segura por terceros)</li>
                            </ul>
                            <p className="mt-4">
                                <strong className="text-white">1.2 Información Automática:</strong> Recopilamos automáticamente cierta información cuando visita nuestro sitio:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Dirección IP</li>
                                <li>Tipo de navegador y dispositivo</li>
                                <li>Páginas visitadas y tiempo de navegación</li>
                                <li>Cookies y tecnologías similares (ver <Link to="/cookies" className="text-emerald-500 hover:underline">Política de Cookies</Link>)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Eye className="h-6 w-6 text-emerald-500" />
                            2. Cómo Usamos su Información
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>Utilizamos su información personal para:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong className="text-white">Procesar pedidos:</strong> Gestionar sus compras, pagos y envíos</li>
                                <li><strong className="text-white">Comunicación:</strong> Enviar confirmaciones de pedidos, actualizaciones y responder consultas</li>
                                <li><strong className="text-white">Mejorar servicios:</strong> Analizar el uso del sitio para mejorar la experiencia del usuario</li>
                                <li><strong className="text-white">Marketing:</strong> Enviar ofertas y promociones (solo con su consentimiento)</li>
                                <li><strong className="text-white">Seguridad:</strong> Detectar y prevenir fraudes y actividades ilegales</li>
                                <li><strong className="text-white">Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Compartir Información con Terceros</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">3.1 Proveedores de Servicios:</strong> Compartimos información con terceros que nos ayudan a operar nuestro negocio:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Procesadores de pago (Mercado Pago, Visa, Mastercard)</li>
                                <li>Servicios de envío y logística</li>
                                <li>Proveedores de hosting y almacenamiento en la nube</li>
                                <li>Herramientas de análisis (Google Analytics)</li>
                            </ul>
                            <p className="mt-4">
                                <strong className="text-white">3.2 Requisitos Legales:</strong> Podemos divulgar su información si es requerido por ley
                                o en respuesta a procesos legales válidos.
                            </p>
                            <p>
                                <strong className="text-white">3.3 No Vendemos Datos:</strong> Nunca vendemos su información personal a terceros con fines de marketing.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Lock className="h-6 w-6 text-emerald-500" />
                            4. Seguridad de Datos
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Cifrado SSL/TLS para transmisión de datos</li>
                                <li>Almacenamiento seguro en servidores protegidos</li>
                                <li>Acceso restringido solo a personal autorizado</li>
                                <li>Monitoreo regular de vulnerabilidades</li>
                                <li>Copias de seguridad periódicas</li>
                            </ul>
                            <p className="mt-4 text-yellow-500">
                                <strong>Importante:</strong> Ningún método de transmisión por Internet es 100% seguro.
                                Hacemos nuestro mejor esfuerzo, pero no podemos garantizar seguridad absoluta.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Sus Derechos (GDPR y Habeas Data)</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>Usted tiene los siguientes derechos sobre sus datos personales:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong className="text-white">Acceso:</strong> Solicitar una copia de los datos que tenemos sobre usted</li>
                                <li><strong className="text-white">Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                                <li><strong className="text-white">Eliminación:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</li>
                                <li><strong className="text-white">Portabilidad:</strong> Recibir sus datos en un formato estructurado y legible</li>
                                <li><strong className="text-white">Oposición:</strong> Oponerse al procesamiento de sus datos para ciertos fines</li>
                                <li><strong className="text-white">Limitación:</strong> Solicitar la restricción del procesamiento de sus datos</li>
                                <li><strong className="text-white">Retirar consentimiento:</strong> Retirar el consentimiento en cualquier momento</li>
                            </ul>
                            <p className="mt-4">
                                Para ejercer estos derechos, contáctenos en: <a href="mailto:privacy@cyberstore.com" className="text-emerald-500 hover:underline">privacy@cyberstore.com</a>
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Retención de Datos</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines descritos en esta política:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong className="text-white">Datos de cuenta:</strong> Mientras su cuenta esté activa</li>
                                <li><strong className="text-white">Datos de transacciones:</strong> 10 años (requisito legal fiscal en Argentina)</li>
                                <li><strong className="text-white">Datos de marketing:</strong> Hasta que retire su consentimiento</li>
                                <li><strong className="text-white">Cookies:</strong> Según lo especificado en nuestra Política de Cookies</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Cookies y Tecnologías Similares</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Utilizamos cookies y tecnologías similares para mejorar su experiencia. Para más información,
                                consulte nuestra <Link to="/cookies" className="text-emerald-500 hover:underline">Política de Cookies</Link>.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Menores de Edad</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información
                                personal de menores. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos de inmediato.
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Transferencias Internacionales</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Sus datos pueden ser transferidos y procesados en servidores ubicados fuera de Argentina.
                                Nos aseguramos de que estas transferencias cumplan con las leyes de protección de datos aplicables
                                y que sus datos estén protegidos adecuadamente.
                            </p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Cambios a esta Política</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos
                                publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Contacto - Oficial de Protección de Datos</h2>
                        <p className="text-zinc-300 mb-4">
                            Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, puede contactarnos:
                        </p>
                        <ul className="space-y-2 text-zinc-300">
                            <li><strong className="text-white">Email:</strong> privacy@cyberstore.com</li>
                            <li><strong className="text-white">Teléfono:</strong> +54 9 11 1234-5678</li>
                            <li><strong className="text-white">Dirección:</strong> Av. Corrientes 1234, Buenos Aires, Argentina</li>
                        </ul>
                        <p className="text-zinc-400 mt-4 text-sm">
                            También puede presentar una queja ante la Agencia de Acceso a la Información Pública (AAIP)
                            si considera que sus derechos de protección de datos han sido violados.
                        </p>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                    >
                        ¿Preguntas sobre privacidad? Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
