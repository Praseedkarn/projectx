export const buildPrompt = ({
  place,
  tripType,
  days,
  hours,
  group,
  suggestions,
}) => {
  const durationText =
    tripType === "hours"
      ? `${hours} hours`
      : tripType === "day"
      ? "1 full day"
      : `${days} days`;

  const prefs = suggestions
    ? `Preferences to include naturally:\n${Array.isArray(suggestions)
        ? suggestions.map(s => `- ${s}`).join("\n")
        : `- ${suggestions}`}`
    : "";

  return `
Create a travel itinerary.

Destination: ${place}
Duration: ${durationText}
Group: ${group}

FORMAT (STRICT):

TITLE: ${place} itinerary

${tripType === "hours"
  ? Array.from({ length: hours }, (_, i) => `
## Hour ${i + 1}
- [ ] : 1–2 short sentences. End with "Location: <place>".
`).join("")
  : Array.from({ length: days }, (_, i) => `
DAY ${i + 1}

## Morning
- [ ] : 2 short sentences. End with "Location: <place>".

## Afternoon
- [ ] : 2 short sentences. End with "Location: <place>".

## Evening
- [ ] : 2 short sentences. End with "Location: <place>".
`).join("")}

RULES:
- Use TITLE exactly once 
- Use DAY 1, DAY 2 for multi-day trips 
- Use ## only for Morning / Afternoon / Evening or Hour 
- Use exactly ONE bullet per section 
- Each bullet must be 2–3 short sentences 
- Place name MUST appear at the END of description 
- Integrate user preferences naturally, do NOT create extra sections
- No emojis, no extra text

${prefs}

END OF ITINERARY
`;
};
