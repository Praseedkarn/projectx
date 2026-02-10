export function parseMultiDayText(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const result = {
    title: "",
    estimatedBudget: "",
    days: [],
  };

  let currentDay = null;
  let currentSection = null;

  for (const line of lines) {
    // TITLE
    if (line.startsWith("TITLE:")) {
      result.title = line.replace("TITLE:", "").trim();
      continue;
    }

    // BUDGET
    if (/^estimated budget/i.test(line)) {
      result.estimatedBudget = line.replace(/estimated budget[:₹]*/i, "").trim();
      continue;
    }

    // DAY
    if (/^day\s+\d+/i.test(line)) {
      currentDay = {
        day: line.toUpperCase(),
        sections: [],
      };
      result.days.push(currentDay);
      currentSection = null;
      continue;
    }

    // SECTION
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

    // ✅ INLINE Location support
    if (/location:/i.test(line)) {
      const [desc, loc] = line.split(/location:/i);
      currentSection.activities.push({
        description: desc.trim(),
        location: loc.trim(),
      });
      continue;
    }

    // Normal paragraph
    currentSection.activities.push({
      description: line,
      location: "",
    });
  }

  return result;
}
