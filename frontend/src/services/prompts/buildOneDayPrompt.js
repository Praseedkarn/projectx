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
User preferences (apply naturally inside activities, do NOT create new sections):
${Array.isArray(suggestions)
  ? suggestions.map(s => `- ${s}`).join("\n")
  : `- ${suggestions}`}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} one-day itinerary

DAY 1

## Morning
- [ ] : 3 short sentences.
End with "Location: <place>".

## Afternoon
- [ ] : 3 short sentences.
End with "Location: <place>".

## Evening
- [ ] : 3 short sentences.
End with "Location: <place>".

## Transportation
- [ ] : Describe the best way to get around ${place} in one day (public transport, walking routes, taxis).

RULES:
- Only DAY 1
- Exactly ONE bullet per section
- Transportation must be LAST
- Exactly ONE bullet in Transportation
- No extra sections
- No emojis

END
`;
