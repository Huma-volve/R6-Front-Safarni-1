import { Bed, House, Utensils } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";

const CategoryFilters = ({
    onFilter,
    onSetHome,
}: {
    onFilter?: (type: string) => void;
    onSetHome?: (coords: [number, number]) => void;
}) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const { location, error, getLocation } = useGeolocation();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleSetHome = () => {
        setActiveButton("home");
        getLocation();
    };

    useEffect(() => {
        if (location && activeButton === "home") {
            onSetHome?.([location.latitude, location.longitude]);
        }
    }, [location, activeButton]);

    useEffect(() => {
        if (error) {
            alert(error);
            setActiveButton(null);
        }
    }, [error]);

    const handleFilter = (type: string) => {
        setActiveButton(type);
        onFilter?.(type);
    };

    const getButtonClasses = (buttonType: string) => {
        const baseClasses = "categoryFilter";
        const isActive = activeButton === buttonType;

        if (isActive) {
            return `${baseClasses} !bg-blue-50 text-blue-600`;
        } else {
            return `${baseClasses} bg-white text-gray-700 `;
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY; // حرك يمين/شمال
        }
    };
    return (
        <>
            {/* Category Filters */}
            <div className="pb-4 relative z-20">
                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    className="flex gap-3 mx-4 md:mx-[100px] overflow-x-auto scrollbar-hide md:flex-wrap md:justify-between"
                >
                    <button
                        onClick={handleSetHome}
                        className={getButtonClasses("home")}
                    >
                        {/* Home Icon */}
                        <House className="h-5 w-5" />
                        Set Home
                    </button>
                    <button
                        onClick={() => handleFilter("restaurant")}
                        className={getButtonClasses("restaurant")}
                    >
                        {/* Restaurant Icon */}
                        <Utensils className="h-5 w-5" />
                        Restaurants
                    </button>
                    <button
                        onClick={() => handleFilter("attraction")}
                        className={getButtonClasses("attraction")}
                    >
                        {/* Tourist Places Icon */}
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M.167 25.5V23h2.5V11.75h-2.5v-2.5L12.667.5l12.5 8.75v2.5h-2.5V23h2.5v2.5zm7.5-5h2.5v-5l2.5 3.75 2.5-3.75v5h2.5v-8.75h-2.5l-2.5 3.75-2.5-3.75h-2.5zm12.5 2.5V8.813l-7.5-5.25-7.5 5.25V23z"
                                fill={
                                    activeButton === "attraction"
                                        ? "CurrentColor"
                                        : "CurrentColor"
                                }
                            />
                        </svg>
                        Tourist Places
                    </button>
                    <button
                        onClick={() => handleFilter("hotel")}
                        className={getButtonClasses("hotel")}
                    >
                        {/* Hotel Icon */}
                        <Bed className="h-5 w-5" />
                        Hotel
                    </button>
                </div>
            </div>
        </>
    );
};

export default CategoryFilters;
