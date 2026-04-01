import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutineFormData, GeneratedRoutine } from '../types';
import { generateRoutine, saveRoutine, getSavedRoutines, deleteRoutine } from '../services/routineAI';
import { cn } from './Layout';

const objetivos = [
  { value: 'fuerza', label: 'Fuerza Máxima', icon: 'fitness_center', desc: 'Powerlifting y levantamiento pesado' },
  { value: 'hipertrofia', label: 'Hipertrofia', icon: 'sports_gymnastics', desc: 'Ganancia de masa muscular' },
  { value: 'perdida_peso', label: 'Pérdida de Grasa', icon: 'local_fire_department', desc: 'Definición y quema de calorías' },
  { value: 'resistencia', label: 'Resistencia', icon: 'timer', desc: 'Cardio y endurance muscular' },
];

const niveles = [
  { value: 'principiante', label: 'Principiante', desc: 'Menos de 6 meses' },
  { value: 'intermedio', label: 'Intermedio', desc: '6 meses a 2 años' },
  { value: 'avanzado', label: 'Avanzado', desc: 'Más de 2 años' },
];

const equipamientos = [
  { value: 'gym_completo', label: 'Gym Completo', desc: 'Máquinas, barras, mancuernas' },
  { value: 'basico', label: 'Equipamiento Básico', desc: 'Barra, mancuernas, banco' },
  { value: 'manubrios', label: 'Solo Mancuernas', desc: 'Entrenamiento con dumbbells' },
  { value: 'calistenia', label: 'Calistenia', desc: 'Solo peso corporal' },
];

export default function AIRoutineGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RoutineFormData>({
    objetivo: 'hipertrofia',
    nivel: 'intermedio',
    dias: 4,
    equipamiento: 'gym_completo',
    duracionSesion: 60,
    limitaciones: '',
  });
  const [loading, setLoading] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<GeneratedRoutine | null>(null);
  const [savedRoutines, setSavedRoutines] = useState<GeneratedRoutine[]>([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'generator' | 'saved'>('generator');

  useEffect(() => {
    setSavedRoutines(getSavedRoutines());
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const routine = await generateRoutine(formData);
      setGeneratedRoutine(routine);
      saveRoutine(routine);
      setSavedRoutines(getSavedRoutines());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    deleteRoutine(id);
    setSavedRoutines(getSavedRoutines());
    if (generatedRoutine?.id === id) {
      setGeneratedRoutine(null);
    }
  };

  const updateForm = (key: keyof RoutineFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h1 className="text-2xl font-bold">Rutinas con IA</h1>
          </div>
          <p className="text-slate-400">Genera rutinas personalizadas con inteligencia artificial</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === 'generator'
                ? "bg-primary text-surface"
                : "bg-surface text-slate-400 hover:text-white"
            )}
          >
            Generar Nueva
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === 'saved'
                ? "bg-primary text-surface"
                : "bg-surface text-slate-400 hover:text-white"
            )}
          >
            Mis Rutinas ({savedRoutines.length})
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'generator' ? (
          <motion.div
            key="generator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {!generatedRoutine ? (
              <>
                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={cn(
                        "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        step >= s
                          ? "bg-primary text-surface"
                          : "bg-surface text-slate-500 border border-white/10"
                      )}>
                        {s}
                      </div>
                      {s < 3 && (
                        <div className={cn(
                          "w-8 h-0.5",
                          step > s ? "bg-primary" : "bg-white/10"
                        )} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Objetivo y Nivel */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">¿Cuál es tu objetivo principal?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {objetivos.map((obj) => (
                          <button
                            key={obj.value}
                            onClick={() => updateForm('objetivo', obj.value)}
                            className={cn(
                              "p-4 rounded-xl border text-left transition-all duration-200",
                              formData.objetivo === obj.value
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-surface hover:border-white/20"
                            )}
                          >
                            <span className="material-symbols-outlined text-primary mb-2">{obj.icon}</span>
                            <p className="font-medium text-white">{obj.label}</p>
                            <p className="text-xs text-slate-400 mt-1">{obj.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">¿Cuál es tu nivel de experiencia?</label>
                      <div className="flex gap-3">
                        {niveles.map((nivel) => (
                          <button
                            key={nivel.value}
                            onClick={() => updateForm('nivel', nivel.value)}
                            className={cn(
                              "flex-1 p-4 rounded-xl border text-center transition-all duration-200",
                              formData.nivel === nivel.value
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-surface hover:border-white/20"
                            )}
                          >
                            <p className="font-medium text-white">{nivel.label}</p>
                            <p className="text-xs text-slate-400 mt-1">{nivel.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Días y Equipamiento */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">¿Cuántos días puedes entrenar? <span className="text-primary">{formData.dias} días</span></label>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={formData.dias}
                        onChange={(e) => updateForm('dias', parseInt(e.target.value))}
                        className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>2 días</span>
                        <span>6 días</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">¿Qué equipamiento tienes disponible?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {equipamientos.map((eq) => (
                          <button
                            key={eq.value}
                            onClick={() => updateForm('equipamiento', eq.value)}
                            className={cn(
                              "p-4 rounded-xl border text-left transition-all duration-200",
                              formData.equipamiento === eq.value
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-surface hover:border-white/20"
                            )}
                          >
                            <p className="font-medium text-white">{eq.label}</p>
                            <p className="text-xs text-slate-400 mt-1">{eq.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Duración y Limitaciones */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        Duración por sesión: <span className="text-primary">{formData.duracionSesion} minutos</span>
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        step="15"
                        value={formData.duracionSesion}
                        onChange={(e) => updateForm('duracionSesion', parseInt(e.target.value))}
                        className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>30 min</span>
                        <span>120 min</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        ¿Tienes alguna limitación o lesión? (opcional)
                      </label>
                      <textarea
                        value={formData.limitaciones}
                        onChange={(e) => updateForm('limitaciones', e.target.value)}
                        placeholder="Ej: Problemas de rodilla, espalda baja..."
                        className="w-full h-24 bg-surface border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="px-5 py-2.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Atrás
                  </button>

                  {step < 3 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      className="px-6 py-2.5 bg-primary text-surface font-medium rounded-xl hover:brightness-110 transition-all"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="px-6 py-2.5 bg-primary text-surface font-medium rounded-xl hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading && (
                        <span className="animate-spin material-symbols-outlined text-sm">refresh</span>
                      )}
                      {loading ? 'Generando...' : 'Generar Rutina'}
                    </button>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-accent-red/10 border border-accent-red/20 rounded-xl text-accent-red text-sm">
                    {error}
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{generatedRoutine.nombre}</h2>
                    <p className="text-slate-400">{generatedRoutine.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setGeneratedRoutine(null);
                        setStep(1);
                      }}
                      className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                    >
                      Nueva Rutina
                    </button>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className="px-4 py-2 bg-primary text-surface font-medium rounded-lg"
                    >
                      Ver Guardadas
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {generatedRoutine.dias.map((dia, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-surface border border-white/5 rounded-xl overflow-hidden"
                    >
                      <div className="px-5 py-3 bg-white/5 border-b border-white/5">
                        <h3 className="font-semibold">{dia.nombre}</h3>
                      </div>

                      <div className="divide-y divide-white/5">
                        {dia.ejercicios.map((ejercicio, ejIndex) => (
                          <div key={ejIndex} className="px-5 py-3 flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-white">{ejercicio.name || ejercicio.nombre}</p>
                              {(ejercicio.notas || ejercicio.notes) && (
                                <p className="text-xs text-slate-500 mt-1">{ejercicio.notas || ejercicio.notes}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <span className="bg-white/5 px-2 py-1 rounded">{ejercicio.sets} series</span>
                              <span className="bg-white/5 px-2 py-1 rounded">{ejercicio.reps} reps</span>
                              <span className="text-xs">{ejercicio.descanso}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {savedRoutines.length === 0 ? (
              <div className="text-center py-16 bg-surface border border-white/5 rounded-xl">
                <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">fitness_center</span>
                <p className="text-slate-400">No tienes rutinas guardadas aún</p>
                <button
                  onClick={() => setActiveTab('generator')}
                  className="mt-4 px-5 py-2 bg-primary text-surface font-medium rounded-lg"
                >
                  Generar primera rutina
                </button>
              </div>
            ) : (
              savedRoutines.map((routine) => (
                <motion.div
                  key={routine.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 bg-surface border border-white/5 rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{routine.nombre}</h3>
                      <p className="text-sm text-slate-400 mt-1">{routine.descripcion}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          {routine.dias.length} días
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">target</span>
                          {routine.objetivo}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">level</span>
                          {routine.nivel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGeneratedRoutine(routine)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                        title="Ver detalles"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button
                        onClick={() => handleDelete(routine.id)}
                        className="p-2 text-slate-400 hover:text-accent-red transition-colors"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
