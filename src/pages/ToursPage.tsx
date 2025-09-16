import { useState } from "react";
import { Heart } from "lucide-react";
import { StarIcon } from "@heroicons/react/24/outline";
import { useFilteredSearch } from "../hooks/useFilteredSearch";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const TOURS_PER_SLIDE = 4;
export default function AvailableTour() {
  const { data, isLoading, error } = useFilteredSearch();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  console.log(params);
  const location = params.get("location");
  const resultLength = data?.length;

  const visibleTours = showAll ? data : data?.slice(0, TOURS_PER_SLIDE);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-800 font-semibold align-center text-2xl">Error loading items</p>;
  if (!data) return <p className="text-red-800 font-semibold align-center text-2xl">No data!</p>;
  console.log(data);
  return (
    <div className="container mx-auto">
      <div className=" mt-10 flex flex-col">
        <BackButton
          className=" w-[43px] h-[43px] rounded-full p-[10px]  bg-[#F3F4F6] flex items-center justify-center"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex md:flex-row md:justify-between flex-col">
        <div className="flex items-center gap-10">
          <h1 className=" font-poppins font-medium text-[25px] leading-[100%] tracking-normal text-[#111928]">
            {location}
          </h1>
          <p className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-gray-600">
            {resultLength} Results
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#1C64F2] m-20 text-[22px]"
        >
          {showAll ? "View less" : "View all"}
        </button>
      </div>
      <div className="flex flex-wrap justify-start gap-8">
        {visibleTours?.map((tour) => (
          <div className="relative flex flex-col justify-start items-center w-[22%] pb-5 rounded-2xl shadow-[0_4px_10px_0_#6F6F6F40]">
            <img
              className="w-[267px] h-[260px]  mt-4 rounded-[8px]"
              src={tour.image}
              alt="img"
            />
            <div className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md">
              <Heart
                size={22}
                className={
                  !tour.is_favourite
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400"
                }
              />
            </div>
            <div>
              <div className="w-[256px] flex justify-between">
                <h1 className="mt-2 pb-2 font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#111928]">
                  {tour.title}
                </h1>
                <div className="flex justify-end items-center">
                  <StarIcon className="w-[23px] h-[23px] fill-[#FCBA42] text-[#FCBA42]" />
                  <p className="font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#111928]">
                    {tour.rating}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-poppins font-medium text-[15px] leading-[100%] tracking-normal text-[#6B7280]">
                  From <span className="text-[#1C64F2]">{tour.price}$ </span>
                  per person
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
