import { useEffect, useState } from "react";

export const useDebouncedSearch = (
  query: string,
  delay: number = 600
): [number, number] | null => {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!query) return;

    const handler = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  return coords;
};
