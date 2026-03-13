import React, { useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight">Evaluación de Perfil Biológico</h2>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30">
              Fase 01: Onboarding
            </span>
          </div>
          <p className="text-slate-400 text-lg">Módulo de detección de biomarcadores de estilo de vida y capacidad adaptativa.</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest">Progreso de la Evaluación</p>
              <p className="text-white text-lg font-medium">Estilo de Vida y Biometría</p>
            </div>
            <p className="text-white text-2xl font-black">35%</p>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <h3 className="text-white text-xl font-bold">Nivel de Adaptación al Esfuerzo</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-400 text-sm mb-4">Seleccione el rango que mejor describa su historial de entrenamiento de fuerza sistemático.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OptionCard title="Principiante" desc="0-6 meses. Sin base técnica sólida." name="exp" />
              <OptionCard title="Intermedio" desc="6-24 meses. Dominio técnico básico." name="exp" checked />
              <OptionCard title="Avanzado" desc="2-5 años. Periodización aplicada." name="exp" />
              <OptionCard title="Élite" desc="5+ años. Optimización competitiva." name="exp" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">respiratory_rate</span>
              <h3 className="text-white text-xl font-bold">Tamizaje de Salud Cardiorrespiratoria</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-primary/10 border-l-4 border-primary p-4">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "Este dato es crítico para determinar el riesgo de deserción y ajustar la capacidad de recuperación intratraining."
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm font-medium">¿Cuál es su historial actual de consumo de tabaco/nicotina?</p>
              <div className="space-y-3">
                <RadioItem label="Nunca he fumado" name="smoke" />
                <RadioItem label="Ex-fumador (hace más de 12 meses)" name="smoke" />
                <RadioItem label="Fumador ocasional / Vapeo" name="smoke" />
                <RadioItem label="Fumador habitual (+10 cigarrillos/día)" name="smoke" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button className="flex items-center gap-2 px-6 h-12 rounded-lg bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Anterior
        </button>
        <div className="flex items-center gap-4">
          <p className="text-slate-500 text-xs hidden sm:block italic font-medium">Autoguardado hace 2 seg.</p>
          <button className="flex items-center gap-2 min-w-[160px] justify-center px-8 h-12 rounded-lg bg-primary text-white text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(43,108,238,0.3)] transition-all">
            Siguiente
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

function OptionCard({ title, desc, name, checked }: any) {
  return (
    <label className="relative flex items-center gap-4 rounded-xl border border-slate-800 p-4 hover:bg-primary/5 hover:border-primary/50 cursor-pointer transition-all group">
      <input 
        type="radio" 
        name={name} 
        defaultChecked={checked}
        className="h-5 w-5 border-2 border-slate-700 bg-transparent text-primary checked:border-primary checked:bg-primary focus:outline-none focus:ring-0" 
      />
      <div className="flex flex-col">
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-slate-400 text-xs">{desc}</p>
      </div>
    </label>
  );
}

function RadioItem({ label, name }: any) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors cursor-pointer">
      <input 
        type="radio" 
        name={name} 
        className="h-4 w-4 border-2 border-slate-700 bg-transparent text-primary checked:border-primary checked:bg-primary focus:outline-none focus:ring-0" 
      />
      <span className="text-sm text-slate-200">{label}</span>
    </label>
  );
}
