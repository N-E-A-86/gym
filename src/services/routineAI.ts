import { GoogleGenAI } from "@google/genai";
import { RoutineFormData, GeneratedRoutine } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const objtivoLabels: Record<string, string> = {
  fuerza: "fuerza máxima y powerlifting",
  hipertrofia: "hipertrofia muscular y masa",
  perdida_peso: "pérdida de grasa y definición",
  resistencia: "resistencia muscular y cardiovascular"
};

const nivelLabels: Record<string, string> = {
  principiante: "principiante (menos de 6 meses entrenando)",
  intermedio: "intermedio (6 meses a 2 años)",
  avanzado: "avanzado (más de 2 años)"
};

const equipamientoLabels: Record<string, string> = {
  gym_completo: "gimnasio completo con máquinas y libres",
  basico: "equipamiento básico (barra, mancuernas, banco)",
  calistenia: "solo peso corporal y calistenia",
  manubrios: "solo mancuernas"
};

export const generateRoutine = async (data: RoutineFormData): Promise<GeneratedRoutine> => {
  if (!ai) {
    throw new Error("API Key de Gemini no configurada. Configura VITE_GEMINI_API_KEY en el archivo .env");
  }

  const prompt = `Eres un entrenador experto con 10 años de experiencia. Genera una rutina de entrenamiento semanal completa y detallada.

DATOS DEL USUARIO:
- Objetivo: ${objtivoLabels[data.objetivo]}
- Nivel: ${nivelLabels[data.nivel]}
- Días disponibles: ${data.dias} días por semana
- Equipamiento disponible: ${equipamientoLabels[data.equipamiento]}
- Duración por sesión: ${data.duracionSesion} minutos
${data.limitaciones ? `- Limitaciones/lesiones: ${data.limitaciones}` : ''}

REQUISITOS:
1. Cada día debe tener 4-6 ejercicios específicos
2. Incluye calentamiento sugerido
3. Progresión apropiada para el nivel
4. Distribución inteligente según los días disponibles
5. Considera el equipamiento disponible

Responde ÚNICAMENTE en formato JSON con esta estructura exacta:
{
  "nombre": "nombre creativo de la rutina",
  "descripcion": "breve descripción de 2-3 oraciones sobre el enfoque",
  "dias": [
    {
      "nombre": "nombre del día (ej: Día 1 - Pecho y Tríceps)",
      "ejercicios": [
        {
          "name": "nombre del ejercicio",
          "sets": número,
          "reps": "rango o número",
          "descanso": "tiempo de descanso",
          "notas": "notas técnicas opcionales"
        }
      ]
    }
  ]
}`;

  try {
    // Usando gemini-2-flash para más cuota disponible
    const response = await ai.models.generateContent({
      model: "gemini-2-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("La respuesta de Gemini está vacía");
    }

    const parsed = JSON.parse(text);

    const routine: GeneratedRoutine = {
      id: `routine_${Date.now()}`,
      nombre: parsed.nombre || "Rutina Personalizada",
      descripcion: parsed.descripcion || "Rutina generada por IA",
      dias: parsed.dias || [],
      createdAt: new Date().toISOString(),
      objetivo: data.objetivo,
      nivel: data.nivel
    };

    return routine;
  } catch (error: any) {
    console.error("Error generando rutina:", error);

    // Manejo específico para error de cuota
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("quota")) {
      throw new Error("Has alcanzado el límite de solicitudes de la API gratuita. Por favor, espera un momento antes de intentar de nuevo.");
    }

    throw new Error("No se pudo generar la rutina. Intenta de nuevo.");
  }
};

export const saveRoutine = (routine: GeneratedRoutine): void => {
  const existing = getSavedRoutines();
  const updated = [routine, ...existing];
  localStorage.setItem('gym_routines', JSON.stringify(updated));
};

export const getSavedRoutines = (): GeneratedRoutine[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('gym_routines');
  return saved ? JSON.parse(saved) : [];
};

export const deleteRoutine = (id: string): void => {
  const existing = getSavedRoutines();
  const filtered = existing.filter(r => r.id !== id);
  localStorage.setItem('gym_routines', JSON.stringify(filtered));
};
