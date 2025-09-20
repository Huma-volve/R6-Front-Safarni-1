import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import LocationImage from "../assets/location-icon.png";
import { useLocation } from "../../hooks/useLocation";
// eslint-disable-next-line react-refresh/only-export-components
export function createURL(query: string): string {
  const Payload = {
    location: query,
  };
  return `?location=${Payload.location}`;
}
export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useLocation();
  if (isLoading) return <p>Loading...</p>;
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

  const filteredLocations = data.data.filter((loc: string) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );
  function handleSubmit(location: string) {
    const url = createURL(location.split(",")[0].trim());
    navigate(`/tours${url}`);
  }
  return (
    //  <div className="flex flex-row items-center justify-center mt-10 md:mt-40">
    // <div className="w-full flex items-center gap-6 m-auto px-5 md:mx-[120px]">
    //   <BackButton
    //     className="w-[43px] h-[43px] rounded-full p-[10px] bg-[#F3F4F6] flex items-center justify-center"
    //     onClick={() => navigate(-1)}
    //   />
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center mt-5">
        <div className=" flex gap-5">
          <BackButton
            className="w-[43px] h-[43px] rounded-full p-[10px]  bg-[#F3F4F6] flex items-center justify-center"
            onClick={() => navigate(-1)}
          />
          <form onSubmit={() => {}} className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3F83F8]" />
            <Input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              // w-230
              className=" w-full h-10 pl-10 pr-4 py-2 border border-[#3F83F8] rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-[#ffffff] shadow-[0_4px_10px_0_#3F52B433]"
            />
          </form>
        </div>
        <div className="flex flex-col justify-center items-center">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((response: string) => (
              <>
                <button
                  onClick={() => handleSubmit(response)}
                  className="w-[62rem] h-28 flex items-center gap-3 text-gray-900 font-semibold text-xl"
                >
                  <img
                    className="w-18 "
                    src={LocationImage}
                    alt="location-img"
                  />
                  {response}
                </button>
              </>
            ))
          ) : (
            <p className="text-red-800 font-semibold align-center text-2xl">
              No Search Results Found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
