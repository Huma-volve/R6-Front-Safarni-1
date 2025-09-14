import { useState } from "react";
import { useAvailableTours } from "../../hooks/useAvailableTours";
import { StarIcon } from "@heroicons/react/24/outline";

const TOURS_PER_SLIDE = 4;
export default function AvailableTour() {
  const { data, isLoading, error } = useAvailableTours();
  const [showAll, setShowAll] = useState(false);
  const visibleTours = showAll ? data : data?.slice(0, TOURS_PER_SLIDE);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;
  if (!data) return <p>No data!</p>;
  
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="m-20 font-poppins font-medium text-[25px] leading-[100%] tracking-normal text-[#111928]">
          Available Tours
        </h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#1C64F2] m-20 text-[22px]"
        >
          {showAll ? "View less" : "View all"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {visibleTours?.map((tour) => (
          <div key={tour.id} className="flex flex-row justify-start items-center w-[608px] h-[182px] rounded-2xl shadow-[0_4px_10px_0_#6F6F6F40]">
            <img
              className="w-[150px] h-[150px] ml-3 mr-3 rounded-[8px]"
              src={tour.image}
              alt="img"
            />
            <div>
              <div className="flex justify-between items-start gap-70">
                <h1 className=" font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#6B7280]">
                  Full Day Tour
                </h1>
                <div className="flex justify-end items-center">
                  <StarIcon className="w-[23px] h-[23px] fill-[#FCBA42] text-[#FCBA42]" />
                  <p className="font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#111928]">
                    {tour.rating}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2.5">
                  <p className="font-poppins font-medium text-[22px] leading-[41px] tracking-normal text-[#111928]">
                    {tour.location}
                  </p>
                  <p className="font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#6B7280]">
                    From <span className="text-[#1C64F2]">{tour.price}$ </span>
                    per person
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
