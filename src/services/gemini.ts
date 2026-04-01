import { GoogleGenAI, Type } from "@google/genai";

// Para Vite (frontend): usa variables que empiecen con VITE_
// Para Node.js: usa GEMINI_API_KEY directamente
const apiKey = import.meta.env.VITE_GEMINI_API_KEY ||
               import.meta.env.GEMINI_API_KEY ||
               process.env.GEMINI_API_KEY;

// Si no hay API key, el SDK intentará leer GEMINI_API_KEY del environment
const ai = new GoogleGenAI({ ...(apiKey && { apiKey }) });

export const getRoutineAdvice = async (metrics: any) => {
  if (!apiKey) throw new Error("API Key no configurada. Agrega VITE_GEMINI_API_KEY a tu archivo .env");

  const response = await ai.models.generateContent({
    model: "gemini-2-flash",
    contents: `Analiza estas métricas de entrenamiento: ${JSON.stringify(metrics)}.
    Dame 3 consejos en español para optimizar la rutina.
    Responde en JSON: { "consejos": [{ "titulo": string, "consejo": string, "tipo": string }] }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          consejos: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                titulo: { type: Type.STRING },
                consejo: { type: Type.STRING },
                tipo: { type: Type.STRING }
              },
              required: ["titulo", "consejo", "tipo"]
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}").consejos;
};

export const chatWithCoach = async (message: string) => {
  if (!apiKey) {
    throw new Error("API Key no configurada. Crea un archivo .env con VITE_GEMINI_API_KEY=tu_api_key");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2-flash",
      contents: `Eres Coach Gym, un experto en entrenamiento. Responde en español de forma profesional pero amigable.

Mensaje del usuario: ${message}`,
    });

    return response.text;
  } catch (error: any) {
    console.error("Error en chat:", error);

    if (error.status === 429 || error.message?.includes("quota")) {
      throw new Error("Límite de API alcanzado. Espera un momento o verifica tu plan en ai.google.dev");
    }

    throw new Error("Error al conectar con el coach. Intenta de nuevo.");
  }
};
