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

  // ✅ Normalize suggestions safely
  const safeSuggestions = Array.isArray(suggestions)
    ? suggestions
    : suggestions
    ? [suggestions]
    : [];

  let suggestionText = "";
  if (safeSuggestions.length > 0) {
    suggestionText = `
Extras to include (bullet points only):
${safeSuggestions.map((s) => `- ${s}`).join("\n")}
`;
  }

  return `
Create a realistic travel itinerary.

Destination: ${place}
Duration: ${durationText}
Group: ${group}
Transport: local transport

Rules:
- Follow the exact duration
- Keep pacing realistic
- Simple English only
- No markdown, JSON, emojis, or extra sections
${tripType === "hours"
  ? `- Output MUST be hourly
- Use ONLY: Hour 1, Hour 2, Hour 3...
- Total hours MUST equal ${hours}
- NEVER use days or morning/afternoon`
  : `- Output MUST be day-wise
- Use Morning / Afternoon / Evening
- NEVER use hour format`}
${suggestionText}
If something is not requested, do not include it.
End with: END OF ITINERARY
`;
};
