export const buildMultiDayPrompt = ({
  place,
  days,
  group,
  suggestions,
}) => `
Create a multi-day travel itinerary.

Destination: ${place}
Duration: ${days} days
Group: ${group}

${suggestions ? `
User preferences (apply naturally inside activities, do NOT create new sections):
${Array.isArray(suggestions)
  ? suggestions.map(s => `- ${s}`).join("\n")
  : `- ${suggestions}`}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} itinerary

${Array.from({ length: days }, (_, i) => `
DAY ${i + 1}

## Morning
- [ ] : 2 short sentences.
End with "Location: <place>".

## Afternoon
- [ ] : 2 short sentences.
End with "Location: <place>".

## Evening
- [ ] : 2 short sentences.
End with "Location: <place>".
`).join("")}

RULES:
- Use DAY 1, DAY 2, etc.
- Exactly ONE bullet per section
- Location last
- No emojis
- No extra text

END
`;
