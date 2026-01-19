export const buildPrompt = ({
  place,
  tripType,
  days,
  hours,
  group,
  suggestions = [],
}) => {
  const durationText =
    tripType === "hours"
      ? `${hours} hours`
      : tripType === "day"
      ? "1 full day"
      : `${days} days`;

  let suggestionText = "";
  if (suggestions.length > 0) {
    suggestionText = `
Include only these extras (bullet points):
${suggestions.map((s) => `- ${s}`).join("\n")}
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
- Keep travel time & cost realistic
- Simple English only
- No markdown, JSON, or emojis
${tripType === "hours"
  ? `- Use ONLY time slots like Hour 1, Hour 2, Hour 3
- Do NOT use day-based headings`
  : `- Use Day-wise headings (Morning / Afternoon / Evening)
- Do NOT use hourly format`}
${suggestionText}
If something is not requested, do not include it.
End with: END OF ITINERARY
`;
};
