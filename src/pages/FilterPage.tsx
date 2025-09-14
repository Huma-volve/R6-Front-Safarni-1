import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useState } from "react";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { StarIcon } from "@heroicons/react/24/outline";
import Image1 from "../assets/adventure.png";
import Image2 from "../assets/city.png";
import Image3 from "../assets/water.png";
import Image4 from "../assets/travel.png";
import Slider from "@mui/material/Slider";
import ChartImage from "../assets/chart-img.png";
type createURLParams = {
  priceRange: number[];
  query: string;
};
// eslint-disable-next-line react-refresh/only-export-components
export function createURL({ priceRange, query }: createURLParams): string {
  const Payload = {
    max_price: priceRange[1] - priceRange[0],
    location: query,
    min_rating: 1,
  };
  return `?location=${Payload.location}&max_Price=${Payload.max_price}&min_rating=${Payload.min_rating}`;
}
export default function FilterPage() {
  const [activeFilter, setActiveFilter] = useState("");
  const [activeSelect, setActiveSelect] = useState<string[]>([]);
  const [activeRating, setActiveRating] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 8500]);
  const [query, setQuery] = useState("");
  // const params = new URLSearchParams();

  // const [activeSelectText, setActiveSelectText] = useState("");
  const navigate = useNavigate();
  function handleSubmit() {
    const url = createURL({ priceRange, query });
    console.log(url);
    navigate("/tours${url}");
  }

  const filterArray = [
    "Price (Low to High)",
    "Price (High to Low)",
    "Biggest Deals (Highest Saving)",
    "Most Reviewed",
    "Most Popular",
  ];
  const multiSelectArray = [
    "Adventure Travel",
    "City Breaks",
    "Water Activity",
    "Road Trips",
  ];
  const ratingStars = [1, 2, 3, 4, 5];

  const Images = [Image1, Image2, Image3, Image4];
  const handleMultiSelect = (item: string) => {
    setActiveSelect((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };
  const handleMultiSelectRating = (item: number) => {
    setActiveRating((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  return (
    //
    <div className=" m-12 flex flex-col">
      <BackButton
        className="w-[43px] h-[43px] rounded-full p-[10px]  bg-[#F3F4F6] flex items-center justify-center"
        onClick={() => navigate(-1)}
      />
      {/* #1F2A37 */}
      <h1 className="mb-5 font-poppins font-medium text-[28px] leading-[47px] tracking-normal text-[#1F2A37 ]">
        Sort By
      </h1>
      <div className="flex flex-row flex-wrap gap-3">
        {filterArray.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(item)}
            className={`p-5 border-[#EBF5FF] border-[2px] text-[#4B5563] rounded-full flex flex-row gap-3 ${
              activeFilter === item
                ? "text-[#1E429F] bg-[#EBF5FF]"
                : "bg-[#FFFFFF]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <hr className="mt-10 mb-10 flex-grow border-[#D1D5DB]" />
      <h1 className="mb-5 font-poppins font-medium text-[28px] leading-[47px] tracking-normal text-[#1F2A37 ]">
        Budget Range
      </h1>
      <img src={ChartImage} alt="chart" />
      <Slider
        value={priceRange}
        onChange={(_, newValue) => setPriceRange(newValue as number[])}
        valueLabelDisplay="auto"
        min={0}
        max={8500}
        step={1}
      />
      <div className="flex justify-between">
        <div
          className="flex flex-col  items-center font-bold 
        md:text-2xl text-sm text-gray-600"
        >
          <h1>Min</h1>
          <p>${priceRange[0]}</p>
        </div>
        <div
          className="flex flex-col items-center font-bold
        md:text-2xl text-sm text-gray-600"
        >
          <h1>Max</h1>
          <p>${priceRange[1]}</p>
        </div>
      </div>
      <hr className="mt-10 mb-10 flex-grow border-[#D1D5DB]" />
      <h1 className="mb-5 font-poppins font-medium text-[28px] leading-[47px] tracking-normal text-[#1F2A37 ]">
        Adventure Style <span className="text-[#6B7280]">Multi Select</span>
      </h1>
      <div className="flex flex-row flex-wrap md:justify-around gap-3">
        {multiSelectArray.map((item, i) => {
          const active = activeSelect.includes(item);
          return (
            <button
              key={i}
              onClick={() => handleMultiSelect(item)}
              className={`p-5 border-[#EBF5FF] border-[2px] text-[#6B7280] 
              font-poppins font-medium text-[18px] leading-[32px] 
              rounded-full flex flex-row items-center gap-3 ${
                active ? " bg-[#EBF5FF] text-[#1E429F]" : " bg-[#FFFFFF]"
              }`}
            >
              <img src={Images[i]} alt={item} className="w-10 h-10" />
              {item}
            </button>
          );
        })}
      </div>
      <hr className="mt-10 mb-10 flex-grow border-[#D1D5DB]" />
      <h1 className="mb-5 font-poppins font-medium text-[28px] leading-[47px] tracking-normal text-[#1F2A37 ]">
        Location
      </h1>
      <form onSubmit={() => {}} className="relative ">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" w-full h-10 pl-10 pr-4 py-2 border border-[#9CA3AF] rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-[#9CA3AF]"
        />
      </form>
      <button
        onClick={() => setQuery("")}
        className="p-5 border-[#EBF5FF] border-[2px] text-[#6B7280] 
          font-poppins font-medium text-[18px] leading-[32px] rounded-full 
          flex flex-row items-center w-30 h-10 mt-2 "
      >
        X {query}
      </button>

      <hr className="mt-10 mb-10 flex-grow border-[#D1D5DB]" />
      <h1 className="mb-5 font-poppins font-medium text-[28px] leading-[47px] tracking-normal text-[#1F2A37 ]">
        Rating <span className="text-[#6B7280]">Multi Select</span>
      </h1>
      <div className="flex flex-row flex-wrap md:justify-around gap-3">
        {ratingStars.map((item, i) => {
          const active = activeRating.includes(item);

          return (
            <button
              key={i}
              onClick={() => handleMultiSelectRating(item)}
              className={`w-[120px] p-5 border-[#EBF5FF] border-[2px] text-[#4B5563] text-xl rounded-full flex items-center justify-center flex-row gap-2 ${
                active ? "text-[#1E429F] bg-[#EBF5FF]" : "bg-[#FFFFFF]"
              }`}
            >
              <StarIcon className="w-[23px] h-[23px] text-[#4B5563]" />
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between mt-20">
        <button
          className="md:w-[510px] md:h-[56px] w-sm h-sm  rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] border-[1px] border-[#1E429F] text-[#1E429F]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize"
          onClick={() => navigate("/")}
        >
          Clear all
        </button>
        <button
          className="md:w-[510px] md:h-[56px] w-sm h-sm  rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#1E429F] text-[#FFFFFF]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
