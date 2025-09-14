import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../../api/Booking/Tours";
import type { TourData } from "../../../types/types";
import Loading from "../../../components/Loading/Loading";

const Tours = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  const tours: TourData[] = data?.data || [];

  if (isLoading)
    return <div className="text-center text-black">
      <Loading />
    </div>;
  if (error instanceof Error)
    return <div className="text-red-500">Error: {error.message}</div>;

  if (tours.length === 0) {
    return <div className="text-center text-gray-500">No Tours Available</div>;
  }

  return (
    <div className="space-y-4">
      {tours.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white shadow-sm p-3"
        >
          <img
            src={item.image || "https://via.placeholder.com/100"}
            alt={item.name}
            className="w-28 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">{item.type || "Full Day Tour"}</p>
            <h2 className="text-lg font-semibold">{item.name || "Luxor"}</h2>
            <p className="text-sm text-gray-600">
              From{" "}
              <span className="text-blue-600 font-medium">
                {item.price || 150}$
              </span>{" "}
              Per Person
            </p>
          </div>

          <div className="flex items-center text-yellow-500">
            <Star className="w-5 h-5 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium text-black">
              {item.rating || 4.3}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tours;
