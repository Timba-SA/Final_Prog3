import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/services/api';
import { CategoryForm } from '@/components/categories/CategoryForm';
import { Tag, Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Category } from '@/types/api';

export default function Categories() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
    staleTime: 60000,
  });

  // Create Category Mutation
  const createMutation = useMutation({
    mutationFn: categoriesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsFormOpen(false);
      alert('✅ Category created successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error creating category: ${error.message}`);
    },
  });

  // Update Category Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Category> }) =>
      categoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsFormOpen(false);
      setEditingCategory(null);
      alert('✅ Category updated successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error updating category: ${error.message}`);
    },
  });

  // Delete Category Mutation
  const deleteMutation = useMutation({
    mutationFn: categoriesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert('✅ Category deleted successfully!');
    },
    onError: (error: any) => {
      alert(`❌ Error deleting category: ${error.message}`);
    },
  });

  const handleCreateCategory = (data: any) => {
    createMutation.mutate(data);
  };

  const handleUpdateCategory = (data: any) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id_key, data });
    }
  };

  const handleDeleteCategory = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-emerald-500">
            <Tag className="h-12 w-12 mx-auto animate-spin" />
          </div>
          <p className="text-zinc-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Tag className="h-10 w-10 text-emerald-500" />
            Product Categories
          </h1>
          <p className="text-zinc-400 mt-2">
            Manage your product categories • {categories.length} total
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-500 cyber-glow"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-20">
          <Tag className="h-16 w-16 mx-auto text-zinc-600 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            No Categories Yet
          </h3>
          <p className="text-zinc-500 mb-6">
            Create your first product category to get started.
          </p>
          <Button
            onClick={handleOpenCreate}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 cyber-glow"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create First Category
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id_key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card className="glassmorphism transition-all duration-300 hover:scale-105 hover:border-emerald-500/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-emerald-500" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditCategory(category)}
                        className="h-8 w-8 p-0 hover:bg-emerald-600 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleDeleteCategory(category.id_key, category.name)
                        }
                        className="h-8 w-8 p-0 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Category ID</span>
                      <Badge variant="outline" className="font-mono">
                        #{category.id_key}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Created</span>
                      <span className="font-mono">
                        {new Date(category.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Category Form Dialog */}
      <CategoryForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSubmit={
          editingCategory ? handleUpdateCategory : handleCreateCategory
        }
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
