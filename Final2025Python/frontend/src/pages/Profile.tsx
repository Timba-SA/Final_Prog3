import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { clientsService, ordersService, addressesService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  User, ArrowLeft, UserCircle2,
  ShoppingBag, MapPin, Package, Calendar, DollarSign,
  Plus, Edit, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Client, Address } from '@/types/api';

interface ProfileFormData {
  name: string;
  lastname: string;
  email: string;
  telephone: string;
}

interface AddressFormData {
  street: string;
  number: string;
  city: string;
  client_id: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'addresses'>('info');
  const [isEditing, setIsEditing] = useState(false);

  // Address Dialog State
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState<AddressFormData>({
    street: '', number: '', city: '', client_id: user?.id || 0
  });

  // Form for Personal Info
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
    },
  });

  // Queries
  const { data: clientData, isLoading: isLoadingClient } = useQuery({
    queryKey: ['client', user?.id],
    queryFn: () => clientsService.getById(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  const { data: allOrders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersService.getAll,
    enabled: isAuthenticated
  });

  const { data: allAddresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressesService.getAll,
    enabled: isAuthenticated
  });

  // Filter data for current user
  const myOrders = allOrders.filter(order => order.client_id === user?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const myAddresses = allAddresses.filter(address => address.client_id === user?.id);

  // Update form when client data loads
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

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Client>) =>
      clientsService.update(user!.id, data as Client),
    onSuccess: (updatedClient) => {
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
      alert(error.response?.data?.detail || 'Error al actualizar el perfil');
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: addressesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsAddressDialogOpen(false);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) => addressesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsAddressDialogOpen(false);
      setEditingAddress(null);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: addressesService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  // Handlers
  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...addressFormData, client_id: user!.id };
    if (editingAddress) {
      updateAddressMutation.mutate({ id: editingAddress.id_key, data: payload });
    } else {
      createAddressMutation.mutate(payload as any);
    }
  };

  const openAddressDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setAddressFormData({
        street: address.street,
        number: address.number || '',
        city: address.city,
        client_id: user!.id
      });
    } else {
      setEditingAddress(null);
      setAddressFormData({ street: '', number: '', city: '', client_id: user!.id });
    }
    setIsAddressDialogOpen(true);
  };

  const statusColors: Record<number, string> = {
    1: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30', // PENDING
    2: 'bg-blue-500/20 text-blue-500 border-blue-500/30',     // IN_PROGRESS
    3: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30', // DELIVERED
    4: 'bg-rose-500/20 text-rose-500 border-rose-500/30',     // CANCELED
  };

  const statusLabels: Record<number, string> = {
    1: 'Pendiente',
    2: 'En Progreso',
    3: 'Entregado',
    4: 'Cancelado',
  };

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  if (isLoadingClient) {
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
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-4 text-zinc-400 hover:text-zinc-100 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-4 rounded-2xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
            <UserCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Hola, {user.name}
            </h1>
            <p className="text-zinc-500 mt-1">
              Gestiona tu cuenta y pedidos
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="glassmorphism p-4 border-zinc-800 sticky top-24">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('info')}
                className={`w-full justify-start ${activeTab === 'info' ? 'bg-emerald-500/20 text-emerald-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
              >
                <User className="h-4 w-4 mr-3" />
                Información Personal
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('orders')}
                className={`w-full justify-start ${activeTab === 'orders' ? 'bg-emerald-500/20 text-emerald-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
              >
                <ShoppingBag className="h-4 w-4 mr-3" />
                Mis Órdenes
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('addresses')}
                className={`w-full justify-start ${activeTab === 'addresses' ? 'bg-emerald-500/20 text-emerald-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
              >
                <MapPin className="h-4 w-4 mr-3" />
                Mis Direcciones
              </Button>
            </nav>

            <div className="mt-8 pt-6 border-t border-zinc-800 px-2">
              <div className="text-xs text-zinc-500 mb-2">MIEMBRO DESDE</div>
              <div className="text-sm text-zinc-300 font-mono">
                {clientData?.created_at ? new Date(clientData.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : '-'}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="glassmorphism p-8 border-zinc-800">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Información Personal</h2>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-zinc-400">
                          Nombre
                        </Label>
                        <Input
                          id="name"
                          {...register('name', { required: 'Requerido' })}
                          disabled={!isEditing}
                          className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastname" className="flex items-center gap-2 mb-2 text-zinc-400">
                          Apellido
                        </Label>
                        <Input
                          id="lastname"
                          {...register('lastname', { required: 'Requerido' })}
                          disabled={!isEditing}
                          className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-zinc-400">
                          Email
                        </Label>
                        <Input
                          id="email"
                          {...register('email', { required: 'Requerido' })}
                          disabled={!isEditing}
                          className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telephone" className="flex items-center gap-2 mb-2 text-zinc-400">
                          Teléfono
                        </Label>
                        <Input
                          id="telephone"
                          {...register('telephone')}
                          disabled={!isEditing}
                          className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            reset();
                            setIsEditing(false);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={!isDirty || updateProfileMutation.isPending}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        >
                          {updateProfileMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                      </div>
                    )}
                  </form>
                </Card>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">Mis Órdenes</h2>
                  <span className="text-sm text-zinc-500">{myOrders.length} pedidos</span>
                </div>

                {myOrders.length === 0 ? (
                  <Card className="glassmorphism p-12 border-zinc-800 text-center">
                    <ShoppingBag className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-zinc-300">No tienes órdenes aún</h3>
                    <p className="text-zinc-500 mt-2 mb-6">¡Explora nuestros productos y realiza tu primera compra!</p>
                    <Button onClick={() => navigate('/products')} className="bg-emerald-600 hover:bg-emerald-500">
                      Ver Productos
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myOrders.map((order) => (
                      <Card key={order.id_key} className="glassmorphism p-6 border-zinc-800 hover:border-emerald-500/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-zinc-800/50 group-hover:bg-emerald-500/10 transition-colors">
                              <Package className="h-6 w-6 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg">Orden #{order.id_key}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status as number] || 'bg-zinc-800 text-zinc-400'}`}>
                                  {statusLabels[order.status as number] || 'Desconocido'}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {new Date(order.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3.5 w-3.5" />
                                  ${order.total.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Future: Add "View Details" button here */}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Mis Direcciones</h2>
                  <Button
                    onClick={() => openAddressDialog()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Dirección
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myAddresses.map((address) => (
                    <Card key={address.id_key} className="glassmorphism p-6 border-zinc-800 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-zinc-800" onClick={() => openAddressDialog(address)}>
                          <Edit className="h-4 w-4 text-zinc-400 hover:text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-500/20" onClick={() => confirm('¿Eliminar dirección?') && deleteAddressMutation.mutate(address.id_key)}>
                          <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-500" />
                        </Button>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-zinc-800/50 group-hover:bg-emerald-500/10 transition-colors">
                          <MapPin className="h-6 w-6 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{address.street} {address.number}</h3>
                          <p className="text-zinc-400">{address.city}</p>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {myAddresses.length === 0 && (
                    <div className="col-span-full text-center py-12 border-2 border-dashed border-zinc-800 rounded-2xl">
                      <MapPin className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                      <p className="text-zinc-500">No tienes direcciones guardadas</p>
                    </div>
                  )}
                </div>

                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogContent className="glassmorphism border-zinc-700">
                    <DialogHeader>
                      <DialogTitle>{editingAddress ? 'Editar Dirección' : 'Nueva Dirección'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                          <Label htmlFor="street">Calle</Label>
                          <Input
                            id="street"
                            value={addressFormData.street}
                            onChange={(e) => setAddressFormData({ ...addressFormData, street: e.target.value })}
                            required
                            className="bg-zinc-900/50 border-zinc-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="number">Número</Label>
                          <Input
                            id="number"
                            value={addressFormData.number}
                            onChange={(e) => setAddressFormData({ ...addressFormData, number: e.target.value })}
                            className="bg-zinc-900/50 border-zinc-700"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            value={addressFormData.city}
                            onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                            required
                            className="bg-zinc-900/50 border-zinc-700"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsAddressDialogOpen(false)} className="flex-1">
                          Cancelar
                        </Button>
                        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500">
                          {editingAddress ? 'Actualizar' : 'Crear'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
