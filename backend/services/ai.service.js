export const generateItinerary = async (prompt) => {
  try {
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
          { role: "user", content: prompt }
        ],
        temperature: 0.6, // slightly lower = more obedient
        max_tokens: 600,  // enough, but avoids rambling
        stop: ["END OF ITINERARY"], // HARD STOP
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
    console.error("❌ Groq error:", err.response?.data || err.message);
    throw err;
  }
};
