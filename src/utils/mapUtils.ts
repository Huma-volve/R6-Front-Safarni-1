import L from "leaflet";

export const setMarker = (
  map: L.Map,
  layer: L.LayerGroup,
  coords: [number, number],
  label: string,
  zoom: number
) => {
  map.setView(coords, zoom);
  layer.clearLayers();
  L.marker(coords).addTo(layer).bindPopup(label).openPopup();
};

export const fetchOverpassData = async (
  type: string,
  bounds: L.LatLngBounds,
  layer: L.LayerGroup
) => {
  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();

  const query = `
      [out:json];
      (
        ${
          type === "restaurant"
            ? `node["amenity"="restaurant"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});`
            : ""
        }
        ${
          type === "hotel"
            ? `node["tourism"="hotel"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});`
            : ""
        }
        ${
          type === "attraction"
            ? `node["tourism"="attraction"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});`
            : ""
        }
      );
      out;
    `;

  const res = await fetch("https://lz4.overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "data=" + encodeURIComponent(query),
  });

  const data = await res.json();

  if (data.elements && data.elements.length > 0) {
    data.elements.forEach(
      (el: { lat: number; lon: number; tags?: { name?: string } }) => {
        if (el.lat && el.lon) {
          L.marker([el.lat, el.lon])
            .addTo(layer)
            .bindPopup(el.tags?.name || "unnamed place");
        }
      }
    );
  }
};
