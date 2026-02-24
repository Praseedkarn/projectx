export function parseOneDayText(text) {
  const result = {
    title: "",
    estimatedBudget: "",
    days: [
      {
        day: "DAY 1",
        sections: [],
      },
    ],
  };

  if (!text) return result;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    /* ================= TITLE ================= */
    if (line.startsWith("TITLE:")) {
      result.title = line.replace("TITLE:", "").trim();
      continue;
    }

    /* ================= ESTIMATED BUDGET ================= */
    if (/^estimated budget/i.test(line)) {
      result.estimatedBudget = line
        .replace(/estimated budget[:₹]*/i, "")
        .trim();
      continue;
    }

    /* ================= SECTION HEADERS ================= */
    if (/^##\s*(Morning|Afternoon|Evening|Transportation)/i.test(line)) {
      currentSection = {
        period: line.replace("##", "").trim(),
        activities: [],
      };

      result.days[0].sections.push(currentSection);
      continue;
    }

    if (!currentSection) continue;

    /* ================= HANDLE PARAGRAPH + LOCATION (same line) ================= */

    // Case: paragraph ends with "Location: XYZ"
    const locationMatch = line.match(/location:\s*(.*)$/i);

    if (locationMatch) {
      const locationText = locationMatch[1].trim();

      // Remove location part from description
      const description = line
        .replace(/location:\s*(.*)$/i, "")
        .trim();

      currentSection.activities.push({
        description,
        location: locationText,
      });

      continue;
    }

    /* ================= NORMAL PARAGRAPH ================= */
    currentSection.activities.push({
      description: line,
      location: "",
    });
  }

  return result;
}