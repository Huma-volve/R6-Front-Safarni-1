export const searchLocation = async (query: string) => {
    if (!query) return null;

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();

    if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)] as [number, number];
    }
    return null;
};
