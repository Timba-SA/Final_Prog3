import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService, clientsService, billsService } from '@/services/api';
import type { Order } from '@/types/api';
import { ShoppingCart, Plus, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Orders() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    total: 0,
    delivery_method: 'pickup' as 'pickup' | 'delivery' | 'shipping',
    status: 'pending' as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
    client_id: 0,
    bill_id: 0,
  });

  const { data: orders = [], isLoading } = useQuery({ queryKey: ['orders'], queryFn: ordersService.getAll });
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: clientsService.getAll });
  const { data: bills = [] } = useQuery({ queryKey: ['bills'], queryFn: billsService.getAll });

  const createMutation = useMutation({
    mutationFn: ordersService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orders'] }); setIsDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Order> }) => ordersService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orders'] }); setIsDialogOpen(false); setEditingOrder(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: ordersService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      updateMutation.mutate({ id: editingOrder.id_key, data: formData });
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      date: order.date.split('T')[0],
      total: order.total,
      delivery_method: order.delivery_method,
      status: order.status,
      client_id: order.client_id,
      bill_id: order.bill_id,
    });
    setIsDialogOpen(true);
  };

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    confirmed: 'bg-blue-500/20 text-blue-500',
    shipped: 'bg-purple-500/20 text-purple-500',
    delivered: 'bg-emerald-500/20 text-emerald-500',
    cancelled: 'bg-rose-500/20 text-rose-500',
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse">Cargando...</div></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold">Órdenes</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingOrder(null)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" /> Nueva Orden
            </Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700 max-w-2xl">
            <DialogHeader><DialogTitle>{editingOrder ? 'Editar Orden' : 'Nueva Orden'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_id">Cliente</Label>
                  <Select value={formData.client_id.toString()} onValueChange={(val) => setFormData({ ...formData, client_id: parseInt(val) })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>{clients.map((c) => <SelectItem key={c.id_key} value={c.id_key.toString()}>{c.name} {c.lastname}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bill_id">Factura</Label>
                  <Select value={formData.bill_id.toString()} onValueChange={(val) => setFormData({ ...formData, bill_id: parseInt(val) })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>{bills.map((b) => <SelectItem key={b.id_key} value={b.id_key.toString()}>{b.bill_number}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Fecha</Label>
                  <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="total">Total</Label>
                  <Input id="total" type="number" step="0.01" value={formData.total} onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })} required className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="delivery_method">Método de Entrega</Label>
                  <Select value={formData.delivery_method} onValueChange={(val: any) => setFormData({ ...formData, delivery_method: val })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Retiro</SelectItem>
                      <SelectItem value="delivery">Entrega</SelectItem>
                      <SelectItem value="shipping">Envío</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">{editingOrder ? 'Actualizar' : 'Crear'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id_key} className="glassmorphism rounded-lg p-4 hover:border-purple-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <h3 className="font-bold">Orden #{order.id_key}</h3>
                  <p className="text-xs text-zinc-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(order)}><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => confirm('¿Eliminar?') && deleteMutation.mutate(order.id_key)} className="text-rose-500"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-zinc-400">Total:</span><span className="font-bold">${order.total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Entrega:</span><span className="capitalize">{order.delivery_method}</span></div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>{order.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
