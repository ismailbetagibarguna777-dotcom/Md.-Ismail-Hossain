import { Handler } from '@netlify/functions';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is required" }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    const { word, meaning, englishTerm } = JSON.parse(event.body);
    if (!word) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Word is required" }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    const prompt = `You are an extremely friendly, encouraging, and sweet Bengali language teacher for very young kids. 
For the Bengali vocabulary word "${word}" (meaning: ${meaning || 'not specified'}, English: ${englishTerm || 'not specified'}), generate a JSON response with the following fields:
- "sentence": A delightful, cheerful, and very simple child-friendly example sentence in Bengali using the word "${word}". Keep it easy to understand and suitable for children under 7 years old. End with a sweet kid-friendly emoji.
- "kidDefinition": A highly simplified, fun, and extremely warm explanation in Bengali of what this word means, addressed directly to a child (e.g. using encouraging words like "চলো শিখি", "মিষ্টি বন্ধু" or "খুব চমৎকার"). Keep it under 2 sentences.
- "synonyms": An array of 2-3 very simple Bengali words that mean the same thing.
- "antonyms": An array of 2-3 very simple Bengali words that mean the opposite.

Respond ONLY with a valid JSON object matching this schema. No markdown formatting outside of the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING },
            kidDefinition: { type: Type.STRING },
            synonyms: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            antonyms: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["sentence", "kidDefinition", "synonyms", "antonyms"]
        }
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText.trim());

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error: any) {
    console.error("Gemini sentence generation error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to generate sentence" }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
