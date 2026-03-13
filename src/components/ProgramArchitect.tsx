import React from 'react';

const exercises = [
  { id: '1', name: 'Press de Banca', muscle: 'Pecho / Empuje' },
  { id: '2', name: 'Sentadilla Libre', muscle: 'Pierna / Dominante Rodilla' },
  { id: '3', name: 'Peso Muerto Rumano', muscle: 'Pierna / Dominante Cadera' },
  { id: '4', name: 'Dominadas', muscle: 'Espalda / Tracción Vertical' },
];

export default function ProgramArchitect() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight uppercase">Arquitecto de Programas</h2>
          <p className="text-slate-500 max-w-2xl text-lg">
            Diseña rutinas de alto rendimiento basadas en <span className="text-primary font-bold">Sobrecarga Progresiva</span> y el sistema de intensidad <span className="italic">FLEX</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge value="12" label="Semanas" />
          <Badge value="PPL" label="Split" />
          <Badge value="A+" label="Intensidad" primary />
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-6">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">library_add</span>
              Biblioteca de Ejercicios
            </h3>
            <div className="space-y-3">
              {exercises.map((ex) => (
                <div key={ex.id} className="bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-move hover:border-primary transition-colors flex items-center gap-3 group">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">drag_indicator</span>
                  <div>
                    <p className="text-sm font-bold">{ex.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{ex.muscle}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
              Ver todos los ejercicios
            </button>
          </div>
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">bolt</span>
              Sugerencia IA
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Basado en tu split actual, te sugerimos añadir un ejercicio de <span className="font-bold text-slate-100">Deltoides Lateral</span> para balancear el volumen semanal.
            </p>
          </div>
        </div>

        <div className="col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Sesión A: Empuje Primario</h3>
              <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Alta Prioridad</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">copy_all</span>
              </button>
              <button className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/20 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <ExerciseRow 
              name="1. Press de Banca con Barra" 
              muscle="Pecho" 
              flex="All-Out" 
              series={4} 
              reps="5 - 8" 
              rest="180s" 
              load="85% 1RM" 
              notes="Última serie hasta el fallo técnico absoluto. Mantener retracción escapular."
              type="danger"
            />
            <ExerciseRow 
              name="2. Press Militar con Mancuernas" 
              muscle="Hombros" 
              flex="Aggressive" 
              series={3} 
              reps="10 - 12" 
              rest="90s" 
              load="70% 1RM" 
              notes="RPE 8-9. Controlar excéntrica por 2 segundos."
              type="warning"
            />
            <button className="w-full border-2 border-dashed border-slate-800 rounded-xl py-8 flex flex-col items-center gap-2 text-slate-500 hover:text-primary hover:border-primary/50 transition-all hover:bg-primary/5 group">
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_circle</span>
              <span className="text-sm font-bold">Arrastra un ejercicio o haz clic aquí</span>
            </button>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 grid grid-cols-4 gap-4">
            <SummaryStat label="Volumen Total" value="12,450 kg" />
            <SummaryStat label="Series Efectivas" value="18" />
            <SummaryStat label="Dominancia Muscular" value="Pecho" progress={65} />
            <SummaryStat label="Tiempo Estimado" value="65 min" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ value, label, primary }: any) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col items-center min-w-[100px] ${primary ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-900 border-slate-800 text-white'}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className={`text-[10px] uppercase font-bold tracking-tighter ${primary ? 'text-primary' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}

function ExerciseRow({ name, muscle, flex, series, reps, rest, load, notes, type }: any) {
  const borderClass = type === 'danger' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-orange-500';
  const flexClass = type === 'danger' ? 'text-red-500' : 'text-orange-500';

  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden ${borderClass}`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined">fitness_center</span>
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <div className="flex gap-2 mt-0.5">
              <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-800 rounded">{muscle}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 bg-slate-800 rounded uppercase ${flexClass}`}>FLEX: {flex}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <StatMini label="Series" value={series} />
          <StatMini label="Rango Reps" value={reps} />
          <StatMini label="Descanso" value={rest} />
          <button className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      <div className="px-4 py-3 bg-slate-900/30 flex items-center gap-6">
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Notas de Intensidad FLEX</label>
          <p className="text-sm text-slate-400 italic">{notes}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Carga %:</span>
          <span className="font-bold text-primary">{load}</span>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value }: any) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-slate-500 font-bold uppercase">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function SummaryStat({ label, value, progress }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-500 uppercase">{label}</p>
      {progress !== undefined ? (
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs font-bold">{value}</span>
        </div>
      ) : (
        <p className="text-xl font-bold">{value}</p>
      )}
    </div>
  );
}
