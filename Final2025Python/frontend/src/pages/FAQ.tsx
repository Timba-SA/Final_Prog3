import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        // Envíos
        { category: 'Envíos y Entregas', question: '¿Cuánto tarda la entrega?', answer: 'Los tiempos de entrega son de 3 a 7 días hábiles para CABA y GBA. Para otras zonas, puede variar entre 7 y 15 días hábiles.' },
        { category: 'Envíos y Entregas', question: '¿Cómo rastreo mi pedido?', answer: 'Una vez despachado tu pedido, recibirás un email con el número de seguimiento. Puedes rastrearlo en la sección "Estado del Pedido" de tu cuenta o en la página del correo.' },
        { category: 'Envíos y Entregas', question: '¿Puedo cambiar la dirección de envío?', answer: 'Sí, puedes cambiar la dirección antes de que el pedido sea despachado. Contáctanos inmediatamente a través del chat o por email.' },
        { category: 'Envíos y Entregas', question: '¿Ofrecen envío gratis?', answer: 'Sí, ofrecemos envío gratis para compras superiores a $50,000 en CABA y GBA.' },

        // Pagos
        { category: 'Pagos y Facturación', question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos tarjetas de crédito (Visa, Mastercard), tarjetas de débito y Mercado Pago. Todos los pagos son procesados de forma segura.' },
        { category: 'Pagos y Facturación', question: '¿Puedo pagar en cuotas?', answer: 'Sí, aceptamos pagos en cuotas con tarjetas de crédito. Las opciones de cuotas varían según el banco emisor.' },
        { category: 'Pagos y Facturación', question: '¿Emiten factura?', answer: 'Sí, emitimos factura A o B según corresponda. La factura se envía por email junto con la confirmación del pedido.' },
        { category: 'Pagos y Facturación', question: '¿Es seguro pagar en línea?', answer: 'Absolutamente. Utilizamos cifrado SSL y procesadores de pago certificados PCI-DSS para garantizar la seguridad de tus datos.' },

        // Devoluciones
        { category: 'Devoluciones y Garantías', question: '¿Cuál es la política de devoluciones?', answer: 'Tienes 30 días desde la recepción del producto para solicitar una devolución. El producto debe estar sin usar y en su empaque original.' },
        { category: 'Devoluciones y Garantías', question: '¿Cómo solicito una devolución?', answer: 'Contáctanos por email a returns@cyberstore.com o por teléfono. Te enviaremos un número de autorización (RMA) y las instrucciones.' },
        { category: 'Devoluciones y Garantías', question: '¿Cuánto tarda el reembolso?', answer: 'Una vez recibido e inspeccionado el producto, procesamos el reembolso en 5-10 días hábiles según el método de pago original.' },
        { category: 'Devoluciones y Garantías', question: '¿Los productos tienen garantía?', answer: 'Sí, todos los productos cuentan con garantía legal y muchos incluyen garantía del fabricante. Los detalles se especifican en cada producto.' },

        // Cuenta
        { category: 'Cuenta y Seguridad', question: '¿Cómo creo una cuenta?', answer: 'Haz clic en "Registrarse" en la parte superior derecha, completa tus datos y verifica tu email. ¡Es rápido y gratis!' },
        { category: 'Cuenta y Seguridad', question: '¿Olvidé mi contraseña, qué hago?', answer: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" y sigue las instrucciones para restablecerla.' },
        { category: 'Cuenta y Seguridad', question: '¿Puedo modificar mis datos personales?', answer: 'Sí, puedes editar tus datos desde la sección "Mi Perfil" en tu cuenta.' },
        { category: 'Cuenta y Seguridad', question: '¿Cómo elimino mi cuenta?', answer: 'Puedes solicitar la eliminación de tu cuenta contactándonos a privacy@cyberstore.com. Procesaremos tu solicitud en 48 horas.' },
    ];

    const categories = [...new Set(faqs.map(faq => faq.category))];

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

                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="h-10 w-10 text-emerald-500" />
                        <h1 className="text-4xl font-bold">Preguntas Frecuentes</h1>
                    </div>
                    <p className="text-zinc-400 text-lg">
                        Encuentra respuestas rápidas a las preguntas más comunes
                    </p>
                </div>

                {/* FAQ by Category */}
                <div className="space-y-8">
                    {categories.map((category, catIndex) => (
                        <section key={catIndex} className="glassmorphism p-6">
                            <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
                            <div className="space-y-3">
                                {faqs
                                    .filter(faq => faq.category === category)
                                    .map((faq, faqIndex) => {
                                        const globalIndex = faqs.findIndex(f => f === faq);
                                        const isOpen = openIndex === globalIndex;

                                        return (
                                            <div key={faqIndex} className="border border-zinc-700 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                    className="w-full px-6 py-4 flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 transition-colors text-left"
                                                >
                                                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 py-4 bg-zinc-900/50 text-zinc-300 leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 glassmorphism p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">¿No encontraste tu respuesta?</h2>
                    <p className="text-zinc-400 mb-6">Estamos aquí para ayudarte</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/contact"
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cyber-glow"
                        >
                            Contactar Soporte
                        </Link>
                        <Link
                            to="/help"
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                        >
                            Centro de Ayuda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
