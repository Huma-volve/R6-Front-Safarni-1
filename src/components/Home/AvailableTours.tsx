import { useState } from "react";
import { useAvailableTours } from "../../hooks/useAvailableTours";
import { StarIcon } from "@heroicons/react/24/outline";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Loading from "../Loading/Loading";

const TOURS_PER_SLIDE = 4;
export default function AvailableTour() {
  const { data, isLoading, error } = useAvailableTours();
  const [showAll, setShowAll] = useState(false);
  const visibleTours = showAll ? data : data?.slice(0, TOURS_PER_SLIDE);
  if (isLoading)
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      </>
    );
  if (error)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        Error loading items
      </p>
    );
  if (!data)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        No data!
      </p>
    );
  console.log(data);
  return (
    <>
      <div className="md:mx-[100px] px-4 md:px-0 py-10 flex flex-row items-center justify-between">
        <h1 className="font-medium text-2xl leading-[100%] tracking-normal text-[#111928]">
          Available Tours
        </h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#1C64F2] font-semibold text-xl"
        >
          {showAll ? "View less" : "View all"}
        </button>
      </div>
      <div className="md:mx-[100px] px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-4 pb-30 md:pb-10 overflow-x-hidden">
        {visibleTours?.map((tour) => (
          <div
            key={tour.id}
            className="p-2 flex items-center rounded-2xl shadow-[0_4px_10px_0_#6F6F6F40]"
          >
            <img
              className="w-[150px] h-[150px] rounded-lg"
              src={tour.image}
              alt="img"
            />
            <div className="flex flex-col justify-between ml-3 w-full">
              <div className="flex justify-between items-start">
                <h1 className=" font-medium text-[15px] leading-[100%] tracking-normal text-[#6B7280]">
                  Full Day Tour
                </h1>
                <div className="flex justify-end items-center">
                  <StarIcon className="w-[23px] h-[23px] fill-[#FCBA42] text-[#FCBA42]" />
                  <p className="font-medium text-[15px] leading-[100%] tracking-normal text-[#111928]">
                    {tour.rating}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2.5">
                  <p className="font-medium text-[22px] leading-[41px] tracking-normal text-[#111928]">
                    {tour.location}
                  </p>
                  <p className="font-medium text-[15px] leading-[100%] tracking-normal text-[#6B7280]">
                    From <span className="text-[#1C64F2]">{tour.price}$ </span>
                    per person
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NavbarMobile />
    </>
  );
}
