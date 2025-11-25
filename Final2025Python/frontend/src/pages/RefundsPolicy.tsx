import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Package, CheckCircle, XCircle } from 'lucide-react';

export default function RefundsPolicy() {
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
                        <RotateCcw className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Política de Reembolsos y Garantías</h1>
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
                            En CyberStore, queremos que esté completamente satisfecho con su compra. Si por alguna razón no está conforme,
                            ofrecemos una política de devoluciones y reembolsos clara y justa.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Package className="h-6 w-6 text-emerald-500" />
                            1. Período de Devolución
                        </h2>
                        <div className="space-y-4 text-zinc-300">
                            <div className="bg-emerald-900/20 border border-emerald-700 p-4 rounded-lg">
                                <p className="text-emerald-400 font-semibold text-lg">
                                    ✓ Tiene 30 días corridos desde la recepción del producto para solicitar una devolución
                                </p>
                            </div>
                            <p>
                                El plazo de 30 días comienza a contar desde el día en que recibe el producto.
                                Para productos comprados como regalo, el plazo comienza desde la fecha de entrega al destinatario.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Condiciones para Devoluciones</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>Para que su devolución sea aceptada, el producto debe cumplir con las siguientes condiciones:</p>

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="border border-emerald-700 bg-emerald-900/10 p-4 rounded-lg">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                                        Aceptamos
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>✓ Producto sin usar y en perfecto estado</li>
                                        <li>✓ Empaque original intacto</li>
                                        <li>✓ Todos los accesorios incluidos</li>
                                        <li>✓ Etiquetas y sellos sin remover</li>
                                        <li>✓ Factura de compra original</li>
                                    </ul>
                                </div>

                                <div className="border border-red-700 bg-red-900/10 p-4 rounded-lg">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <XCircle className="h-5 w-5 text-red-500" />
                                        No Aceptamos
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>✗ Productos usados o dañados</li>
                                        <li>✗ Empaque roto o deteriorado</li>
                                        <li>✗ Accesorios faltantes</li>
                                        <li>✗ Productos personalizados</li>
                                        <li>✗ Software descargado o activado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Productos No Retornables</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>Por razones de higiene, seguridad o naturaleza del producto, los siguientes artículos NO son retornables:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Productos de higiene personal (auriculares in-ear, productos de cuidado personal)</li>
                                <li>Software, licencias digitales o productos descargables una vez activados</li>
                                <li>Productos personalizados o hechos a medida</li>
                                <li>Productos en oferta especial o liquidación (salvo defecto de fábrica)</li>
                                <li>Tarjetas de regalo o cupones</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Proceso de Devolución</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p className="font-semibold text-white">Siga estos pasos para devolver un producto:</p>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Solicite la Devolución</h3>
                                        <p>Contacte nuestro servicio al cliente por email (returns@cyberstore.com) o teléfono (+54 9 11 1234-5678)
                                            indicando su número de pedido y el motivo de la devolución.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Reciba la Autorización</h3>
                                        <p>Le enviaremos un número de autorización de devolución (RMA) y las instrucciones de envío dentro de 24-48 horas.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Empaque el Producto</h3>
                                        <p>Empaque el producto de forma segura en su caja original con todos los accesorios.
                                            Incluya el número RMA visible en el exterior del paquete.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Envíe el Producto</h3>
                                        <p>Envíe el paquete a la dirección indicada. Recomendamos usar un servicio con seguimiento.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold">
                                        5
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Reciba su Reembolso</h3>
                                        <p>Una vez recibido e inspeccionado el producto, procesaremos su reembolso en 5-10 días hábiles.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Costos de Envío</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">Producto Defectuoso:</strong> Si el producto tiene un defecto de fábrica,
                                CyberStore cubrirá los costos de envío de la devolución.
                            </p>
                            <p>
                                <strong className="text-white">Cambio de Opinión:</strong> Si devuelve el producto por cambio de opinión,
                                usted será responsable de los costos de envío.
                            </p>
                            <p>
                                <strong className="text-white">Error Nuestro:</strong> Si enviamos el producto incorrecto,
                                cubriremos todos los costos de envío y reenvío.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Métodos de Reembolso</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>Los reembolsos se procesarán mediante el mismo método de pago utilizado en la compra original:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong className="text-white">Tarjeta de Crédito/Débito:</strong> 5-10 días hábiles</li>
                                <li><strong className="text-white">Mercado Pago:</strong> 3-5 días hábiles</li>
                                <li><strong className="text-white">Transferencia Bancaria:</strong> 7-14 días hábiles</li>
                            </ul>
                            <p className="mt-4 text-sm text-zinc-400">
                                Nota: Los tiempos pueden variar según su banco o entidad financiera.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Garantías de Productos</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                <strong className="text-white">7.1 Garantía Legal:</strong> Todos nuestros productos cuentan con la garantía legal
                                establecida por la Ley de Defensa del Consumidor (Ley 24.240) de Argentina.
                            </p>
                            <p>
                                <strong className="text-white">7.2 Garantía del Fabricante:</strong> Muchos productos también incluyen garantía
                                del fabricante. Los términos específicos se detallan en la documentación del producto.
                            </p>
                            <p>
                                <strong className="text-white">7.3 Garantía Extendida:</strong> Ofrecemos opciones de garantía extendida para
                                ciertos productos. Consulte al momento de la compra.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Cambios de Producto</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Si desea cambiar un producto por otro (diferente modelo, color, etc.), debe:
                            </p>
                            <ol className="list-decimal list-inside ml-4 space-y-2">
                                <li>Solicitar la devolución del producto original siguiendo el proceso estándar</li>
                                <li>Realizar una nueva compra del producto deseado</li>
                                <li>Una vez procesado el reembolso, se acreditará el monto original</li>
                            </ol>
                            <p className="mt-4 text-sm text-yellow-400">
                                Nota: No realizamos cambios directos para garantizar la disponibilidad del producto que desea.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Contacto - Departamento de Devoluciones</h2>
                        <p className="text-zinc-300 mb-4">
                            Para solicitar una devolución o consultar sobre garantías:
                        </p>
                        <ul className="space-y-2 text-zinc-300">
                            <li><strong className="text-white">Email:</strong> returns@cyberstore.com</li>
                            <li><strong className="text-white">Teléfono:</strong> +54 9 11 1234-5678</li>
                            <li><strong className="text-white">Horario:</strong> Lun-Vie 9:00-18:00, Sáb 10:00-14:00</li>
                        </ul>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-8 flex gap-4 justify-center flex-wrap">
                    <Link
                        to="/returns"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Solicitar Devolución
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        Contactar Soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
