import axios from "axios";

/* =========================
   Utility: Sleep (rate limit safe)
========================= */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =========================
   OpenRouter Call
========================= */
const callOpenRouter = async (model, prompt, apiKey) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 900, // keep free models safe
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Travel Planner",
      },
      timeout: 30000, // free models are slow
    }
  );

  return response.data.choices[0]; // ✅ correct structure
};

export const generateItinerary = async (prompt) => {
  const models = [
    "deepseek/deepseek-r1-0528:free",
    "arcee/trinity-mini:free",
  ];

  const apiKeys = [
    process.env.AI_API_KEY_PRIMARY,
    process.env.AI_API_KEY_SECONDARY,
  ];

  for (const key of apiKeys) {
    if (!key) continue;

    for (const model of models) {
      try {
        const choice = await callOpenRouter(model, prompt, key);

        const text = choice.message?.content;

        if (!text || text.length < 200) continue;

        return {
          provider: model,
          text: text.replace(/```/g, "").trim(),
        };
      } catch {
        await sleep(3000);
      }
    }
  }

  throw new Error("AI providers failed");
};

