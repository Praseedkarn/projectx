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
- [ ] : 2–3 short sentences describing the activity.
End with "Location: <place>".
`).join("")}

RULES:
- Use TITLE once
- Use only "## Hour X"
- Exactly ONE bullet per hour
- Location MUST be last
- No emojis
- No extra text

END
`;
