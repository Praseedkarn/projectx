import axios from "axios";

const callOpenRouter = async (model, prompt, apiKey) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Travel Planner",
      },
      timeout: 25000, // free models are slow
    }
  );

  return response.data.choices[0].message.content;
};

export const generateItinerary = async (description, detailLevel) => {
  const prompt = `
Create a travel itinerary in clear, readable text.

Trip details:
- Description: ${description}
- Detail level: ${detailLevel || "morning"}

Guidelines:
- Write in plain English
- Use headings like "Day 1 Morning", "Afternoon", etc.
- Mention places, transport, and approximate costs naturally
- DO NOT use JSON
- DO NOT use markdown
`;

  // ✅ ORDER MATTERS
  const models = [
    "deepseek/deepseek-r1-0528:free",   // PRIMARY
    "arcee/trinity-mini:free",          // FALLBACK
  ];

  const apiKeys = [
    process.env.AI_API_KEY_PRIMARY,
    process.env.AI_API_KEY_SECONDARY,
  ];

  for (const key of apiKeys) {
    for (const model of models) {
      try {
        console.log(`⚡ Trying ${model}`);
        const text = await callOpenRouter(model, prompt, key);

        return {
          provider: model,
          text: text.replace(/```/g, "").trim(),
        };
      } catch (err) {
        console.warn(`❌ Failed: ${model}`);
      }
    }
  }

  throw new Error("All AI providers failed");
};
