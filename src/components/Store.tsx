import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { initialProducts } from '../mockData';
import { cn } from './Layout';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'suplementos', label: 'Suplementos' },
  { id: 'merch', label: 'Merch' },
  { id: 'vitaminas', label: 'Vitaminas' },
];

export default function Store() {
  const [products] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>('todos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === 'todos'
    ? products
    : products.filter(p => p.category === filter);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // TODO: Integrate with Mercado Pago
    alert('Redirigiendo a Mercado Pago para completar la compra...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tienda</h1>
          <p className="text-slate-400">Suplementos y equipamiento para tu entrenamiento</p>
        </div>

        <button
          onClick={() => setShowCart(true)}
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-xl hover:border-primary/30 transition-colors relative"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="hidden sm:inline">Carrito</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 size-5 bg-primary text-surface text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              filter === cat.id
                ? "bg-primary text-surface"
                : "bg-surface text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -4 }}
            className="bg-surface border border-white/5 rounded-xl overflow-hidden group hover:border-primary/20 transition-colors"
          >
            <div className="aspect-square overflow-hidden relative bg-surface-raised">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded uppercase">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{product.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  Añadir
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-surface border border-white/5 rounded-xl">
          <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">inventory_2</span>
          <p className="text-slate-400">No hay productos en esta categoría</p>
        </div>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <h2 className="text-lg font-semibold">Tu Carrito</h2>
                  <span className="text-sm text-slate-400">({cartCount})</span>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">shopping_basket</span>
                    <p className="text-slate-400">Tu carrito está vacío</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="mt-4 text-primary hover:underline text-sm"
                    >
                      Continuar comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3 p-3 bg-surface-raised rounded-lg"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          <p className="text-primary text-sm font-medium">
                            ${item.product.price.toFixed(2)}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="size-6 flex items-center justify-center bg-surface rounded text-slate-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="size-6 flex items-center justify-center bg-surface rounded text-slate-400 hover:text-white"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto p-1 text-slate-500 hover:text-accent-red"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Total</span>
                    <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full py-3 bg-primary text-surface font-medium rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">payments</span>
                    Pagar con Mercado Pago
                  </motion.button>

                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full mt-2 py-2 text-slate-400 hover:text-white text-sm"
                  >
                    Seguir comprando
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
