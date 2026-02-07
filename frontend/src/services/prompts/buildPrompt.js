import { buildHoursPrompt } from "./buildHoursPrompt";
import { buildOneDayPrompt } from "./buildOneDayPrompt";
import { buildMultiDayPrompt } from "./buildMultiDayPrompt";

export const buildPrompt = ({
  tripType,
  place,
  hours,
  days,
  group,
  suggestions,
}) => {
  if (!tripType || !place) {
    throw new Error("Missing tripType or place");
  }

  if (tripType === "hours") {
    if (!hours || hours < 1) {
      throw new Error("Invalid hours value");
    }

    return buildHoursPrompt({
      place,
      hours,
      group,
      suggestions,
    });
  }

  if (tripType === "day") {
    return buildOneDayPrompt({
      place,
      group,
      suggestions,
    });
  }

  if (tripType === "multi") {
    if (!days || days < 2) {
      throw new Error("Invalid days value");
    }

    return buildMultiDayPrompt({
      place,
      days,
      group,
      suggestions,
    });
  }

  throw new Error(`Unsupported trip type: ${tripType}`);
};
