import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Zap, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { clientsService } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre es muy largo'),
  lastname: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido es muy largo'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  telephone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s-()]+$/.test(val),
      'Teléfono inválido'
    ),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña es muy larga'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmá tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { setFromClient } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Omit<RegisterFormData, 'password' | 'confirmPassword'>) => {
      // Check if email already exists
      const clients = await clientsService.getAll();
      const existingClient = clients.find(
        (c) => c.email.toLowerCase() === data.email.toLowerCase()
      );
      
      if (existingClient) {
        throw new Error('Este email ya está registrado');
      }

      // Create new client
      return await clientsService.create({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        telephone: data.telephone,
      });
    },
    onSuccess: (client) => {
      setFromClient(client);
      navigate('/');
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setErrorMessage('');
    const { password, confirmPassword, ...clientData } = data;
    registerMutation.mutate(clientData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
            <div className="relative">
              <Zap className="h-12 w-12 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-400/30 transition-colors" />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              Cyber<span className="text-emerald-500">Store</span>
            </span>
          </Link>

          <Card className="p-8 glassmorphism border-zinc-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Crear Cuenta Nueva</h1>
              <p className="text-zinc-400">Unite a la comunidad tech</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-500" />
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan"
                  {...register('name')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Lastname Field */}
              <div className="space-y-2">
                <Label htmlFor="lastname" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-500" />
                  Apellido
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Pérez"
                  {...register('lastname')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Telephone Field (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  Teléfono <span className="text-zinc-500 text-xs">(opcional)</span>
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  {...register('telephone')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm">{errors.telephone.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-500" />
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className="bg-zinc-900 border-zinc-700 focus:border-emerald-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={registerMutation.isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold cyber-glow"
              >
                {registerMutation.isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    Crear Cuenta
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-950 text-zinc-500">
                  ¿Ya tenés cuenta?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-zinc-700 hover:border-emerald-500 hover:text-emerald-500"
            >
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Button asChild variant="ghost" className="text-zinc-400 hover:text-emerald-500">
              <Link to="/">← Volver al inicio</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
