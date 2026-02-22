export function parseOneDayText(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

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

  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    /* ================= TITLE ================= */
    if (line.startsWith("TITLE:")) {
      result.title = line.replace("TITLE:", "").trim();
      continue;
    }

    /* ================= BUDGET ================= */
    if (/^estimated budget/i.test(line)) {
      result.estimatedBudget = line
        .replace(/estimated budget[:₹]*/i, "")
        .trim();
      continue;
    }

    /* ================= SECTION (Morning / Afternoon / Evening / Transportation) ================= */
    if (line.startsWith("##")) {
      currentSection = {
        period: line.replace("##", "").trim(),
        activities: [],
      };

      result.days[0].sections.push(currentSection);
      continue;
    }

    if (!currentSection) continue;

    /* ================= LOCATION HANDLING ================= */
    if (/location:/i.test(line)) {
      const cleanLine = line.replace(/📍/g, "");

      let locationText =
        cleanLine.split(/location:/i)[1]?.trim() || "";

      // If AI breaks location into next line
      if (!locationText && lines[i + 1]) {
        locationText = lines[i + 1]
          .replace(/📍/g, "")
          .trim();
      }

      // Attach location to LAST activity instead of creating new one
      const lastActivity =
        currentSection.activities[currentSection.activities.length - 1];

      if (lastActivity) {
        lastActivity.location = locationText;
      }

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