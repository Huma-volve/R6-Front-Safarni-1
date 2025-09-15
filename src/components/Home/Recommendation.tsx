import { useState } from "react";
import { useRecommendedTour } from "../../hooks/useRecommendedTour";
import { StarIcon } from "@heroicons/react/24/outline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const TOURS_PER_SLIDE = 4;
export default function Recommendation() {
  const { data, isLoading, error } = useRecommendedTour();

  const [showAll, setShowAll] = useState(false);
  const visibleTours = showAll ? data : data?.slice(0, TOURS_PER_SLIDE);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;
  if (!data) return <p>No data!</p>;
  return (
    <>
      .
      <div className="md:mx-[100px]">
        <div className="flex flex-row justify-between p-4 md:p-0 items-center">
          <h1 className="font-poppins font-medium text-2xl text-[#111928]">
            Recommendation
          </h1>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#1C64F2] font-semibold text-xl"
          >
            {showAll ? "View less" : "View all"}
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-0">
            {visibleTours?.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col items-center p-2 rounded-2xl shadow-[0_4px_10px_0_#6F6F6F40] overflow-hidden"
              >
                <img className=" rounded-[8px]" src={tour.image} alt="img" />
                <div className="text-left w-full mt-2">
                  <h1 className="m-2 pb-2 font-poppins font-medium md:text-lg leading-[100%] tracking-normal text-[#111928]">
                    {tour.title}
                  </h1>

                  <div className="flex justify-between">
                    <div className="flex justify-start items-start">
                      <LocationOnOutlinedIcon className="text-[#1C64F2]" />{" "}
                      <p className="text-[#9CA3AF]">{tour.location}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <StarIcon className="w-[23px] h-[23px] fill-[#FCBA42] text-[#FCBA42]" />
                      <p className="font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#111928]">
                        {tour.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
