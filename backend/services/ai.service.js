import axios from "axios";

const callOpenRouter = async (model, prompt, apiKey) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
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
${description}

Writing rules:
- Use plain English
- Use headings like "Day 1 Morning", "Afternoon", etc.
- Mention places, transport, and approximate costs naturally
- Do NOT use JSON
- Do NOT use markdown
`;

  const models = [
    "deepseek/deepseek-r1-0528:free",
    "arcee/trinity-mini:free",
  ];

  const apiKeys = [
    process.env.AI_API_KEY_PRIMARY,
    process.env.AI_API_KEY_SECONDARY,
  ];

  for (const key of apiKeys) {
    for (const model of models) {
      try {
        console.log(`⚡ Trying ${model}`);

        const result = await callOpenRouter(model, prompt, key);

        // 🚨 LENGTH LIMIT DETECTION
        if (result.finishReason === "length") {
          console.warn("⚠️ AI RESPONSE CUT DUE TO TOKEN LIMIT");
          console.warn("⚠️ Model:", model);
          console.warn("⚠️ Suggestion: Reduce days or detail level");
        }

        // 🚨 TOO SHORT (fallback safety)
        if (result.text.length < 300) {
          console.warn("⚠️ AI RESPONSE SUSPICIOUSLY SHORT");
          console.warn("⚠️ Characters:", result.text.length);
        }

        return {
          provider: model,
          text: result.text.replace(/```/g, "").trim(),
          finishReason: result.finishReason,
        };
      } catch (err) {
        console.warn(`❌ Failed: ${model}`);
      }
    }
  }

  throw new Error("All AI providers failed");
};
