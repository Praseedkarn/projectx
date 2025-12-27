import axios from "axios";

export const generateItinerary = async (description, detailLevel) => {
  const prompt = `
Create a ${detailLevel || "morning"} travel itinerary for:
${description}

Respond ONLY with a valid JSON array like:
[
  {
    "time": "Morning",
    "activity": "Visit place",
    "location": "City",
    "transport": "Metro",
    "cost": "₹500",
    "description": "Short description"
  }
]
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

    const content = response.data.choices[0].message.content;

    // SAFE JSON PARSE
    try {
      return JSON.parse(content);
    } catch {
      return [
        {
          time: "Generated",
          activity: "AI response",
          location: "N/A",
          transport: "N/A",
          cost: "N/A",
          description: content.slice(0, 200)
        }
      ];
    }

  } 
   catch (error) {
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
