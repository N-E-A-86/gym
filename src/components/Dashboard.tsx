import React, { useState } from 'react';
import StagnationAlert from './StagnationAlert';
import { motion } from 'motion/react';
import { cn } from './Layout';
import BioCore3D from './BioCore3D';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const overloadData = [
  { name: 'Sem 1', carga: 2100, fatiga: 1800 },
  { name: 'Sem 2', carga: 2300, fatiga: 1900 },
  { name: 'Sem 3', carga: 2250, fatiga: 2000 },
  { name: 'Sem 4', carga: 2500, fatiga: 2100 },
  { name: 'Sem 5', carga: 2700, fatiga: 2200 },
  { name: 'Sem 6', carga: 2650, fatiga: 2300 },
  { name: 'Sem 7', carga: 2900, fatiga: 2400 },
];

const sleepData = [
  { name: 'L', valor: 60 },
  { name: 'M', valor: 40 },
  { name: 'M', valor: 80 },
  { name: 'J', valor: 65 },
  { name: 'V', valor: 30 },
  { name: 'S', valor: 90 },
  { name: 'D', valor: 75 },
];

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="space-y-12">
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-50"
        >
          <StagnationAlert onClose={() => setShowAlert(false)} />
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-l-4 border-primary/40 pl-8 py-2">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-3 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase italic">
            Bio-Metrics <span className="text-primary not-italic">Engine</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">
            Sincronización de parámetros fisiológicos v.4.02.19
          </p>
        </div>

        <div className="flex items-center gap-6 glass-raised p-5 rounded-[2rem] border-white/5 glow-primary relative overflow-visible">
          <div className="flex flex-col z-10">
            <span className="text-[10px] text-primary uppercase font-black tracking-[0.2em] mb-1">Status de Tejido</span>
            <span className="text-xl font-black text-white italic">Fase Supercompensación</span>
          </div>
          <div className="h-12 w-[1px] bg-white/10 mx-2 z-10"></div>
          <div className="size-24 -my-4 relative z-0 flex items-center justify-center">
            <BioCore3D />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-1">
              <span className="text-[11px] font-black pointer-events-none">88%</span>
            </div>
          </div>
        </div>
      </div>


      {/* Specimen KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Fatiga Sistémica" value="Moderada" trend="down" change="-5% cortisol" icon="biotech" status="warning" />
        <MetricCard title="Calidad Contráctil" value="85%" trend="up" change="+12% torque" icon="bolt" status="success" />
        <MetricCard title="HRV (Variabilidad)" value="72 ms" trend="up" change="+2% base" icon="monitoring" status="info" />
        <MetricCard title="Ciclo Circadiano" value="8.2 / 10" trend="down" change="-0.4 sueño" icon="bedtime" status="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Load & Fatigue Lab */}
        <div className="lg:col-span-2 glass p-10 rounded-[3rem] liquid-crystal border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Carga vs. Estrés</h3>
              <p className="text-sm text-slate-500 font-medium">Análisis de sobrecarga aguda/crónica (ACWR)</p>
            </div>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest bg-white/5 py-3 px-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(13,226,242,0.5)]"></span>
                <span className="text-slate-300">Intensidad</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-accent-amber shadow-[0_0_8px_rgba(242,160,13,0.5)]"></span>
                <span className="text-slate-300">Inflamación</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overloadData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="#1e293b" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} fontStyle="italic" />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#0b0f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Bar dataKey="carga" fill="#0de2f2" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="fatiga" fill="#f2a00d" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neural 1RM Projection */}
        <div className="glass p-10 rounded-[3rem] border-white/5 inner-glow relative group">
          <div className="absolute top-8 right-8 animate-pulse">
            <span className="material-symbols-outlined text-primary/40">radar</span>
          </div>
          <h3 className="text-2xl font-black italic uppercase mb-8">1RM Virtual</h3>
          <div className="space-y-8">
            <ProgressItem label="Back Squat" value={145} unit="KG" progress={75} trend="+2.5kg" />
            <ProgressItem label="Bench Press" value={92} unit="KG" progress={60} trend="Estable" />
            <ProgressItem label="Deadlift" value={180} unit="KG" progress={88} trend="+5.0kg" />
          </div>
          <div className="mt-12 p-5 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm">settings_input_antenna</span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                "Incremento del <span className="text-primary font-bold">4.2%</span> proyectado. Adaptación neural óptima. Recomendación: Mantener volumen RPE 8."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Volume Density */}
        <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 size-48 bg-primary/5 blur-[80px] -mr-24 -mt-24"></div>
          <h3 className="text-2xl font-black italic uppercase mb-8">Densidad de Trabajo</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overloadData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0de2f2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0de2f2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="carga" stroke="#0de2f2" fillOpacity={1} fill="url(#colorVol)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <StatMini label="Eficacia" value="92%" />
            <StatMini label="RPE Avg" value="8.2" />
            <StatMini label="Tempo" value="3-0-1" />
          </div>
        </div>

        {/* Cortisol/Sleep Matrix */}
        <div className="glass p-10 rounded-[3rem] border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black italic uppercase">Matrix de Sueño</h3>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-lg border border-indigo-500/20">Alpha State</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                <Bar dataKey="valor" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="size-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-400 text-lg">psychology</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Niveles de cortisol matutino estables. La fase REM ha mejorado un <span className="text-white">12%</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon, status }: any) {
  const statusColors: any = {
    warning: 'from-accent-amber/20 to-transparent text-accent-amber border-accent-amber/30',
    success: 'from-emerald-500/20 to-transparent text-emerald-400 border-emerald-500/30',
    info: 'from-primary/20 to-transparent text-primary border-primary/30',
    indigo: 'from-indigo-500/20 to-transparent text-indigo-400 border-indigo-500/30',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group transition-all duration-500",
        "bg-gradient-to-br",
        statusColors[status].split(' ')[0],
        statusColors[status].split(' ')[1]
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
        <div className={cn("size-10 rounded-2xl flex items-center justify-center glass border-white/10 group-hover:scale-110 transition-transform", statusColors[status].split(' ')[2])}>
          <span className="material-symbols-outlined !text-xl">{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-black italic tracking-tighter mb-2">{value}</p>
      <div className="flex items-center gap-2">
        <span className={cn(
          "material-symbols-outlined text-sm font-bold",
          trend === 'up' ? 'text-emerald-400' : 'text-accent-amber'
        )}>
          {trend === 'up' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'}
        </span>
        <p className={cn(
          "text-[10px] font-black uppercase tracking-wider",
          trend === 'up' ? 'text-emerald-400' : 'text-accent-amber'
        )}>{change}</p>
      </div>
    </motion.div>
  );
}

function ProgressItem({ label, value, unit, progress, trend }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[.25em]">{label}</span>
        <span className="text-2xl font-black text-white italic">{value} <small className="text-[10px] font-black text-primary uppercase ml-1 tracking-widest">{unit}</small></span>
      </div>
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-primary to-primary/40 rounded-full shadow-[0_0_10px_rgba(13,226,242,0.3)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className={cn("size-1.5 rounded-full", trend.includes('+') ? 'bg-emerald-500' : 'bg-slate-600')}></div>
        <p className={cn("text-[10px] font-black uppercase tracking-widest", trend.includes('+') ? 'text-emerald-500' : 'text-slate-600')}>{trend}</p>
      </div>
    </div>
  );
}

function StatMini({ label, value }: any) {
  return (
    <div className="glass p-4 rounded-2xl border-white/5 text-center hover:border-primary/30 transition-colors group">
      <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1 group-hover:text-primary transition-colors">{label}</p>
      <p className="text-lg font-black italic">{value}</p>
    </div>
  );
}
