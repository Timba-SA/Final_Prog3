import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, BookOpen, Send, AlertCircle } from 'lucide-react';

export default function ComplaintsBook() {
    const [formData, setFormData] = useState({
        type: 'reclamo',
        name: '',
        email: '',
        phone: '',
        orderId: '',
        productName: '',
        description: '',
        requestedAction: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        alert('Formulario enviado. En producción, esto se enviaría al backend.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                        <BookOpen className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Libro de Reclamaciones</h1>
                    </div>
                    <p className="text-zinc-400 text-lg">
                        Protegemos sus derechos como consumidor
                    </p>
                </div>

                {/* Alert */}
                <div className="bg-blue-900/20 border border-blue-700 p-6 rounded-lg mb-8">
                    <div className="flex gap-3">
                        <AlertCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div className="text-blue-300">
                            <h3 className="font-bold text-white mb-2">Información Importante</h3>
                            <p className="text-sm leading-relaxed">
                                El Libro de Reclamaciones es un derecho que tiene todo consumidor para registrar sus quejas o reclamos
                                sobre productos o servicios. De acuerdo con la Ley de Defensa del Consumidor (Ley 24.240),
                                su reclamo será atendido en un plazo máximo de 10 días hábiles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="glassmorphism p-8 space-y-8">
                    {/* Intro */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Sus Derechos como Consumidor</h2>
                        <div className="space-y-4 text-zinc-300">
                            <p>
                                Como consumidor en Argentina, usted tiene derecho a:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Recibir información clara y veraz sobre productos y servicios</li>
                                <li>Protección contra publicidad engañosa</li>
                                <li>Garantía legal de productos</li>
                                <li>Devolución de productos defectuosos</li>
                                <li>Presentar reclamos y recibir respuesta en tiempo y forma</li>
                            </ul>
                        </div>
                    </section>

                    {/* Difference */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Diferencia entre Reclamo y Queja</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border border-orange-700 bg-orange-900/10 p-4 rounded-lg">
                                <h3 className="font-bold text-white mb-2">📋 Reclamo</h3>
                                <p className="text-zinc-300 text-sm">
                                    Manifestación de insatisfacción relacionada con los productos o servicios que requiere una solución o compensación.
                                </p>
                                <p className="text-zinc-400 text-xs mt-2">
                                    Ejemplo: Producto defectuoso, servicio no prestado, cobro indebido.
                                </p>
                            </div>

                            <div className="border border-yellow-700 bg-yellow-900/10 p-4 rounded-lg">
                                <h3 className="font-bold text-white mb-2">💬 Queja</h3>
                                <p className="text-zinc-300 text-sm">
                                    Expresión de insatisfacción sobre la atención recibida o procesos internos, sin necesariamente requerir compensación.
                                </p>
                                <p className="text-zinc-400 text-xs mt-2">
                                    Ejemplo: Mala atención al cliente, demora en respuestas, proceso complicado.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Form */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Formulario de Reclamo/Queja</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Type */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Tipo de Solicitud <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                    required
                                >
                                    <option value="reclamo">Reclamo</option>
                                    <option value="queja">Queja</option>
                                </select>
                            </div>

                            {/* Personal Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Nombre Completo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Teléfono <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">
                                        Número de Pedido (si aplica)
                                    </label>
                                    <input
                                        type="text"
                                        name="orderId"
                                        value={formData.orderId}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Product/Service */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Producto o Servicio <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                    placeholder="Nombre del producto o servicio relacionado"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Descripción Detallada <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                                    placeholder="Describa detalladamente su reclamo o queja, incluyendo fechas, lugares y personas involucradas si es relevante."
                                    required
                                />
                            </div>

                            {/* Requested Action */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Solución Solicitada <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="requestedAction"
                                    value={formData.requestedAction}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                                    placeholder="¿Qué solución espera? (ej: reembolso, cambio de producto, disculpa formal, etc.)"
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors cyber-glow flex items-center justify-center gap-2"
                                >
                                    <Send className="h-5 w-5" />
                                    Enviar Reclamo/Queja
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        type: 'reclamo',
                                        name: '',
                                        email: '',
                                        phone: '',
                                        orderId: '',
                                        productName: '',
                                        description: '',
                                        requestedAction: ''
                                    })}
                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                >
                                    Limpiar
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Process */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">¿Qué Sucede Después?</h2>
                        <div className="space-y-4 text-zinc-300">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Registro (Inmediato)</h3>
                                    <p className="text-sm">Su reclamo/queja se registra en nuestro sistema y recibe un número de seguimiento por email.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Evaluación (1-3 días hábiles)</h3>
                                    <p className="text-sm">Nuestro equipo analiza su caso y puede contactarlo para solicitar información adicional.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Resolución (Máximo 10 días hábiles)</h3>
                                    <p className="text-sm">Le comunicamos la resolución y las acciones que tomaremos para solucionar su caso.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Seguimiento</h3>
                                    <p className="text-sm">Implementamos la solución acordada y hacemos seguimiento para asegurar su satisfacción.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* External Resources */}
                    <section className="border-t border-zinc-700 pt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Organismos de Defensa del Consumidor</h2>
                        <p className="text-zinc-300 mb-4">
                            Si no está satisfecho con nuestra respuesta, puede acudir a:
                        </p>
                        <ul className="space-y-3 text-zinc-300">
                            <li>
                                <strong className="text-white">Dirección Nacional de Defensa del Consumidor:</strong>
                                <br />
                                <span className="text-sm">Tel: 0800-666-1518 | Web: argentina.gob.ar/produccion/defensadelconsumidor</span>
                            </li>
                            <li>
                                <strong className="text-white">Dirección General de Defensa y Protección del Consumidor (CABA):</strong>
                                <br />
                                <span className="text-sm">Tel: 147 | Web: buenosaires.gob.ar/defensaconsumidor</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
