export const buildHoursPrompt = ({
  place,
  hours,
  group,
  suggestions,
}) => `
Create a clear, natural-sounding hours travel itinerary in a professional travel-guide tone.
Destination: ${place}
Duration: ${hours} hours
Group: ${group}

${suggestions ? `
User preferences (blend naturally into the paragraphs, do NOT list separately):
${Array.isArray(suggestions)
  ? suggestions.join(", ")
  : suggestions}
` : ""}

STRICT FORMAT — FOLLOW EXACTLY:

TITLE: ${place} hourly itinerary

${Array.from({ length: hours }, (_, i) => `
## Hour ${i + 1}
Write ONE paragraph (2–3 sentences) describing what to do during this hour.
End with: Location: <place>.
`).join("")}

Estimated Budget: India: ₹ <min> - ₹ <max>
Write this on ONE line only.
Exclude flights/hotels. Use a range.


## Transportation
Write ONE concise paragraph explaining the best ways to move around ${place}
(public transport, walking, taxis, passes).


RULES:
- Paragraphs ONLY (no bullets)
- Use only "## Hour X"
- Transportation must be LAST
- No emojis
- No extra text

END
`;
