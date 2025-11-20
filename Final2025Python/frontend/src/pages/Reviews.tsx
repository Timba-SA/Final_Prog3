import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService, productsService, clientsService } from '@/services/api';
import type { Review } from '@/types/api';
import { Star, Plus, Edit, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Reviews() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({ product_id: 0, client_id: 0, stars: 5, comment: '' });

  const { data: reviews = [], isLoading } = useQuery({ queryKey: ['reviews'], queryFn: reviewsService.getAll });
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: productsService.getAll });
  const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: clientsService.getAll });

  const createMutation = useMutation({
    mutationFn: reviewsService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['reviews'] }); setIsDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Review> }) => reviewsService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['reviews'] }); setIsDialogOpen(false); setEditingReview(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: reviewsService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id_key, data: formData });
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({ product_id: review.product_id, client_id: review.client_id, stars: review.stars, comment: review.comment || '' });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse">Cargando...</div></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Reseñas</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingReview(null)} className="bg-yellow-600 hover:bg-yellow-700"><Plus className="h-4 w-4 mr-2" /> Nueva Reseña</Button>
          </DialogTrigger>
          <DialogContent className="glassmorphism border-zinc-700">
            <DialogHeader><DialogTitle>{editingReview ? 'Editar Reseña' : 'Nueva Reseña'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="product_id">Producto</Label>
                <Select value={formData.product_id.toString()} onValueChange={(val) => setFormData({ ...formData, product_id: parseInt(val) })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                  <SelectContent>{products.map((p) => <SelectItem key={p.id_key} value={p.id_key.toString()}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="client_id">Cliente</Label>
                <Select value={formData.client_id.toString()} onValueChange={(val) => setFormData({ ...formData, client_id: parseInt(val) })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
                  <SelectContent>{clients.map((c) => <SelectItem key={c.id_key} value={c.id_key.toString()}>{c.name} {c.lastname}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stars">Estrellas (1-5)</Label>
                <Input id="stars" type="number" min="1" max="5" value={formData.stars} onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })} required className="bg-zinc-800 border-zinc-700" />
              </div>
              <div>
                <Label htmlFor="comment">Comentario</Label>
                <Textarea id="comment" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} className="bg-zinc-800 border-zinc-700" rows={3} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-yellow-600 hover:bg-yellow-700">{editingReview ? 'Actualizar' : 'Crear'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id_key} className="glassmorphism rounded-lg p-4 hover:border-yellow-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.stars ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-600'}`} />
                ))}
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(review)}><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => confirm('¿Eliminar?') && deleteMutation.mutate(review.id_key)} className="text-rose-500"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            {review.comment && (
              <div className="flex items-start gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-zinc-500 mt-1" />
                <p className="text-sm text-zinc-300">{review.comment}</p>
              </div>
            )}
            <div className="text-xs text-zinc-500">
              Producto ID: {review.product_id} | Cliente ID: {review.client_id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
