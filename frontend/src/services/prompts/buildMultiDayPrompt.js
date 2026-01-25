export const buildMultiDayPrompt = ({
  place,
  days,
  group,
  suggestions,
}) => `
Create a detailed multi-day travel itinerary.

Destination: ${place}
Duration: ${days} days
Group: ${group}

${suggestions ? `
User preferences (blend naturally into the paragraphs, do NOT list separately):
${Array.isArray(suggestions)
  ? suggestions.join(", ")
  : suggestions}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} itinerary

${Array.from({ length: days }, (_, i) => `
DAY ${i + 1}

## Morning
Write ONE paragraph (3–4 sentences) describing morning activities.
End with: Location: <place>.

## Afternoon
Write ONE paragraph (3–4 sentences) describing afternoon activities.
End with: Location: <place>.

## Evening
Write ONE paragraph (3–4 sentences) describing evening activities.
End with: Location: <place>.
`).join("")}

## Transportation
Write ONE concise paragraph explaining how to travel within ${place} across all days
(public transport, taxis, walking, passes, airport/rail connectivity).

RULES:
- Use paragraphs ONLY (no bullets, no hyphens)
- Use DAY 1, DAY 2, etc.
- Transportation must be LAST
- Do NOT shorten content
- No emojis
- No extra text

END
`;
