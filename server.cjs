var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/generate-sentence", async (req, res) => {
    try {
      const { word, meaning, englishTerm } = req.body;
      if (!word) {
        return res.status(400).json({ error: "Word is required" });
      }
      const prompt = `You are an extremely friendly, encouraging, and sweet Bengali language teacher for very young kids. 
For the Bengali vocabulary word "${word}" (meaning: ${meaning || "not specified"}, English: ${englishTerm || "not specified"}), generate a JSON response with the following fields:
- "sentence": A delightful, cheerful, and very simple child-friendly example sentence in Bengali using the word "${word}". Keep it easy to understand and suitable for children under 7 years old. End with a sweet kid-friendly emoji.
- "kidDefinition": A highly simplified, fun, and extremely warm explanation in Bengali of what this word means, addressed directly to a child (e.g. using encouraging words like "\u099A\u09B2\u09CB \u09B6\u09BF\u0996\u09BF", "\u09AE\u09BF\u09B7\u09CD\u099F\u09BF \u09AC\u09A8\u09CD\u09A7\u09C1" or "\u0996\u09C1\u09AC \u099A\u09AE\u09CE\u0995\u09BE\u09B0"). Keep it under 2 sentences.
- "synonyms": An array of 2-3 very simple Bengali words that mean the same thing.
- "antonyms": An array of 2-3 very simple Bengali words that mean the opposite.

Respond ONLY with a valid JSON object matching this schema. No markdown formatting outside of the JSON.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              sentence: { type: import_genai.Type.STRING },
              kidDefinition: { type: import_genai.Type.STRING },
              synonyms: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              antonyms: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              }
            },
            required: ["sentence", "kidDefinition", "synonyms", "antonyms"]
          }
        }
      });
      const responseText = response.text || "{}";
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error) {
      console.error("Gemini sentence generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate sentence" });
    }
  });
  app.post("/api/generate-assessment-tool", async (req, res) => {
    try {
      const { topic, title } = req.body;
      const theme = topic || "\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AA\u09CD\u09B0\u0995\u09C3\u09A4\u09BF \u0993 \u09B8\u09AC\u09C1\u099C \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6";
      const customTitle = title || "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09AE\u09C2\u09B2\u09CD\u09AF\u09BE\u09DF\u09A8 \u099F\u09C1\u09B2\u09B8";
      const prompt = `You are a master primary school Bengali curriculum designer and FLN (Foundational Literacy and Numeracy) reading expert in Bangladesh. 
Generate a completely customized, top-tier Bengali reading assessment tool for Class 3 students based on the following theme/topic: "${theme}".

The response must be a single, valid JSON object matching this schema:
- "title": A beautiful Bengali title for this assessment tool, such as "${customTitle}" (or customized based on theme like "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09AE\u09C2\u09B2\u09CD\u09AF\u09BE\u09DF\u09A8 - ${theme}").
- "letters": An array of EXACTLY 24 Bengali letters, including individual vowels, consonants, and common conjuncts (\u09AF\u09C1\u0995\u09CD\u09A4\u09AC\u09B0\u09CD\u09A3, e.g. \u0995\u09CD\u09A4, \u0997\u09CD\u0997, \u0999\u09CD\u0995, \u0995\u09CD\u09B7, \u099C\u09CD\u099E, \u09A8\u09CD\u09A6, \u09B7\u09CD\u099F, \u099A\u09CD\u099B, \u09B2\u09CD\u09AA, \u09AE\u09CD\u09AA). Ensure they represent a mixture of easy and advanced sounds appropriate for assessing Class 3 reading skills.
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
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              letters: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              words: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              sentences: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              passage: { type: import_genai.Type.STRING },
              questions: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    q: { type: import_genai.Type.STRING },
                    ans: { type: import_genai.Type.STRING }
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
    } catch (error) {
      console.error("Gemini assessment generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate assessment tool" });
    }
  });
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
        ...(history || []).map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("AI tutor chat error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
