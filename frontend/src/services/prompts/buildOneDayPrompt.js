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
- [ ] : 2 short sentences.
Include estimated cost using "Cost: ₹min–₹max".
End with "Location: <place>".

## Afternoon
- [ ] : 2 short sentences.
Include estimated cost using "Cost: ₹min–₹max".
End with "Location: <place>".

## Evening
- [ ] : 2 short sentences.
Include estimated cost using "Cost: ₹min–₹max".
End with "Location: <place>".

RULES:
- Only DAY 1
- Exactly ONE bullet per section
- Cost before Location
- Location last
- No extra sections
- No emojis

END
`;
