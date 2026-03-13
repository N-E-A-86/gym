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
    { id: 'dashboard', label: 'Dashboard', icon: 'bar_chart' },
    { id: 'architect', label: 'Programas', icon: 'format_list_bulleted' },
    { id: 'history', label: 'Historial', icon: 'history' },
    { id: 'onboarding', label: 'Biometría', icon: 'body_system' },
    { id: 'store', label: 'Tienda Merch', icon: 'shopping_bag' },
    { id: 'chat', label: 'Coach IA', icon: 'smart_toy' },
  ];

  const adminItems = [
    { id: 'admin', label: 'Admin Gym', icon: 'admin_panel_settings' },
  ];

  return (
    <div className="relative flex h-screen overflow-hidden bg-background-dark text-slate-100 font-display">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 bg-grain opacity-[0.03] pointer-events-none z-50" />
      <div className="fixed -top-24 -left-24 size-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 size-96 bg-accent-amber/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating HUD Sidebar */}
      <aside className="w-72 p-6 h-full hidden lg:flex flex-col relative z-20">
        <div className="glass-raised rounded-[2.5rem] h-full flex flex-col overflow-hidden">
          <div className="p-8 flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-primary/20 p-2.5 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(13,226,242,0.2)]"
            >
              <span className="material-symbols-outlined text-primary text-2xl">exercise</span>
            </motion.div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tighter text-slate-100 flex items-center gap-1.5">
                My <span className="text-primary italic font-black">Gym</span>
              </h2>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">V-2.4 Precision</span>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={cn(
                  "group relative w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden",
                  currentScreen === item.id
                    ? "text-primary font-bold bg-primary/10 border border-primary/20 shadow-[inset_0_1px_10px_rgba(13,226,242,0.05)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {currentScreen === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(13,226,242,1)]"
                  />
                )}
                <span className={cn(
                  "material-symbols-outlined transition-transform duration-300 group-hover:scale-110",
                  currentScreen === item.id ? "text-primary" : "text-slate-500"
                )}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            ))}

            <div className="pt-6 pb-3 ml-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Gestión Lab</p>
            </div>

            {adminItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={cn(
                  "group w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300",
                  currentScreen === item.id
                    ? "text-primary font-bold bg-primary/10 border border-primary/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <span className={cn(
                  "material-symbols-outlined",
                  currentScreen === item.id ? "text-primary" : "text-slate-500"
                )}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 mt-auto">
            <div className="glass p-4 rounded-3xl flex items-center gap-4 border border-white/5 hover:border-primary/20 transition-all group">
              <div className="relative">
                <img
                  alt="Avatar"
                  className="size-11 rounded-2xl object-cover border border-white/10 group-hover:border-primary/50 transition-colors"
                  src="https://picsum.photos/seed/athlete/100/100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 size-3.5 bg-emerald-500 border-2 border-background-dark rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate">Alex Guerrero</span>
                <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest">Nivel Élite v.4</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                className="ml-auto p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">settings</span>
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 p-6 lg:pl-0">
        <header className="h-24 flex items-center justify-between px-8 mb-4">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Central Neural Command</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">{currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}</span>
              <span className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(13,226,242,1)]"></span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 focus-within:border-primary/30 rounded-2xl px-5 py-2.5 w-80 transition-all glass">
              <span className="material-symbols-outlined text-slate-500 text-lg">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-600 text-slate-200 ml-3"
                placeholder="Escaneo de parámetros..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="size-12 flex items-center justify-center rounded-2xl glass hover:border-primary/50 transition-all text-slate-400 hover:text-primary relative group">
                <span className="material-symbols-outlined group-hover:animate-pulse">notifications</span>
                <span className="absolute top-3 right-3 size-2 bg-accent-red rounded-full ring-4 ring-background-dark"></span>
              </button>

              <button className="bg-primary hover:bg-primary/80 text-background-dark font-black py-3 px-8 rounded-2xl flex items-center gap-3 transition-all shadow-[0_8px_25px_-5px_rgba(13,226,242,0.4)] hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 uppercase text-[11px] tracking-widest">
                <span className="material-symbols-outlined font-bold text-lg">sync</span>
                Sincronizar
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar rounded-[3rem] glass p-10 border border-white/5 shadow-2xl relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
