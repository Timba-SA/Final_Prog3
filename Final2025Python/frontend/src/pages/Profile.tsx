import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { clientsService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Save, ArrowLeft, Mail, Phone, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/api';

interface ProfileFormData {
  name: string;
  lastname: string;
  email: string;
  telephone: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
    },
  });

  // Obtener datos actualizados del cliente
  const { data: clientData, isLoading } = useQuery({
    queryKey: ['client', user?.id],
    queryFn: () => clientsService.getById(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  // Actualizar el formulario cuando se cargan los datos
  useEffect(() => {
    if (clientData) {
      reset({
        name: clientData.name,
        lastname: clientData.lastname,
        email: clientData.email,
        telephone: clientData.telephone || '',
      });
    }
  }, [clientData, reset]);

  // Mutación para actualizar el perfil
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Client>) =>
      clientsService.update(user!.id, data as Client),
    onSuccess: (updatedClient) => {
      // Actualizar el store de autenticación
      updateUser({
        name: updatedClient.name,
        lastname: updatedClient.lastname,
        email: updatedClient.email,
        telephone: updatedClient.telephone,
      });
      setIsEditing(false);
      alert('Perfil actualizado correctamente');
    },
    onError: (error: any) => {
      alert(
        error.response?.data?.detail || 'Error al actualizar el perfil'
      );
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4" />
          <p className="text-zinc-500">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm">
            <UserCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-zinc-500 mt-1">
              Gestiona tu información personal
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glassmorphism p-8 border-zinc-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-emerald-500" />
                  Nombre
                </Label>
                <Input
                  id="name"
                  {...register('name', {
                    required: 'El nombre es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres',
                    },
                  })}
                  disabled={!isEditing}
                  className={`bg-zinc-900 border-zinc-800 ${
                    !isEditing ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                  placeholder="Juan"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <Label htmlFor="lastname" className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-emerald-500" />
                  Apellido
                </Label>
                <Input
                  id="lastname"
                  {...register('lastname', {
                    required: 'El apellido es requerido',
                    minLength: {
                      value: 2,
                      message: 'El apellido debe tener al menos 2 caracteres',
                    },
                  })}
                  disabled={!isEditing}
                  className={`bg-zinc-900 border-zinc-800 ${
                    !isEditing ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                  placeholder="Pérez"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                disabled={!isEditing}
                className={`bg-zinc-900 border-zinc-800 ${
                  !isEditing ? 'cursor-not-allowed opacity-60' : ''
                }`}
                placeholder="juan@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <Label htmlFor="telephone" className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                Teléfono (opcional)
              </Label>
              <Input
                id="telephone"
                {...register('telephone')}
                disabled={!isEditing}
                className={`bg-zinc-900 border-zinc-800 ${
                  !isEditing ? 'cursor-not-allowed opacity-60' : ''
                }`}
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white cyber-glow"
                >
                  <User className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="ghost"
                    className="text-zinc-400 hover:text-zinc-100"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isDirty || updateMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white cyber-glow disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </>
              )}
            </div>
          </form>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-400 mb-3">
              Información de cuenta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-500">ID de Cliente:</span>
                <span className="ml-2 text-zinc-300 font-mono">
                  #{user.id}
                </span>
              </div>
              {clientData?.created_at && (
                <div>
                  <span className="text-zinc-500">Miembro desde:</span>
                  <span className="ml-2 text-zinc-300">
                    {new Date(clientData.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
