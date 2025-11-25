import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsService } from '@/services/api';
import type { Client } from '@/types/api';
import { Users, Plus, Edit, Trash2, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Clients() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    telephone: '',
  });

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: clientsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: clientsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Client> }) =>
      clientsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: clientsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const resetForm = () => {
    setFormData({ name: '', lastname: '', email: '', telephone: '' });
    setEditingClient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data with undefined for empty telephone to match TypeScript types
    const submitData = {
      ...formData,
      telephone: formData.telephone.trim() === '' ? undefined : formData.telephone,
    };

    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id_key, data: submitData });
    } else {
      createMutation.mutate(submitData as any);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      lastname: client.lastname,
      email: client.email,
      telephone: client.telephone || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-emerald-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-emerald-500" />
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label htmlFor="telephone">Teléfono (opcional)</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                  placeholder="+5491112345678"
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Formato: +código país + número (7-20 dígitos)
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  {editingClient ? 'Actualizar' : 'Crear'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id_key}
            className="glassmorphism rounded-lg p-6 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {client.name} {client.lastname}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    ID: {client.id_key}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(client)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(client.id_key)}
                  className="text-rose-500 hover:text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-400">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
              {client.telephone && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="h-4 w-4" />
                  <span>{client.telephone}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-700 text-xs text-zinc-500">
              Creado: {new Date(client.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          No hay clientes registrados. ¡Crea el primero!
        </div>
      )}
    </div>
  );
}
