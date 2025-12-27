export const generateTravelItinerary = async (description, detailLevel) => {
  const response = await fetch('/api/ai/itinerary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, detailLevel })
  });

  if (!response.ok) throw new Error('Backend error');
  return response.json();
};
