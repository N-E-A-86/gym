import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from './Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { day: 'Lun', volume: 85 },
  { day: 'Mar', volume: 92 },
  { day: 'Mié', volume: 78 },
  { day: 'Jue', volume: 95 },
  { day: 'Vie', volume: 88 },
  { day: 'Sáb', volume: 45 },
  { day: 'Dom', volume: 30 },
];

const metrics = [
  { label: 'Entrenamientos', value: '12', change: '+2 esta semana', icon: 'fitness_center', color: 'primary' },
  { label: 'Volumen Total', value: '48.5K', change: 'kg levantados', icon: 'scale', color: 'primary' },
  { label: 'Calidad Sueño', value: '7.5h', change: '+0.5h promedio', icon: 'bedtime', color: 'accent-amber' },
  { label: 'Streak', value: '8', change: 'días seguidos', icon: 'local_fire_department', color: 'accent-red' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            ¡Hola, Campeón!
          </h1>
          <p className="text-slate-400">
            Tienes <span className="text-primary font-medium">3 entrenamientos</span> pendientes esta semana.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-surface font-medium rounded-xl hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          Empezar Rutina
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ y: -2 }}
            className="bg-surface border border-white/5 rounded-xl p-4 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={cn(
                "material-symbols-outlined text-xl",
                metric.color === 'primary' ? 'text-primary' :
                metric.color === 'accent-amber' ? 'text-accent-amber' : 'text-accent-red'
              )}>
                {metric.icon}
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{metric.value}</p>
            <p className="text-xs text-slate-500">{metric.label}</p>
            <p className="text-[10px] text-slate-400 mt-1">{metric.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Actividad Semanal</h3>
              <p className="text-sm text-slate-500">Volumen de entrenamiento por día</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="size-2 rounded-full bg-primary"></span>
              Volumen (kg)
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    backgroundColor: '#141a21',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="volume" fill="#0de2f2" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Workout / AI Suggestion */}
        <div className="bg-surface border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h3 className="text-lg font-semibold">Rutina Sugerida</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">Próximo entrenamiento</p>
              <p className="text-lg font-semibold mb-2">Tren Superior - Push</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-slate-400">Pecho</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-slate-400">Hombros</span>
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-slate-400">Tríceps</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Ejercicios principales</p>
              <div className="space-y-2">
                <ExerciseRow name="Press Banca" sets="4" reps="8-10" />
                <ExerciseRow name="Press Militar" sets="3" reps="10-12" />
                <ExerciseRow name="Fondos" sets="3" reps="12-15" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">sparkles</span>
              Generar con IA
            </motion.button>
          </div>
        </div>
      </div>

      {/* Recent Progress */}
      <div className="bg-surface border border-white/5 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Progreso Reciente</h3>
          <button className="text-sm text-primary hover:underline">Ver todo</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProgressCard
            exercise="Press de Banca"
            current="92 kg"
            progress={75}
            trend="+4 kg"
          />
          <ProgressCard
            exercise="Sentadilla"
            current="120 kg"
            progress={82}
            trend="+8 kg"
          />
          <ProgressCard
            exercise="Peso Muerto"
            current="150 kg"
            progress={68}
            trend="+10 kg"
          />
        </div>
      </div>
    </div>
  );
}

function ExerciseRow({ name, sets, reps }: { name: string; sets: string; reps: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-300">{name}</span>
      <span className="text-xs text-slate-500">{sets} x {reps}</span>
    </div>
  );
}

function ProgressCard({ exercise, current, progress, trend }: {
  exercise: string;
  current: string;
  progress: number;
  trend: string;
}) {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 transition-colors">
      <p className="text-xs text-slate-500 mb-2">{exercise}</p>
      <div className="flex items-end justify-between mb-3">
        <span className="text-xl font-bold">{current}</span>
        <span className="text-xs text-emerald-400">{trend}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
