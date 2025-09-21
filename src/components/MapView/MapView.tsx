import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchAppBar from "../SearchMap/SearchMap";
import { setMarker, fetchOverpassData } from "../../utils/mapUtils";

const MapView = () => {
    const mapRef = useRef<L.Map | null>(null);
    const markersLayer = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (mapRef.current) return;

        mapRef.current = L.map("map", {
            zoomControl: false,
            attributionControl: false,
        }).setView([31.2001, 29.9187], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(mapRef.current);

        markersLayer.current = L.layerGroup().addTo(mapRef.current);
    }, []);

    const handleSearchLocation = (coords: [number, number]) => {
        if (mapRef.current && markersLayer.current) {
            setMarker(
                mapRef.current,
                markersLayer.current,
                coords,
                "📍 Here",
                14
            );
        }
    };

    const handleSetHome = (coords: [number, number]) => {
        if (mapRef.current && markersLayer.current) {
            setMarker(
                mapRef.current,
                markersLayer.current,
                coords,
                "🏠 Home",
                16
            );
        }
    };

    const handleFilter = async (type: string) => {
        if (mapRef.current && markersLayer.current) {
            markersLayer.current.clearLayers();
            await fetchOverpassData(
                type,
                mapRef.current.getBounds(),
                markersLayer.current
            );
        }
    };

    return (
        <>
            <SearchAppBar
                onSearch={handleSearchLocation}
                onFilter={handleFilter}
                onSetHome={handleSetHome}
            />
            <div id="map" className="h-screen w-screen z-0"></div>
        </>
    );
};

export default MapView;
