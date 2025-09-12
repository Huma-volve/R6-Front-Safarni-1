import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import { useQuery } from '@tanstack/react-query';
import { getAllFlight } from '../../../api/Booking/Flight';
import type { FlightData } from '../../../types/types';
import Loading from '../../../components/Loading/Loading';

const Flight = () => {




  const { isLoading, error, data } = useQuery({
    queryKey: ["flights"],
    queryFn: () => getAllFlight(),
  });




  const flights: FlightData[] = data?.data || [];

  if (isLoading) return <div className="text-center text-black">
    <Loading />
  </div>;
  if (error instanceof Error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 mt-6">
      {flights.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-black font-semibold">{item.from}</span>
            </div>
            <span className="text-black text-sm">{item.departure_time}</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col text-left">
              <span className="text-black font-medium">{item.departure_time}</span>
              <span className="text-black text-sm">{item.from}</span>
            </div>

            <div className="flex flex-col items-center">
              <FlightOutlinedIcon fontSize="small" className="text-black" />
              <span className="text-black text-xs">{item.arrival_time}</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-black font-medium">{item.arrival_time}</span>
              <span className="text-black text-sm">{item.to}</span>
            </div>
          </div>

          <div className="h-[1px] bg-gray-700 my-4"></div>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <span className="block text-lg font-bold text-black">{item.price}$</span>
              <p className="text-black text-sm">Price</p>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-black">{item.id}</span>
              <p className="text-black text-sm">Flight No.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flight;
