import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesService, clientsService } from '@/services/api';
import type { Address } from '@/types/api';
import { MapPin, Plus, Edit, Trash2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Addresses() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({ street: '', number: '', city: '', client_id: 0 });

  const { data: addresses = [], isLoading } = useQuery({ queryKey: ['addresses'], queryFn: addressesService.getAll });
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: clientsService.getAll });

  const createMutation = useMutation({
    mutationFn: addressesService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['addresses'] }); setIsDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) => addressesService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['addresses'] }); setIsDialogOpen(false); setEditingAddress(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: addressesService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress.id_key, data: formData });
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({ street: address.street, number: address.number || '', city: address.city, client_id: address.client_id });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse">Cargando...</div></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-cyan-500" />
          <h1 className="text-3xl font-bold">Direcciones</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAddress(null)} className="bg-cyan-600 hover:bg-cyan-700"><Plus className="h-4 w-4 mr-2" /> Nueva Dirección</Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700">
            <DialogHeader><DialogTitle>{editingAddress ? 'Editar Dirección' : 'Nueva Dirección'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="client_id">Cliente</Label>
                <Select value={formData.client_id.toString()} onValueChange={(val) => setFormData({ ...formData, client_id: parseInt(val) })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                  <SelectContent>{clients.map((c) => <SelectItem key={c.id_key} value={c.id_key.toString()}>{c.name} {c.lastname}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="street">Calle</Label>
                  <Input id="street" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} required className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className="bg-zinc-800 border-zinc-700" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="bg-zinc-800 border-zinc-700" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700">{editingAddress ? 'Actualizar' : 'Crear'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <div key={address.id_key} className="glassmorphism rounded-lg p-4 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-cyan-500" />
                <div>
                  <h3 className="font-bold">{address.street} {address.number}</h3>
                  <p className="text-xs text-zinc-500">{address.city}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(address)}><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => confirm('¿Eliminar?') && deleteMutation.mutate(address.id_key)} className="text-rose-500"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <p className="text-sm text-zinc-400">Cliente ID: {address.client_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
