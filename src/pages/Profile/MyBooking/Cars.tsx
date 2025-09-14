import { useQuery } from '@tanstack/react-query';
import { getAllCars } from '../../../api/Booking/Cars';
import type { CarData } from '../../../types/types';
import Loading from '../../../components/Loading/Loading';
import defaultCar from '../../../assets/img/iris1.jpg';

const Cars = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getAllCars(),
  });

  const cars: CarData[] = data || [];

  console.log(data);

  if (isLoading) return <div className="text-center text-black"><Loading /></div>;
  if (error instanceof Error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 mt-6">
      {cars.map((item) => (
        <div key={item.id} className="relative border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-black font-semibold">Daily Rate: {item.daily_rate}$</span>
          </div>

          <img 
            src={item.image || defaultCar} 
            alt={item.model || defaultCar } 
            className="w-33 h-28 object-contain rounded-lg absolute right-[-20px] top-[-30px]" 
          />

          <div className="flex justify-between mt-3 text-sm">
            <div>
              <span className="text-black">{item.model}</span>
            </div>
            <div className="text-center">
              <span className="text-black">{item.seats} Seats</span>
            </div>
            <div className="text-right">
              <span className="text-black font-medium">{item.fuel_type}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Cars;
