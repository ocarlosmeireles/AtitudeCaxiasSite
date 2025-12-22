
import { GoogleGenAI, Type } from "@google/genai";
import { DevotionalResponse } from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const modelName = "gemini-3-flash-preview";

export const generateDailyDevotional = async (): Promise<DevotionalResponse> => {
  try {
    const response = await getAI().models.generateContent({
      model: modelName,
      contents: "Gere um devocional cristão curto e inspirador para hoje. Foco em esperança, fé ou propósito. Use EXCLUSIVAMENTE a versão NVI (Nova Versão Internacional) da Bíblia para os versículos. O tom deve ser jovem e moderno.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING, description: "O texto do versículo bíblico (NVI)" },
            reference: { type: Type.STRING, description: "A referência do versículo (ex: João 3:16)" },
            message: { type: Type.STRING, description: "Uma mensagem curta de encorajamento (max 50 palavras)" },
            prayer: { type: Type.STRING, description: "Uma oração curta de 1 frase" }
          },
          required: ["verse", "reference", "message", "prayer"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DevotionalResponse;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating devotional:", error);
    return {
      verse: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
      reference: "Jeremias 29:11 (NVI)",
      message: "Deus tem o controle de todas as coisas. Confie que o futuro é de paz.",
      prayer: "Senhor, eu confio nos teus planos perfeitos para mi hoje."
    };
  }
};

export const generateStudyGuide = async (sermonTitle: string, description: string): Promise<string> => {
  try {
    const response = await getAI().models.generateContent({
      model: modelName,
      contents: `Você é um assistente de teologia. Com base na pregação "${sermonTitle}" que trata sobre "${description}", gere um guia de estudo bíblico para pequenos grupos.
      
      Estrutura solicitada:
      1. Quebra-gelo divertido.
      2. Versículo chave (NVI).
      3. Três pontos principais para reflexão profunda.
      4. Um desafio prático para a semana.
      
      Seja inspirador e relevante.`,
    });
    return response.text || "Não foi possível gerar o guia no momento.";
  } catch (error) {
    return "Erro ao conectar com a IA pastoral.";
  }
};

// Fix: Added missing export generateDiscipleshipContent
export const generateDiscipleshipContent = async (topic: string): Promise<string> => {
  try {
    const response = await getAI().models.generateContent({
      model: modelName,
      contents: `Gere um conteúdo de estudo bíblico profundo sobre o tema: "${topic}". 
      O conteúdo deve ser formatado em Markdown, com títulos, subtítulos, versículos bíblicos (NVI) e pontos de aplicação prática.`,
    });
    return response.text || "Conteúdo não disponível.";
  } catch (error) {
    return "Erro ao gerar conteúdo de discipulado.";
  }
};

export const improveAdminText = async (draftText: string, type: 'NEWS' | 'NOTICE' | 'WELCOME'): Promise<string> => {
  try {
    let context = "";
    if (type === 'NEWS') context = "Melhore este texto para uma notícia oficial da igreja. Torne-o envolvente, jornalístico mas com tom cristão.";
    else if (type === 'NOTICE') context = "Melhore este texto para um aviso rápido e urgente da igreja. Seja direto, claro e amigável.";
    else if (type === 'WELCOME') context = "Melhore este texto de boas-vindas para o site da igreja. Deve ser caloroso, evangelístico, convidativo para quem não conhece Jesus e inspirador. Mantenha em 1 ou 2 parágrafos curtos.";

    const response = await getAI().models.generateContent({
      model: modelName,
      contents: `${context} Texto original: "${draftText}"`,
    });
    return response.text || draftText;
  } catch (error) {
    return draftText;
  }
};
