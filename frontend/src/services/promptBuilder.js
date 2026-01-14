export const buildPrompt = ({
  place,
  tripType,
  days,
  hours,
  group,
  suggestions,
}) => {
  let durationText = "";

  if (tripType === "hours") {
    durationText = `${hours} hours`;
  } else if (tripType === "day") {
    durationText = `1 full day`;
  } else {
    durationText = `${days} days`;
  }

  return `
Create a clear and realistic travel itinerary.

Destination: ${place}
Duration: ${durationText}
Travel group: ${group}
Mode of transport: ${"local transport"}
Special preferences: ${suggestions || "none"}

Rules:
- Strictly follow the given duration (${durationText})
- Plan for the selected travel group
- Choose routes and places based on transport mode
  (walk, bike, car, bus, train, flight)
- Mention approximate travel time and costs
- Keep pacing realistic (no rushing)
- Use simple English
- Use headings like Day 1 Morning / Afternoon / Evening
- Do not use markdown, JSON, or emojis
- End after the final day with: END OF ITINERARY

`;
};
