import axios from "axios";

const GROQ_MODEL = "llama-3.1-8b-instant";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateCityInfo = async (city) => {
  const prompt = `
Give a short factual overview of the city "${city}".
Include:
- What the city is famous for
- Culture or history
- Why tourists visit

Rules:
- 4 to 5 sentences
- Neutral tone
- No emojis
- No markdown
`;

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: "You are a travel information expert." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 180,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );

  const text = response.data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("AI city fallback failed");
  }

  return text;
};
