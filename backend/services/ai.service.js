import axios from "axios";

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
- Just return readable text
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Travel Planner"
        }
      }
    );

    let content = response.data.choices[0].message.content;

    // Clean any accidental markdown
    content = content
      .replace(/```/g, "")
      .trim();

    return {
      text: content
    };

  } catch (error) {
    console.error("🔥 OPENROUTER FULL ERROR 🔥");

    if (error.response) {
      console.error("STATUS:", error.response.status);
      console.error("DATA:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("MESSAGE:", error.message);
    }

    throw new Error("AI failed");
  }
};
