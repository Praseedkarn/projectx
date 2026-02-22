export function parseMultiDayText(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const result = {
    title: "",
    estimatedBudget: "",
    days: [],
  };

  let currentDay = null;
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

    /* ================= DAY ================= */
    if (/^day\s+\d+/i.test(line)) {
      currentDay = {
        day: line.toUpperCase(),
        sections: [],
      };

      result.days.push(currentDay);
      currentSection = null;
      continue;
    }

    /* ================= SECTION (Morning/Afternoon/Evening/Transportation) ================= */
    if (line.startsWith("##")) {
      if (!currentDay) continue;

      currentSection = {
        period: line.replace("##", "").trim(),
        activities: [],
      };

      currentDay.sections.push(currentSection);
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