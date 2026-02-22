export const buildMultiDayPrompt = ({
  place,
  days,
  group,
  suggestions,
}) => `
Create a realistic, up-to-date multi-day travel itinerary.

Destination: ${place}
Duration: ${days} days
Traveler Type: ${group}

${suggestions ? `
Traveler preferences (blend naturally, do NOT list separately):
${Array.isArray(suggestions)
  ? suggestions.join(", ")
  : suggestions}
` : ""}

STYLE:
- Soft, friendly, instructional tone.
- Use action verbs (Visit, Walk, Explore, Try, Head to).
- Keep language simple and clear.
- Ensure smooth flow between sections.
- Keep recommendations practical and realistic.
- Avoid outdated places, dramatic writing, emojis, or bullet points.
- Paragraphs only.

FORMAT:

TITLE: ${place} Itinerary

${Array.from({ length: days }, (_, i) => `
DAY ${i + 1}

## Morning
Write ONE paragraph (2–3 sentences).
End with: Location: <Place Name> (same line).

## Afternoon
Write ONE paragraph (2–3 sentences).
End with: Location: <Place Name> (same line).

## Evening
Write ONE paragraph (2–3 sentences).
End with: Location: <Place Name> (same line).
`).join("")}

Estimated Budget: India: ₹ <min> - ₹ <max> (per person per day, one line only)

## Transportation
Write ONE concise paragraph about getting around ${place} across all days.

END
`;