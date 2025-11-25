import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, RotateCcw, Send, CheckCircle } from 'lucide-react';

export default function Returns() {
    const [formData, setFormData] = useState({
        orderId: '',
        name: '',
        email: '',
        phone: '',
        reason: '',
        details: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Solicitud de devolución enviada. En producción, esto generaría un número RMA.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <RotateCcw className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Solicitar Devolución</h1>
                    </div>
                    <p className="text-zinc-400 text-lg">Inicia el proceso de devolución de tu producto</p>
                </div>

                {/* Process Steps */}
                <div className="glassmorphism p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Proceso de Devolución</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { num: 1, title: 'Solicitud', desc: 'Completa el formulario' },
                            { num: 2, title: 'Autorización', desc: 'Recibe tu número RMA' },
                            { num: 3, title: 'Envío', desc: 'Envía el producto' },
                            { num: 4, title: 'Reembolso', desc: 'Recibe tu dinero' }
                        ].map((step) => (
                            <div key={step.num} className="text-center">
                                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                                <p className="text-zinc-400 text-xs">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="glassmorphism p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Formulario de Devolución</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white font-semibold mb-2">Número de Pedido <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="orderId"
                                value={formData.orderId}
                                onChange={handleChange}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                placeholder="Ej: ORD-12345"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">Nombre Completo <span className="text-red-500">*</span></label>
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
                                <label className="block text-white font-semibold mb-2">Email <span className="text-red-500">*</span></label>
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

                        <div>
                            <label className="block text-white font-semibold mb-2">Teléfono <span className="text-red-500">*</span></label>
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
                            <label className="block text-white font-semibold mb-2">Motivo de Devolución <span className="text-red-500">*</span></label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                required
                            >
                                <option value="">Selecciona un motivo</option>
                                <option value="defectuoso">Producto defectuoso</option>
                                <option value="incorrecto">Producto incorrecto</option>
                                <option value="dañado">Producto dañado en envío</option>
                                <option value="no-esperado">No es lo que esperaba</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">Detalles Adicionales <span className="text-red-500">*</span></label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                rows={5}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                                placeholder="Describe el problema o motivo de la devolución..."
                                required
                            />
                        </div>

                        <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                            <div className="flex gap-3">
                                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-blue-300 text-sm">
                                    Una vez enviado, recibirás un email con tu número de autorización (RMA) y las instrucciones de envío en 24-48 horas.
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors cyber-glow flex items-center justify-center gap-2"
                        >
                            <Send className="h-5 w-5" />
                            Enviar Solicitud
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/refunds" className="text-emerald-500 hover:underline">
                        Ver Política de Reembolsos Completa →
                    </Link>
                </div>
            </div>
        </div>
    );
}
