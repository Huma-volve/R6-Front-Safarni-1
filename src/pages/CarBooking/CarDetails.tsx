import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import AirIcon from "@mui/icons-material/Air";
import PeopleIcon from "@mui/icons-material/People";
import car from "../../assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Car } from "../../types/CarBooking/CarTypes";
import {
  fetchCarDetails,
  calculateHourlyRate,
  pickUpCar,
} from "../../types/CarBooking/CarTypes";

const CarDetailsApp = () => {
  const params = useParams<{ id: string }>();
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCarDetails = async () => {
      if (params.id) {
        const data = await fetchCarDetails(params.id);
        setCarDetails(data);
        console.log(data);
      }
    };
    loadCarDetails();
  }, [params.id]);

  const handlePickUp = async () => {
    if (params.id) {
      await pickUpCar(params.id);
      alert("Car booked successfully!");
      navigate("/carMap");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <ArrowBackIosIcon
            className="text-gray-600 cursor-pointer bg-gray-100 rounded-full p-2 w-10 h-10"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full h-full">
            <div className="relative w-full h-full rounded-4xl overflow-hidden">
              <div className="bg-gray-100 w-full h-full mx-auto flex items-center justify-center relative overflow-hidden">
                <div className="rounded-lg flex items-center justify-center">
                  <div className="text-white text-6xl">
                    <img src={car} alt="Car" className="rounded-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-5">
                {carDetails?.brand} {carDetails?.model}
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center border border-gray-200 p-4 bg-white rounded-lg flex flex-col items-center justify-center">
                  <SettingsIcon className="text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500 mb-1">Transmission</div>
                  <div className="font-semibold text-gray-900">
                    {carDetails?.transmission || "Not specified"}
                  </div>
                </div>
                <div className="text-center border border-gray-200 p-4 bg-white rounded-lg flex flex-col items-center justify-center">
                  <LocalGasStationIcon className="text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500 mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-900">
                    {carDetails?.fuel_type || "Not specified"}
                  </div>
                </div>
                <div className="text-center border border-gray-200 p-4 bg-white rounded-lg flex flex-col items-center justify-center">
                  <AirIcon className="text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500 mb-1">AC</div>
                  <div className="font-semibold text-gray-900">
                    {carDetails?.has_ac ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-center border border-gray-200 p-4 bg-white rounded-lg flex flex-col items-center justify-center">
                  <PeopleIcon className="text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500 mb-1">Seats</div>
                  <div className="font-semibold text-gray-900">
                    {carDetails?.seats || "Not specified"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Plan</h2>

              <div className="space-y-4">
                <div className="border-2 border-blue-200 rounded-l-lg flex items-center">
                  <div className="w-[80px] h-[82px] bg-blue-100 rounded-l-lg flex items-center justify-center mr-4">
                    <div className="flex flex-col items-center">
                      <AccessTimeIcon className="text-blue-600 mb-1" />
                      <div className="text-lg font-medium text-blue-600">
                        $
                        {carDetails
                          ? calculateHourlyRate(carDetails.daily_rate)
                          : "0.00"}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      Hourly Rent
                    </div>
                    <div className="text-sm text-gray-500">
                      Best for business appointments
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 bg-white rounded-l-lg flex items-center">
                  <div className="w-[80px] h-[82px] bg-gray-100 rounded-l-lg flex items-center justify-center mr-4">
                    <div className="flex flex-col items-center">
                      <CalendarTodayIcon className="text-gray-400 mb-1" />
                      <div className="text-lg font-medium text-gray-900">
                        ${carDetails?.daily_rate || "0.00"}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      Daily Rent
                    </div>
                    <div className="text-sm text-gray-500">
                      Perfect for outstation trips
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Location
              </h3>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <LocationOnIcon className="text-gray-400 mr-3" />
                <span className="text-gray-600">
                  200-298 Clipper St San Francisco
                </span>
              </div>
            </div>

            <button
              onClick={handlePickUp}
              className="w-full bg-[#1E429F] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1E429F] transition-colors"
            >
              Pick Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsApp;
