import { GoogleGenAI, Type } from "@google/genai";

const STORAGE_KEY = 'gemini_api_key';

export const getApiKey = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
  }
  return (
    import.meta.env.VITE_GEMINI_API_KEY ||
    (process.env.GEMINI_API_KEY as string | undefined) ||
    import.meta.env.GEMINI_API_KEY ||
    ""
  );
};

export const setStoredApiKey = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, key);
  }
};

export const clearStoredApiKey = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const getAIInstance = () => {
  const apiKey = getApiKey();
  return new GoogleGenAI({ apiKey });
};

export const analyzeDentalInfection = async (base64Image: string) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("API Key not configured");
    }
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Analyze this dental image for potential infections or issues. Provide a brief detection summary and 3 clear prevention tips. Return the response in JSON format." },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(',')[1] || base64Image
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detection: { type: Type.STRING },
            prevention: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["detection", "prevention"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      detection: "Unable to analyze image clearly. Please consult a doctor.",
      prevention: ["Maintain regular brushing", "Use dental floss", "Schedule a professional checkup"]
    };
  }
};

export const chatWithAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return "AI assistant is not configured yet. Add `GEMINI_API_KEY=your_key` in `.env` and restart the app, or use the settings icon to save it in the browser.";
    }

    const ai = getAIInstance();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a helpful AI Dental Assistant for Alpha Dent. You provide advice on dental hygiene, explain procedures, and help patients understand their symptoms. Always remind patients to consult their actual dentist for professional diagnosis. Keep responses concise and friendly."
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact your dentist directly.";
  }
};
