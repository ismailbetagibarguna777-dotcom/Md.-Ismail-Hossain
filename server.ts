import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: generate contextual sentence
  app.post("/api/generate-sentence", async (req, res) => {
    try {
      const { word, meaning, englishTerm } = req.body;
      if (!word) {
        return res.status(400).json({ error: "Word is required" });
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
      res.json(data);
    } catch (error: any) {
      console.error("Gemini sentence generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate sentence" });
    }
  });

  // API Route: generate customized assessment tool
  app.post("/api/generate-assessment-tool", async (req, res) => {
    try {
      const { topic, title } = req.body;
      const theme = topic || "আমাদের প্রকৃতি ও সবুজ পরিবেশ";
      const customTitle = title || "কাস্টম মূল্যায়ন টুলস";

      const prompt = `You are a master primary school Bengali curriculum designer and FLN (Foundational Literacy and Numeracy) reading expert in Bangladesh. 
Generate a completely customized, top-tier Bengali reading assessment tool for Class 3 students based on the following theme/topic: "${theme}".

The response must be a single, valid JSON object matching this schema:
- "title": A beautiful Bengali title for this assessment tool, such as "${customTitle}" (or customized based on theme like "কাস্টম মূল্যায়ন - ${theme}").
- "letters": An array of EXACTLY 24 Bengali letters, including individual vowels, consonants, and common conjuncts (যুক্তবর্ণ, e.g. ক্ত, গ্গ, ঙ্ক, ক্ষ, জ্ঞ, ন্দ, ষ্ট, চ্ছ, ল্প, ম্প). Ensure they represent a mixture of easy and advanced sounds appropriate for assessing Class 3 reading skills.
- "words": An array of EXACTLY 10 Bengali words related to the theme "${theme}". The words should range from simple 2-letter words to 3-4 letter words (including common vowel signs and simple conjuncts).
- "sentences": An array of EXACTLY 3 child-friendly, natural-sounding simple sentences in Bengali related to the theme "${theme}" that assess fluency.
- "passage": A highly engaging, child-friendly 4-5 sentence story/passage in Bengali based on the theme "${theme}" to test comprehension. Keep the language warm and natural.
- "questions": An array of EXACTLY 2 comprehension questions based ONLY on the passage. Each question must be an object with:
    - "q": The question in Bengali.
    - "ans": The correct answer in Bengali.

Respond ONLY with the JSON object. No markdown, no preambles, no trailing text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              letters: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              words: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              sentences: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              passage: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    q: { type: Type.STRING },
                    ans: { type: Type.STRING }
                  },
                  required: ["q", "ans"]
                }
              }
            },
            required: ["title", "letters", "words", "sentences", "passage", "questions"]
          }
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Gemini assessment generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate assessment tool" });
    }
  });

  // API Route: AI Tutor Chat Assistant
  app.post("/api/ai-tutor-chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are a highly compassionate, wise, and encouraging primary school Bengali tutor and FLN (Foundational Literacy and Numeracy) specialist in Bangladesh.
Your goal is to assist teachers in assessing, scoring, and improving their Class 3 students' Bengali reading, pronunciation, and spelling skills.
Provide highly practical, easy-to-implement pedagogical advice, game-based learning ideas, and strategies for students at various reading levels (Level 1 to Level 4).
Always respond warmly in fluent, polite Bengali, using encouraging emojis where appropriate. Keep responses relatively concise and focused on practical pedagogy.`;

      const contents = [
        ...(history || []).map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI tutor chat error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
