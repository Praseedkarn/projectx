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
- Keep recommendations practical and realistic.
- Paragraphs only. No emojis.

STRICT OUTPUT FORMAT:

TITLE: ${place} Itinerary

${Array.from({ length: days }, (_, i) => `
DAY ${i + 1}

## Morning
Write ONE paragraph (3–4 sentences).
End the paragraph with: Location: <Place Name> (same line).

## Afternoon
Write ONE paragraph (3–4 sentences).
End the paragraph with: Location: <Place Name> (same line).

## Evening
Write ONE paragraph (3–4 sentences).
End the paragraph with: Location: <Place Name> (same line).
`).join("")}

Estimated Budget: India: ₹ <min> - ₹ <max>

## Transportation
Write ONE paragraph explaining how to travel within ${place} across all days.

RULES:
- Use exactly "DAY 1", "DAY 2", etc.
- Use exactly "## Morning", "## Afternoon", "## Evening".
- Use exactly "## Transportation".
- Write "Location: <Place Name>" at the end of each section paragraph on the same line.
- Do not add extra sections.
- Do not add emojis.
- Do not add extra text before or after this format.

END
`;