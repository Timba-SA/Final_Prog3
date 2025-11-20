import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderDetailsService, ordersService, productsService } from '@/services/api';
import type { OrderDetail } from '@/types/api';
import { ClipboardList, Plus, Edit, Trash2, Package, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OrderDetails() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState<OrderDetail | null>(null);
  const [formData, setFormData] = useState({ order_id: 0, product_id: 0, quantity: 1, unit_price: 0, subtotal: 0 });

  const { data: orderDetails = [], isLoading } = useQuery({ queryKey: ['orderDetails'], queryFn: orderDetailsService.getAll });
  const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: ordersService.getAll });
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: productsService.getAll });

  const createMutation = useMutation({
    mutationFn: orderDetailsService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orderDetails'] }); setIsDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<OrderDetail> }) => orderDetailsService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orderDetails'] }); setIsDialogOpen(false); setEditingDetail(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: orderDetailsService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderDetails'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = formData.quantity * formData.unit_price;
    if (editingDetail) {
      updateMutation.mutate({ id: editingDetail.id_key, data: { ...formData, subtotal } });
    } else {
      createMutation.mutate({ ...formData, subtotal } as any);
    }
  };

  const handleEdit = (detail: OrderDetail) => {
    setEditingDetail(detail);
    setFormData({ order_id: detail.order_id, product_id: detail.product_id, quantity: detail.quantity, unit_price: detail.unit_price, subtotal: detail.subtotal });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse">Cargando...</div></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Detalles de Órdenes</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingDetail(null)} className="bg-pink-600 hover:bg-pink-700"><Plus className="h-4 w-4 mr-2" /> Nuevo Detalle</Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700">
            <DialogHeader><DialogTitle>{editingDetail ? 'Editar Detalle' : 'Nuevo Detalle'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="order_id">Orden</Label>
                <Select value={formData.order_id.toString()} onValueChange={(val) => setFormData({ ...formData, order_id: parseInt(val) })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                  <SelectContent>{orders.map((o) => <SelectItem key={o.id_key} value={o.id_key.toString()}>Orden #{o.id_key}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product_id">Producto</Label>
                <Select value={formData.product_id.toString()} onValueChange={(val) => {
                  const productId = parseInt(val);
                  const product = products.find(p => p.id_key === productId);
                  setFormData({ ...formData, product_id: productId, unit_price: product?.price || 0 });
                }}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                  <SelectContent>{products.map((p) => <SelectItem key={p.id_key} value={p.id_key.toString()}>{p.name} (${p.price})</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input id="quantity" type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} required className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="unit_price">Precio Unitario</Label>
                  <Input id="unit_price" type="number" step="0.01" value={formData.unit_price} onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) })} required className="bg-zinc-800 border-zinc-700" />
                </div>
              </div>
              <div className="bg-zinc-800 p-3 rounded">
                <p className="text-sm text-zinc-400">Subtotal calculado:</p>
                <p className="text-2xl font-bold text-emerald-400">${(formData.quantity * formData.unit_price).toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">{editingDetail ? 'Actualizar' : 'Crear'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderDetails.map((detail) => (
          <div key={detail.id_key} className="glassmorphism rounded-lg p-4 hover:border-pink-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-pink-500" />
                <div>
                  <h3 className="font-bold">Detalle #{detail.id_key}</h3>
                  <p className="text-xs text-zinc-500">Orden #{detail.order_id}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(detail)}><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => confirm('¿Eliminar?') && deleteMutation.mutate(detail.id_key)} className="text-rose-500"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-zinc-400">Producto ID:</span><span>{detail.product_id}</span></div>
              <div className="flex items-center gap-2"><Hash className="h-4 w-4 text-zinc-500" /><span>Cantidad: {detail.quantity}</span></div>
              <div className="flex items-center justify-between"><span className="text-zinc-400">Precio Unit.:</span><span>${detail.unit_price.toFixed(2)}</span></div>
              <div className="flex items-center justify-between font-bold border-t border-zinc-700 pt-2"><span>Subtotal:</span><span className="text-emerald-400">${detail.subtotal.toFixed(2)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
