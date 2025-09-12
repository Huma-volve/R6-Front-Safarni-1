import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHotels } from "../../types/HotelTypes/HotelTypes";
import type { Hotel } from "../../types/HotelTypes/HotelTypes";

const HotelsApp = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const loadHotels = async () => {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
      console.log(hotelsData);
    };
    loadHotels();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recommendation
            </h2>
            <button className="text-[#1E429F] font-medium border-0 hover:text-[#1E429F]">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <div
                onClick={() => navigate(`/hotelReview/${hotel.id}`)}
                key={hotel.id}
                className="bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48  flex items-center justify-center text-6xl">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-[95%] h-[94%] rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="rating flex justify-between items-center mb-2">
                    <div className=" bg-[#EBF5FF] text-[#1E429F] px-3 py-1 rounded-full text-xs font-medium">
                      {hotel.average_rating} Rating
                    </div>
                    <div className=" bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                      <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-black">
                        {hotel.average_rating}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-semibold text-lg text-gray-900 mb-2">
                    {hotel.name}
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm">
                    <LocationOnIcon className="w-3 h-3 mr-1" />
                    {hotel.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Nearby Hotel
            </h2>
            <button className="text-[#1E429F] font-medium border-0 hover:text-[#1E429F]">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div
                onClick={() => navigate(`/hotelReview/${hotel.id}`)}
                key={hotel.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="flex items-center ">
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-[97%] h-[96%] rounded-lg object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col ">
                    <div>
                      <div className="rating flex justify-between items-center mb-2 w-full">
                        <div className="bg-[#EBF5FF] text-[#1E429F] px-3 py-1 rounded-full text-xs font-medium">
                          {hotel.average_rating} Rating
                        </div>
                        <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                          <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-black">
                            {hotel.average_rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <LocationOnIcon className="w-3 h-3 mr-1" />
                        {hotel.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsApp;
