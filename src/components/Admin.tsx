import React, { useState } from 'react';
import { Product } from '../types';
import { initialProducts } from '../mockData';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: any = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category'),
      stock: parseInt(formData.get('stock') as string),
      image: formData.get('image') || 'https://picsum.photos/seed/product/400/400',
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }
    setEditingProduct(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Panel de Administración</h1>
          <p className="text-slate-500">Gestión de inventario y productos de la tienda.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Nuevo Producto
        </button>
      </div>

      {(isAdding || editingProduct) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold mb-6">{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Nombre</label>
              <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Categoría</label>
              <select name="category" defaultValue={editingProduct?.category} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary">
                <option value="suplementos">Suplementos</option>
                <option value="merch">Merch</option>
                <option value="vitaminas">Vitaminas</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Precio ($)</label>
              <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Stock</label>
              <input name="stock" type="number" defaultValue={editingProduct?.stock} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Descripción</label>
              <textarea name="description" defaultValue={editingProduct?.description} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary h-24" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">URL de Imagen</label>
              <input name="image" defaultValue={editingProduct?.image} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => { setEditingProduct(null); setIsAdding(false); }} className="px-6 py-2 text-slate-400 font-bold hover:text-white transition-colors">Cancelar</button>
              <button type="submit" className="px-8 py-2 bg-primary text-white font-bold rounded-lg hover:brightness-110">Guardar Cambios</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="size-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-400 uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-primary">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-500' : 'text-slate-300'}`}>
                    {product.stock} uds.
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingProduct(product)} className="p-2 text-slate-500 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
