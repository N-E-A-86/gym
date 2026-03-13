import React from 'react';

const sessions = [
  {
    id: '1',
    name: 'Pull Day - Hipertrofia',
    date: '12 Oct, 2023',
    duration: '75 min',
    tonnage: '12,450 kg',
    sets: '18 / 20',
    rpe: '8.2',
    junk: '2 sets',
    score: '94/100',
    status: 'Sobrecarga Exitosa',
    exercises: [
      { name: 'Peso Muerto', result: '+5kg PR' },
      { name: 'Dominadas Lastre', result: '12 reps max' },
      { name: 'Remo en Punta', result: '100kg x 8' },
    ]
  },
  {
    id: '2',
    name: 'Push Day - Fuerza',
    date: '10 Oct, 2023',
    duration: '90 min',
    tonnage: '8,920 kg',
    sets: '12 / 18',
    rpe: '9.5',
    junk: '6 sets',
    score: '72/100',
    status: 'Fatiga Acumulada',
    exercises: [
      { name: 'Press de Banca', result: '-2.5kg' },
      { name: 'Press Militar', result: 'Mantener' },
      { name: 'Fondos Pecho', result: 'Fallo técnico' },
    ]
  }
];

export default function WorkoutHistory() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Archivo de Sesiones</h1>
          <p className="text-slate-500 mt-1">Análisis detallado de sobrecarga progresiva y volumen efectivo.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-primary rounded-lg font-bold text-sm hover:bg-slate-700 transition-all">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Nueva Sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tonelaje Total (Mes)" value="142.5k kg" trend="+12% vs sept" />
        <StatCard label="Volumen Efectivo Avg" value="84%" progress={84} />
        <StatCard label="Promedio RPE / RIR" value="8.5 / 1.5" sub="Intensidad Óptima" />
        <StatCard label="Junk Volume" value="12%" sub="Reducir sets accesorios" danger />
      </div>

      <div className="flex flex-col gap-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-primary/50 transition-all group">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{session.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-slate-500 text-sm">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> {session.date}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {session.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">FLEX Score: {session.score}</span>
                    <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">{session.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <MiniMetric label="Tonelaje" value={session.tonnage} />
                  <MiniMetric label="Sets Efectivos" value={session.sets} />
                  <MiniMetric label="RPE Promedio" value={session.rpe} />
                  <MiniMetric label="Vol. Basura" value={session.junk} success={parseInt(session.junk) < 3} />
                </div>
              </div>
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Top Ejercicios</p>
                <ul className="space-y-3">
                  {session.exercises.map((ex, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{ex.name}</span>
                      <span className={`text-xs font-bold ${ex.result.includes('+') ? 'text-primary' : 'text-slate-500'}`}>{ex.result}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 py-2 border border-primary/30 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                  Ver Detalle Completo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, progress, sub, danger }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
      <h3 className={`text-2xl font-black ${danger ? 'text-red-500' : 'text-primary'}`}>{value}</h3>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs font-bold">
          <span className="material-symbols-outlined text-xs">trending_up</span> {trend}
        </div>
      )}
      {progress !== undefined && (
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-primary h-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {sub && <p className="text-slate-500 text-xs mt-2">{sub}</p>}
    </div>
  );
}

function MiniMetric({ label, value, success }: any) {
  return (
    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">{label}</p>
      <p className={`text-lg font-black ${success ? 'text-emerald-500' : ''}`}>{value}</p>
    </div>
  );
}
