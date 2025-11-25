import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mensaje enviado. En producción, esto se enviaría al backend.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-zinc-400 text-lg">Estamos aquí para ayudarte</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glassmorphism p-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white mb-1">Dirección</h3>
                                    <p className="text-zinc-400 text-sm">Av. Corrientes 1234<br />Buenos Aires, Argentina</p>
                                </div>
                            </div>
                        </div>

                        <div className="glassmorphism p-6">
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white mb-1">Email</h3>
                                    <a href="mailto:info@cyberstore.com" className="text-emerald-500 hover:underline text-sm">
                                        info@cyberstore.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glassmorphism p-6">
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white mb-1">Teléfono</h3>
                                    <a href="tel:+5491112345678" className="text-emerald-500 hover:underline text-sm">
                                        +54 9 11 1234-5678
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glassmorphism p-6">
                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-white mb-1">Horarios</h3>
                                    <p className="text-zinc-400 text-sm">Lun-Vie: 9:00 - 18:00<br />Sáb: 10:00 - 14:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glassmorphism p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Nombre <span className="text-red-500">*</span></label>
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
                                    <label className="block text-white font-semibold mb-2">Asunto <span className="text-red-500">*</span></label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Selecciona un asunto</option>
                                        <option value="consulta">Consulta General</option>
                                        <option value="soporte">Soporte Técnico</option>
                                        <option value="pedido">Estado de Pedido</option>
                                        <option value="devolucion">Devolución</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Mensaje <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors cyber-glow flex items-center justify-center gap-2"
                                >
                                    <Send className="h-5 w-5" />
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
