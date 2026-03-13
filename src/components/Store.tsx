import React, { useState } from 'react';
import { Product } from '../types';
import { initialProducts } from '../mockData';

export default function Store() {
  const [products] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>('todos');

  const filteredProducts = filter === 'todos'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">My Gym Store</h1>
          <p className="text-slate-500">Suplementación y equipamiento de élite para tu entrenamiento.</p>
        </div>
        <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['todos', 'suplementos', 'merch', 'vitaminas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${filter === cat ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-white/10">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                <span className="text-primary font-black text-xl">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-slate-600 uppercase">Stock: {product.stock} uds.</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
          <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">inventory_2</span>
          <p className="text-slate-500 font-medium">No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
