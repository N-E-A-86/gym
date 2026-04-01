import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  onScreenChange: (screen: any) => void;
}

export default function Layout({ children, currentScreen, onScreenChange }: LayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: 'home' },
    { id: 'routines', label: 'Rutinas IA', icon: 'auto_awesome', highlight: true },
    { id: 'architect', label: 'Mi Programa', icon: 'fitness_center' },
    { id: 'history', label: 'Historial', icon: 'history' },
    { id: 'membership', label: 'Membresía', icon: 'card_membership' },
    { id: 'store', label: 'Tienda', icon: 'shopping_bag' },
    { id: 'chat', label: 'Coach', icon: 'chat' },
  ];

  const adminItems = [
    { id: 'admin', label: 'Admin', icon: 'settings' },
  ];

  const allItems = [...navItems, ...adminItems];
  const activeItem = allItems.find(item => item.id === currentScreen);
  const screenTitle = activeItem ? activeItem.label : currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1);

  return (
    <div className="relative flex h-screen overflow-hidden bg-background-dark text-slate-100 font-display">
      {/* Clean Sidebar */}
      <aside className="w-64 p-4 h-full hidden lg:flex flex-col relative z-20 bg-surface border-r border-white/5">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">exercise</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight text-slate-100">
              My <span className="text-primary font-semibold">Gym</span>
            </h2>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm",
                currentScreen === item.id
                  ? "bg-primary/10 text-primary font-medium border border-primary/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
                item.highlight && currentScreen !== item.id && "text-primary/80"
              )}
            >
              <span className={cn(
                "material-symbols-outlined text-lg",
                currentScreen === item.id ? "text-primary" : "text-slate-500"
              )}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.highlight && (
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                  IA
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Gestión</p>
          </div>

          {adminItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm",
                currentScreen === item.id
                  ? "bg-primary/10 text-primary font-medium border border-primary/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <span className={cn(
                "material-symbols-outlined text-lg",
                currentScreen === item.id ? "text-primary" : "text-slate-500"
              )}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
            <img
              alt="Avatar"
              className="size-10 rounded-xl object-cover border border-white/10"
              src="https://picsum.photos/seed/athlete/100/100"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium truncate">Usuario</span>
              <span className="text-[10px] text-primary/80">Nivel Élite</span>
            </div>
            <button className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Simplified Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-surface/30">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{screenTitle}</span>
            {activeItem?.highlight && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                POWERED BY AI
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-primary relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-accent-red rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
