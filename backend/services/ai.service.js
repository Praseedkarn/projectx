import axios from "axios";

const GROQ_MODEL = "llama-3.1-8b-instant";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateItinerary = async (prompt) => {
  try {
    console.log("🤖 Using Groq model:", GROQ_MODEL);

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const text = response.data?.choices?.[0]?.message?.content;

    if (!text || text.length < 50) {
      throw new Error("Weak AI response");
    }

    return {
      provider: "groq",
      text: text.trim(),
    };
  } catch (err) {
    console.error(
      "❌ Groq error:",
      err.response?.data || err.message
    );
    throw err;
  }
};
