import { useQuery } from "@tanstack/react-query";
import { getTourSearch } from "../../api/getTourSearch";
import { Search } from "lucide-react";
import { useState } from "react";
import CompareCard from "./CompareCard";
import type { Tour } from "../../types/mohamed/types";
import Loading from "../Loading/Loading";

const Card = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const {
    data: tours = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tours", searchQuery],
    queryFn: () => getTourSearch(searchQuery),
    enabled: !!searchQuery,
  });

  if (!searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] rounded-2xl p-8">
        <Search className="text-gray-500" />
        <h2 className="text-xl font-semibold text-gray-500">Search Tours...</h2>
      </div>
    );
  }
  if (isLoading)
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      </>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load tours.
      </div>
    );

  if (tours.length === 0 && !isLoading) {
    return (
      <div className="text-center text-gray-500 mt-20">
        No tours found for "{searchQuery}"
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center mt-32 md:mt-20">
        {tours.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTour(item)}
            className="flex gap-4 items-center bg-gray-50 shadow-[0_0_26.37px_0_rgba(111,111,111,0.25)] hover:shadow-lg transition-all duration-300 cursor-pointer p-2 md:p-4 rounded-2xl"
          >
            <img
              src={item.image}
              alt={item.title || "Tour image"}
              className="w-44 h-44 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg md:text-2xl text-gray-950 font-medium">
                {item.title}
              </h2>
              <p className="text-lg text-gray-500">
                {item.location} | ${item.price}
              </p>
              <p className="h-auto text-lg text-gray-500 line-clamp-2">
                {item.description
                  ? item.description.split(" ").slice(0, 8).join(" ") + "..."
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedTour && <CompareCard tour={selectedTour} />}
    </>
  );
};

export default Card;
