import axios from "axios";

const GROQ_MODEL = "llama-3.1-8b-instant";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateItinerary = async (prompt) => {
  try {
    if (!prompt || prompt.length < 20) {
      throw new Error("Invalid prompt");
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a travel itinerary generator. Follow instructions exactly. Do not add extra sections."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,       // more stable than 0.7
        max_tokens: 1200,        // prevents rambling
        stop: ["END"], // hard stop
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000, // safer for cold starts
      }
    );

    const text = response.data?.choices?.[0]?.message?.content?.trim();

    if (!text || text.length < 50) {
      throw new Error("Weak AI response");
    }

    return {
      provider: "groq",
      text,
    };
  } catch (err) {
    console.error(
      "❌ Groq AI error:",
      err.response?.data || err.message
    );

    throw new Error("AI generation failed");
  }
};
