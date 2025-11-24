import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  User,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ordersService, billsService, clientsService, addressesService, orderDetailsService } from '@/services/api';

// Step 1: Identification Schema
const identificationSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  lastname: z.string().min(2, 'Apellido requerido'),
  email: z.string().email('Email inválido'),
  telephone: z.string().optional(),
});

// Step 2: Shipping Schema
const shippingSchema = z.object({
  street: z.string().min(3, 'Calle requerida'),
  number: z.string().min(1, 'Altura requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  deliveryMethod: z.enum(['pickup', 'delivery', 'shipping']),
});

// Step 3: Payment Schema
const paymentSchema = z.object({
  paymentType: z.enum(['cash', 'credit_card', 'debit_card', 'transfer']),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
}).refine((data) => {
  if (data.paymentType === 'credit_card' || data.paymentType === 'debit_card') {
    return (
      data.cardNumber &&
      data.cardName &&
      data.cardExpiry &&
      data.cardCvv &&
      data.cardNumber.length >= 16
    );
  }
  return true;
}, {
  message: 'Completá todos los datos de la tarjeta',
  path: ['cardNumber'],
});

type IdentificationFormData = z.infer<typeof identificationSchema>;
type ShippingFormData = z.infer<typeof shippingSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();

  // Form states
  const [identificationData, setIdentificationData] = useState<IdentificationFormData | null>(
    isAuthenticated && user
      ? {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        telephone: user.telephone,
      }
      : null
  );
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);

  // Step 1 Form
  const identificationForm = useForm<IdentificationFormData>({
    resolver: zodResolver(identificationSchema),
    defaultValues: identificationData || undefined,
  });

  // Step 2 Form
  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData || { deliveryMethod: 'delivery' },
  });

  // Step 3 Form
  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentData || { paymentType: 'cash' },
  });

  const totalPrice = getTotalPrice();

  // Create Order Mutation
  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!identificationData || !shippingData || !paymentData) {
        throw new Error('Faltan datos');
      }

      // 1. Create or get client
      let clientId: number;
      if (isAuthenticated && user) {
        clientId = user.id;
      } else {
        const newClient = await clientsService.create({
          name: identificationData.name,
          lastname: identificationData.lastname,
          email: identificationData.email,
          telephone: identificationData.telephone,
        });
        clientId = newClient.id_key;
      }

      // 2. Create address
      await addressesService.create({
        street: shippingData.street,
        number: shippingData.number,
        city: shippingData.city,
        client_id: clientId,
      });

      // 3. Create bill
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Map payment type to backend enum
      const paymentTypeMap: Record<string, number> = {
        'cash': 1,
        'credit_card': 4,
        'debit_card': 3,
        'transfer': 5,
      };

      const bill = await billsService.create({
        bill_number: `BILL-${Date.now()}`,
        date: dateString,
        total: totalPrice,
        discount: 0,
        payment_type: paymentTypeMap[paymentData.paymentType] || 1,
        client_id: clientId,
      });

      // 4. Create order
      const deliveryMethodMap: Record<string, number> = {
        'pickup': 2, // ON_HAND
        'delivery': 3, // HOME_DELIVERY
        'shipping': 3, // HOME_DELIVERY
      };

      const order = await ordersService.create({
        date: new Date().toISOString(),
        total: totalPrice,
        delivery_method: deliveryMethodMap[shippingData.deliveryMethod] || 3,
        status: 1, // PENDING
        client_id: clientId,
        bill_id: bill.id_key,
      });

      // 5. Create order details for each product
      await Promise.all(
        items.map((item) =>
          orderDetailsService.create({
            order_id: order.id_key,
            product_id: item.product.id_key,
            quantity: item.quantity,
            unit_price: item.product.price,
            subtotal: item.product.price * item.quantity,
          })
        )
      );

      return order;
    },
    onSuccess: () => {
      setOrderSuccess(true);
      clearCart();
    },
  });

  const handleStep1Submit = (data: IdentificationFormData) => {
    setIdentificationData(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: PaymentFormData) => {
    setPaymentData(data);
    setCurrentStep(4);
  };

  const handleFinalSubmit = () => {
    createOrderMutation.mutate();
  };

  const steps = [
    { number: 1, title: 'Identificación', icon: User },
    { number: 2, title: 'Envío', icon: MapPin },
    { number: 3, title: 'Pago', icon: CreditCard },
    { number: 4, title: 'Confirmación', icon: CheckCircle },
  ];

  if (items.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center glassmorphism border-emerald-500/20 cyber-glow max-w-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="h-24 w-24 text-emerald-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">¡Compra Exitosa!</h1>
            <p className="text-zinc-400 text-lg mb-8">
              Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white cyber-glow"
              >
                <a href="/">Volver al Inicio</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-zinc-700 hover:border-emerald-500"
              >
                <a href="/products">Seguir Comprando</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-zinc-400">Completá tu compra en 4 simples pasos</p>
        </motion.div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                        ${isCompleted ? 'bg-emerald-600 cyber-glow' : ''}
                        ${isActive ? 'bg-emerald-600 cyber-glow scale-110' : ''}
                        ${!isActive && !isCompleted ? 'bg-zinc-800' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-zinc-800 mx-2">
                      <div
                        className={`h-full bg-emerald-600 transition-all duration-500 ${currentStep > step.number ? 'w-full' : 'w-0'
                          }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Identification */}
            {currentStep === 1 && (
              <Card className="p-8 glassmorphism border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="h-6 w-6 text-emerald-500" />
                  Datos Personales
                </h2>
                <form onSubmit={identificationForm.handleSubmit(handleStep1Submit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        {...identificationForm.register('name')}
                        className="bg-zinc-900 border-zinc-700"
                        disabled={isAuthenticated}
                      />
                      {identificationForm.formState.errors.name && (
                        <p className="text-red-500 text-sm">
                          {identificationForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Apellido</Label>
                      <Input
                        id="lastname"
                        {...identificationForm.register('lastname')}
                        className="bg-zinc-900 border-zinc-700"
                        disabled={isAuthenticated}
                      />
                      {identificationForm.formState.errors.lastname && (
                        <p className="text-red-500 text-sm">
                          {identificationForm.formState.errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...identificationForm.register('email')}
                      className="bg-zinc-900 border-zinc-700"
                      disabled={isAuthenticated}
                    />
                    {identificationForm.formState.errors.email && (
                      <p className="text-red-500 text-sm">
                        {identificationForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Teléfono (opcional)</Label>
                    <Input
                      id="telephone"
                      {...identificationForm.register('telephone')}
                      className="bg-zinc-900 border-zinc-700"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 cyber-glow"
                  >
                    Continuar
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <Card className="p-8 glassmorphism border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                  Dirección de Envío
                </h2>
                <form onSubmit={shippingForm.handleSubmit(handleStep2Submit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="street">Calle</Label>
                      <Input
                        id="street"
                        {...shippingForm.register('street')}
                        className="bg-zinc-900 border-zinc-700"
                      />
                      {shippingForm.formState.errors.street && (
                        <p className="text-red-500 text-sm">
                          {shippingForm.formState.errors.street.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Altura</Label>
                      <Input
                        id="number"
                        {...shippingForm.register('number')}
                        className="bg-zinc-900 border-zinc-700"
                      />
                      {shippingForm.formState.errors.number && (
                        <p className="text-red-500 text-sm">
                          {shippingForm.formState.errors.number.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      {...shippingForm.register('city')}
                      className="bg-zinc-900 border-zinc-700"
                    />
                    {shippingForm.formState.errors.city && (
                      <p className="text-red-500 text-sm">
                        {shippingForm.formState.errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Método de Entrega</Label>
                    <RadioGroup
                      value={shippingForm.watch('deliveryMethod')}
                      onValueChange={(value) =>
                        shippingForm.setValue('deliveryMethod', value as 'pickup' | 'delivery' | 'shipping')
                      }
                    >
                      <RadioGroupItem value="delivery">
                        <div>
                          <p className="font-bold">Envío a Domicilio</p>
                          <p className="text-sm text-zinc-500">Gratis - 2-3 días hábiles</p>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="pickup">
                        <div>
                          <p className="font-bold">Retiro en Sucursal</p>
                          <p className="text-sm text-zinc-500">Gratis - Disponible en 24hs</p>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="shipping">
                        <div>
                          <p className="font-bold">Envío Express</p>
                          <p className="text-sm text-zinc-500">Gratis - 24hs hábiles</p>
                        </div>
                      </RadioGroupItem>
                    </RadioGroup>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 cyber-glow"
                    >
                      Continuar
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card className="p-8 glassmorphism border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-emerald-500" />
                  Método de Pago
                </h2>
                <form onSubmit={paymentForm.handleSubmit(handleStep3Submit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Elegí tu método de pago</Label>
                    <RadioGroup
                      value={paymentForm.watch('paymentType')}
                      onValueChange={(value) =>
                        paymentForm.setValue('paymentType', value as 'cash' | 'credit_card' | 'debit_card' | 'transfer')
                      }
                    >
                      <RadioGroupItem value="cash">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-bold">Efectivo</p>
                            <p className="text-sm text-zinc-500">Pago al momento de la entrega</p>
                          </div>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="credit_card">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-bold">Tarjeta de Crédito</p>
                            <p className="text-sm text-zinc-500">Pago seguro online</p>
                          </div>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="debit_card">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-bold">Tarjeta de Débito</p>
                            <p className="text-sm text-zinc-500">Pago seguro online</p>
                          </div>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="transfer">
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-bold">Transferencia Bancaria</p>
                            <p className="text-sm text-zinc-500">Te enviaremos los datos por email</p>
                          </div>
                        </div>
                      </RadioGroupItem>
                    </RadioGroup>
                  </div>

                  {/* Card Details (if card selected) */}
                  {(paymentForm.watch('paymentType') === 'credit_card' ||
                    paymentForm.watch('paymentType') === 'debit_card') && (
                      <div className="space-y-4 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                          <Input
                            id="cardNumber"
                            {...paymentForm.register('cardNumber')}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="bg-zinc-950 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nombre del Titular</Label>
                          <Input
                            id="cardName"
                            {...paymentForm.register('cardName')}
                            placeholder="JUAN PEREZ"
                            className="bg-zinc-950 border-zinc-700"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Vencimiento</Label>
                            <Input
                              id="cardExpiry"
                              {...paymentForm.register('cardExpiry')}
                              placeholder="MM/AA"
                              maxLength={5}
                              className="bg-zinc-950 border-zinc-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              {...paymentForm.register('cardCvv')}
                              placeholder="123"
                              maxLength={4}
                              type="password"
                              className="bg-zinc-950 border-zinc-700"
                            />
                          </div>
                        </div>
                        {paymentForm.formState.errors.cardNumber && (
                          <p className="text-red-500 text-sm">
                            {paymentForm.formState.errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                    )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 cyber-glow"
                    >
                      Continuar
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card className="p-8 glassmorphism border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                  Confirmación del Pedido
                </h2>

                <div className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Productos</h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.product.id_key}
                          className="flex justify-between p-3 bg-zinc-900 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-zinc-500">
                              Cantidad: {item.quantity} × ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  {identificationData && (
                    <div>
                      <h3 className="text-lg font-bold mb-3">Datos del Cliente</h3>
                      <div className="p-4 bg-zinc-900 rounded-lg space-y-1">
                        <p>
                          <span className="text-zinc-500">Nombre:</span>{' '}
                          {identificationData.name} {identificationData.lastname}
                        </p>
                        <p>
                          <span className="text-zinc-500">Email:</span> {identificationData.email}
                        </p>
                        {identificationData.telephone && (
                          <p>
                            <span className="text-zinc-500">Teléfono:</span>{' '}
                            {identificationData.telephone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Shipping Info */}
                  {shippingData && (
                    <div>
                      <h3 className="text-lg font-bold mb-3">Dirección de Envío</h3>
                      <div className="p-4 bg-zinc-900 rounded-lg space-y-1">
                        <p>
                          {shippingData.street} {shippingData.number}
                        </p>
                        <p>{shippingData.city}</p>
                        <p className="text-emerald-500 font-medium mt-2">
                          Método:{' '}
                          {shippingData.deliveryMethod === 'delivery'
                            ? 'Envío a Domicilio'
                            : shippingData.deliveryMethod === 'pickup'
                              ? 'Retiro en Sucursal'
                              : 'Envío Express'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Info */}
                  {paymentData && (
                    <div>
                      <h3 className="text-lg font-bold mb-3">Método de Pago</h3>
                      <div className="p-4 bg-zinc-900 rounded-lg">
                        <p className="font-medium">
                          {paymentData.paymentType === 'cash'
                            ? 'Efectivo'
                            : paymentData.paymentType === 'credit_card'
                              ? 'Tarjeta de Crédito'
                              : paymentData.paymentType === 'debit_card'
                                ? 'Tarjeta de Débito'
                                : 'Transferencia Bancaria'}
                        </p>
                        {paymentData.cardNumber && (
                          <p className="text-sm text-zinc-500 mt-1">
                            •••• {paymentData.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Total a Pagar</span>
                      <span className="text-3xl font-black text-emerald-500">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Atrás
                    </Button>
                    <Button
                      onClick={handleFinalSubmit}
                      disabled={createOrderMutation.isPending}
                      size="lg"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 cyber-glow"
                    >
                      {createOrderMutation.isPending ? (
                        <>Procesando...</>
                      ) : (
                        <>
                          Confirmar Compra
                          <CheckCircle className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
