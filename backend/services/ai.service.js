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

/* =========================
   Main Itinerary Generator
========================= */
export const generateItinerary = async (description, detailLevel = "medium") => {
  const prompt = `
Create a SIMPLE and CLEAR travel itinerary.

Trip description:
${description}

Rules:
- Limit itinerary to 3–5 days maximum
- Use plain English
- Use headings like "Day 1 Morning", "Afternoon"
- Mention places, transport, and approximate costs
- Keep explanations short
- DO NOT use markdown
- DO NOT use JSON
`;

  const models = [
    "deepseek/deepseek-r1-0528:free",
    "arcee/trinity-mini:free",
  ];

  const apiKeys = [
    process.env.AI_API_KEY_PRIMARY,
    process.env.AI_API_KEY_SECONDARY,
  ];

  let lastError = null;

  for (const key of apiKeys) {
    if (!key) continue;

    for (const model of models) {
      try {
        console.log(`⚡ Trying ${model}`);

        const choice = await callOpenRouter(model, prompt, key);

        const text = choice.message?.content;

        if (!text || text.length < 200) {
          console.warn("⚠️ Response too short, skipping");
          await sleep(3000);
          continue;
        }

        return {
          provider: model,
          text: text.replace(/```/g, "").trim(),
          finishReason: choice.finish_reason || "stop",
        };
      } catch (err) {
        lastError = err;

        const status = err.response?.status;
        const msg = err.response?.data?.error?.message || err.message;

        console.warn(`❌ Failed: ${model}`);
        console.warn(`   Status: ${status || "unknown"}`);
        console.warn(`   Message: ${msg}`);

        // ⏳ Avoid rate-limit bans
        await sleep(3000);
      }
    }
  }

  throw new Error(
    "All AI providers failed. Free models may be rate-limited or offline."
  );
};
