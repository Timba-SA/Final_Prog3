import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billsService, clientsService } from '@/services/api';
import type { Bill } from '@/types/api';
import { FileText, Plus, Edit, Trash2, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Bills() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [formData, setFormData] = useState({
    bill_number: '',
    discount: 0,
    date: new Date().toISOString().split('T')[0],
    total: 0,
    payment_type: 'cash' as 'cash' | 'credit_card' | 'debit_card' | 'transfer',
    client_id: 0,
  });

  const { data: bills = [], isLoading } = useQuery({ queryKey: ['bills'], queryFn: billsService.getAll });
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: clientsService.getAll });

  const createMutation = useMutation({
    mutationFn: billsService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['bills'] }); setIsDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Bill> }) => billsService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['bills'] }); setIsDialogOpen(false); setEditingBill(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: billsService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bills'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBill) {
      updateMutation.mutate({ id: editingBill.id_key, data: formData });
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setFormData({
      bill_number: bill.bill_number,
      discount: bill.discount || 0,
      date: bill.date.split('T')[0],
      total: bill.total,
      payment_type: bill.payment_type,
      client_id: bill.client_id,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse">Cargando...</div></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Facturas</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBill(null)} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" /> Nueva Factura
            </Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700 max-w-2xl">
            <DialogHeader><DialogTitle>{editingBill ? 'Editar Factura' : 'Nueva Factura'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bill_number">Número de Factura</Label>
                  <Input id="bill_number" value={formData.bill_number} onChange={(e) => setFormData({ ...formData, bill_number: e.target.value })} required className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="client_id">Cliente</Label>
                  <Select value={formData.client_id.toString()} onValueChange={(val) => setFormData({ ...formData, client_id: parseInt(val) })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>{clients.map((c) => <SelectItem key={c.id_key} value={c.id_key.toString()}>{c.name} {c.lastname}</SelectItem>)}</SelectContent>
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
                  <Label htmlFor="discount">Descuento</Label>
                  <Input id="discount" type="number" step="0.01" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })} className="bg-zinc-800 border-zinc-700" />
                </div>
                <div>
                  <Label htmlFor="payment_type">Tipo de Pago</Label>
                  <Select value={formData.payment_type} onValueChange={(val: any) => setFormData({ ...formData, payment_type: val })}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Efectivo</SelectItem>
                      <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="debit_card">Tarjeta de Débito</SelectItem>
                      <SelectItem value="transfer">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">{editingBill ? 'Actualizar' : 'Crear'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill) => (
          <div key={bill.id_key} className="glassmorphism rounded-lg p-4 hover:border-orange-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="font-bold">{bill.bill_number}</h3>
                  <p className="text-xs text-zinc-500">ID: {bill.id_key}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(bill)}><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => confirm('¿Eliminar?') && deleteMutation.mutate(bill.id_key)} className="text-rose-500"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-400"><Calendar className="h-4 w-4" />{new Date(bill.date).toLocaleDateString()}</div>
              <div className="flex items-center gap-2 text-emerald-400"><DollarSign className="h-4 w-4" /><span className="font-bold">${bill.total.toFixed(2)}</span></div>
              {bill.discount && bill.discount > 0 && <div className="text-xs text-yellow-500">Descuento: ${bill.discount.toFixed(2)}</div>}
              <div className="text-xs capitalize text-zinc-500">Pago: {bill.payment_type.replace('_', ' ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
