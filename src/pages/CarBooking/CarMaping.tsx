import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitToBounds({
  company,
  user,
}: {
  company: [number, number];
  user: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (company && user) {
      map.fitBounds([company, user], { padding: [50, 50] });
    }
  }, [company, user, map]);

  return null;
}

export default function CarMap() {
  const companyPosition: [number, number] = [30.0444, 31.2357];

  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      bounds={
        userPosition
          ? [companyPosition, userPosition]
          : [companyPosition, companyPosition]
      }
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={companyPosition}>
        <Popup>🚗 Car at the company</Popup>
      </Marker>

      {userPosition && (
        <>
          <Marker position={userPosition}>
            <Popup>📍 Your location</Popup>
          </Marker>
          <Polyline
            positions={[companyPosition, userPosition]}
            pathOptions={{ color: "red" }}
          />
          <FitToBounds company={companyPosition} user={userPosition} />
        </>
      )}
    </MapContainer>
  );
}
