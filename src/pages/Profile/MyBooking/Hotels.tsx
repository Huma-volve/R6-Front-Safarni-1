import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { useQuery } from '@tanstack/react-query';
import { getAllHotels } from '../../../api/Booking/Hotels';
import type { HotelData } from '../../../types/types';
import Loading from '../../../components/Loading/Loading';

const Hotels = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getAllHotels(),
  });

  const hotels: HotelData[] = data?.data || [];

  if (isLoading) return <div className="text-center text-black">
    <Loading />
  </div>;
  if (error instanceof Error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-6">
      {hotels.map((item) => (
        <div key={item.id} className="relative w-full mt-6 rounded-lg border border-gray-600 overflow-hidden p-4 bg-white shadow-md">

          <div className="absolute top-2 right-2 text-blue-600 font-medium flex items-center space-x-1">
            <StarRateRoundedIcon className="inline text-yellow-400" />
            <span>{item.average_rating}</span>
          </div>

          <div className="flex items-center space-x-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"/>

            <div className="flex flex-col justify-between">
              <span className="font-semibold text-lg">{item.name}</span>
              <span className="text-gray-500">{item.location}</span>
              <span className="text-black"><StarRateRoundedIcon className="inline text-yellow-400" /> {item.average_rating}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Hotels;
