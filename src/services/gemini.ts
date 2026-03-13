import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getRoutineAdvice = async (metrics: any) => {
  if (!ai) throw new Error("API Key not found");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analiza estas métricas de entrenamiento y biometría: ${JSON.stringify(metrics)}. 
    Dame 3 consejos específicos en español para optimizar la rutina de entrenamiento. 
    Responde en formato JSON con un array de objetos { "titulo": string, "consejo": string, "tipo": "recuperacion" | "intensidad" | "volumen" }.`,
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

export const chatWithCoach = async (message: string, history: any[] = []) => {
  if (!ai) throw new Error("API Key not found");

  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "Eres un coach experto en entrenamiento de fuerza y biometría deportiva. Tu nombre es Coach Gym. Responde de manera profesional, técnica pero accesible, y siempre en español. Ayuda al usuario a entender sus métricas y optimizar su rendimiento.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
