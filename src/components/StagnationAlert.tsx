import React from 'react';
import { motion } from 'motion/react';
import { cn } from './Layout';

export default function StagnationAlert({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-8 p-10 rounded-[3rem] glass-raised border-primary/20 shadow-2xl mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-64 bg-accent-red/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-accent-red">
            <span className="material-symbols-outlined text-3xl animate-pulse">emergency_home</span>
            <span className="uppercase tracking-[0.4em] text-[10px] font-black">Protocolo de Emergencia Neural</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            Estado de <span className="text-accent-red">Estancamiento</span>
          </h1>
        </div>
        <div className="px-6 py-2.5 rounded-2xl bg-accent-red/10 text-accent-red text-[11px] font-black border border-accent-red/20 uppercase tracking-widest">
          Probabilidad de Fatiga: 92%
        </div>
      </div>

      <p className="text-slate-400 text-lg max-w-4xl leading-relaxed font-medium relative z-10">
        Se han detectado <span className="text-white font-bold">3 microciclos sin progresión lineal</span>. Tus biométricos indican una saturación de receptores androgénicos y fatiga en la unión neuromuscular. Se recomienda intervención inmediata.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 relative z-10">
        <StrategyCard
          title="Neural Deload"
          desc="Reducción del 50% de intensidad. Reajuste de neurotransmisores."
          icon="psychology"
        />
        <StrategyCard
          title="Biomechanical Swap"
          desc="Rotación de vectores de fuerza para nuevos estímulos adaptativos."
          icon="rebase_edit"
        />
        <StrategyCard
          title="Metabolic Shift"
          desc="Transición a bloque de densidad (15+ reps) para capilarización muscular."
          icon="recycled_fire_truck"
        />
      </div>

      <div className="flex flex-wrap justify-end gap-6 mt-8 relative z-10">
        <button onClick={onClose} className="px-8 py-4 text-slate-500 font-black uppercase text-[11px] tracking-widest hover:text-white transition-colors">Ignorar Advertencia</button>
        <button onClick={onClose} className="px-12 py-4 bg-accent-red text-white font-black rounded-2xl hover:bg-accent-red/80 shadow-[0_10px_30px_-5px_rgba(239,68,68,0.4)] transition-all uppercase text-[11px] tracking-widest">Compensar Sistema</button>
      </div>
    </div>
  );
}

function StrategyCard({ title, desc, icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col gap-5 p-7 rounded-[2rem] glass border-white/5 hover:border-primary/30 transition-all cursor-pointer shadow-xl"
    >
      <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-2xl">{icon}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-lg font-black italic uppercase group-hover:text-primary transition-colors tracking-tight">{title}</h3>
        <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
      </div>
      <button className="mt-2 w-full py-3 bg-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl group-hover:bg-primary group-hover:text-background-dark transition-all">Seleccionar</button>
    </motion.div>
  );
}
