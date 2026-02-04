const getDayLocations = (data, dayIndex) => {
  const day = data?.days?.[dayIndex - 1];
  if (!day) return [];

  return day.sections.flatMap(section =>
    section.activities
      .filter(a => a.location)
      .map(a => a.location)
  );
};

const DayMap = ({ city, day, data }) => {
  const locations = getDayLocations(data, day);

  const query =
    locations.length > 0
      ? locations.join(" | ")
      : `tourist attractions in ${city}`;

  return (
    <iframe
      title="day-map"
      className="w-full h-full"
      loading="lazy"
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`}
    />
  );
};

export default DayMap;
