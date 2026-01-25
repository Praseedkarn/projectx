export const buildOneDayPrompt = ({
  place,
  group,
  suggestions,
}) => `
Create a one-day travel itinerary.

Destination: ${place}
Duration: 1 day
Group: ${group}

${suggestions ? `
User preferences (blend naturally into the paragraphs, do NOT list separately):
${Array.isArray(suggestions)
  ? suggestions.join(", ")
  : suggestions}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} one-day itinerary

DAY 1

## Morning
Write ONE paragraph (3–4 sentences).
End with: Location: <place>.

## Afternoon
Write ONE paragraph (3–4 sentences).
End with: Location: <place>.

## Evening
Write ONE paragraph (3–4 sentences).
End with: Location: <place>.

## Transportation
Write ONE short paragraph explaining how to get around ${place} in one day
(public transport, walking routes, taxis).

RULES:
- Use paragraphs ONLY
- Only DAY 1
- Transportation must be LAST
- No emojis
- No extra sections
- No bullet points

END
`;
