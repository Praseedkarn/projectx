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

Use exactly "DAY 1", "DAY 2", up to "DAY ${days}".

For EACH day, follow this exact structure:

DAY 1

## Morning
Write ONE paragraph (3–4 sentences).
End with: Location: <Place Name>

## Afternoon
Write ONE paragraph (3–4 sentences).
End with: Location: <Place Name>

## Evening
Write ONE paragraph (3–4 sentences).
End with: Location: <Place Name>

Repeat the same structure sequentially until DAY ${days}.

Estimated Budget: India: ₹ <min> - ₹ <max>
(Write on ONE line only. Per person, per day. Exclude flights and hotels.)

## Transportation
Write ONE paragraph explaining how to travel within ${place} across all days.

RULES:
- Use exactly "DAY 1", "DAY 2", etc.
- Use exactly "## Morning", "## Afternoon", "## Evening".
- Use exactly "## Transportation".
- Write "Location: <Place Name>" after each section paragraph.
- Do not add extra sections.
- Do not add emojis.
- Do not add extra text before or after this format.

END
`;