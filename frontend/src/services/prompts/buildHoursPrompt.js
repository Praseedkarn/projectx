export const buildHoursPrompt = ({
  place,
  hours,
  group,
  suggestions,
}) => `
You are a professional travel writer creating a REALISTIC, up-to-date hourly travel itinerary.

Destination: ${place}
Duration: ${hours} hours
Traveler Type: ${group}

${suggestions ? `
Traveler preferences (blend naturally into story, do NOT list separately):
${Array.isArray(suggestions)
  ? suggestions.join(", ")
  : suggestions}
` : ""}

STYLE REQUIREMENTS:
- Write in a soft, human, and friendly tone.
- Tell the traveler clearly what to do (use action verbs like Visit, Walk, Explore, Try, Head to).
- Keep a light storytelling flow so each hour connects naturally to the next.
- Use simple and easy English so anyone can understand.
- Keep the plan realistic and up-to-date with current travel trends, popular spots, and local activity.
- Prefer places that are currently active, well-rated, or commonly visited.
- Avoid outdated or permanently closed attractions.
- Avoid dramatic or overly poetic language.
- Avoid robotic phrases like “start your day by”.
- Do NOT describe emotions deeply.
- Paragraphs only. No bullet points. No emojis.

STRICT OUTPUT FORMAT:

TITLE: ${place} Hourly Itinerary

${Array.from({ length: hours }, (_, i) => `
## Hour ${i + 1}
Write ONE vivid paragraph (3–4 sentences). Make it flow naturally from the previous hour.
End the paragraph by writing exactly:
Location: <Place Name>
at the very end of the same paragraph.

Location formatting rules:
- Keep "Location: <Place Name>" on one single line.
- Do not add emojis, line breaks, or extra text.
`).join("")}

Estimated Budget: India: ₹ <min> - ₹ < max>
(Write on ONE line only. Exclude flights and hotels.)

## Transportation
Write ONE practical paragraph explaining how to move efficiently around ${place} today 
(local transport apps, metro, autos, walking routes, traffic patterns, passes).

END
`;