import SearchCompare from "../../components/Compare/SearchCompare";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../../api/tours";
import TourCard from "../../components/TourCard/TourCard";
import type { Tour } from "../../types/mohamed/types";
import { useState, useMemo } from "react";
import { Loading } from "../../components/Loading/Loading";

const Tours = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: tours = [],
    isLoading,
    isError,
    error,
  } = useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  const filteredTours = useMemo(() => {
    return tours.filter((tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tours, searchQuery]);

  console.log(filteredTours);

  return (
    <>
      <SearchCompare onSearch={setSearchQuery} formInput={"true"} />

      <div className="pt-50 md:pt-60 px-8 md:px-[130px] pb-8 overflow-hidden">
        <div>
          {isLoading && <Loading />}

          {isError && (
            <div className="text-red-600 bg-red-50 border border-red-100 rounded-lg p-4">
              {error instanceof Error ? error.message : "Something went wrong"}
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {filteredTours.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-20">
                  No tours found for "{searchQuery}"
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Tours;
