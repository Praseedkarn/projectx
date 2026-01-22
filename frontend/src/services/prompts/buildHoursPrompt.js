export const buildHoursPrompt = ({
  place,
  hours,
  group,
  suggestions,
}) => `
Create an hourly travel itinerary.

Destination: ${place}
Duration: ${hours} hours
Group: ${group}

${suggestions ? `
User preferences (apply naturally inside activities, do NOT create new sections):
${Array.isArray(suggestions)
  ? suggestions.map(s => `- ${s}`).join("\n")
  : `- ${suggestions}`}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} hourly itinerary

${Array.from({ length: hours }, (_, i) => `
## Hour ${i + 1}
- [ ] : 1–2 short sentences describing the activity.
Include estimated cost using "Cost: ₹min–₹max".
End with "Location: <place>".
`).join("")}

RULES:
- Use TITLE once
- Use only "## Hour X"
- Exactly ONE bullet per hour
- Cost MUST appear before Location
- Location MUST be last
- No emojis
- No extra text

END
`;
