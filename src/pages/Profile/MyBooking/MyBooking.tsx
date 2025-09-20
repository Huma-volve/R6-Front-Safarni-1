import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import FestivalOutlinedIcon from '@mui/icons-material/FestivalOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import Flight from './Flight';
import Cars from './Cars';
import Tour from './Tours';
import Hotels from './Hotels';
import { useState, type JSX } from 'react';

const MyBooking = () => {
  const [name, setName] = useState<string>("Flight"); 
  const navigate = useNavigate();

  function track(name: string) {
    setName(name);
  }

  const components: Record<string, JSX.Element> = {
    Flight: <Flight />,
    Cars: <Cars />,
    Tour: <Tour />,
    Hotel: <Hotels />,
  };

  return (
    <>
      <div className="container w-full sm:w-[90%] lg:w-[80%] mx-auto mt-6 px-4">
        <KeyboardArrowLeftIcon
          className="cursor-pointer bg-gray-200 rounded-full p-2"
          fontSize="large"
          onClick={() => navigate("/profile")}
        />
        <div className="flex flex-col sm:flex-col items-center gap-5 sm:gap-7 p-5 rounded-lg">
          <h2 className="text-2xl font-semibold">My Booking</h2>
          <div className="btn flex gap-2 justify-between w-full">
            <button
              onClick={() => track("Flight")}
              className="flex-1 min-w-[100px] bg-white hover:scale-[1.05] hover:bg-blue-100 transition-all duration-200 ease-in-out cursor-pointer p-2 border border-gray-500 rounded-full text-black"
            >
              <FlightOutlinedIcon /> Flight
            </button>
            <button
              onClick={() => track("Cars")}
              className="flex-1 min-w-[100px] bg-white hover:scale-[1.05] hover:bg-blue-100 transition-all duration-200 ease-in-out cursor-pointer p-2 border border-gray-500 rounded-full text-black"
            >
              <DirectionsCarFilledOutlinedIcon /> Cars
            </button>
            <button
              onClick={() => track("Tour")}
              className="flex-1 min-w-[100px] bg-white hover:scale-[1.05] hover:bg-blue-100 transition-all duration-200 ease-in-out cursor-pointer p-2 border border-gray-500 rounded-full text-black"
            >
              <FestivalOutlinedIcon /> Tour
            </button>
            <button
              onClick={() => track("Hotel")}
              className="flex-1 min-w-[100px] bg-white hover:scale-[1.05] hover:bg-blue-100 transition-all duration-200 ease-in-out cursor-pointer p-2 border border-gray-500 rounded-full text-black"
            >
              <HotelOutlinedIcon /> Hotel
            </button>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto">{components[name]}</div>
    </>
  );
};

export default MyBooking;
