import { useState } from "react";

interface Location {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                setError(null);
            },
            (err) => {
                console.error("Error getting location:", err);
                setError(
                    "Unable to get your location. Please check permissions."
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    };

    return { location, error, getLocation };
};
