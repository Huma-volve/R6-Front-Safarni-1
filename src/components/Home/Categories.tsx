import { useCategory } from "../../hooks/useCategory";
import { NavLink } from "react-router-dom";

import flight from "../../assets/flight.png";
import cars from "../../assets/car.png";
import tours from "../../assets/tour.png";
import hotel from "../../assets/hotel.png";
import Loading from "../Loading/Loading";

export default function Categories() {
  const { data, isLoading, error } = useCategory();

  if (isLoading) return <Loading />;
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

  const imageMap: Record<string, string> = {
    flight,
    cars,
    tours,
    hotel,
  };

  const filteredCategories = data.filter((category) =>
    ["flight", "cars", "tours", "hotel"].includes(category.title.toLowerCase())
  );

  return (
    <>
      <div className="md:mx-[100px]">
        <h1 className="px-4 font-poppins font-medium text-[25px] leading-[100%] tracking-normal text-[#111928]">
          Categories
        </h1>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="flex gap-6 md:justify-between w-full m-10">
            {filteredCategories.slice(0, 4).map((category, index) => {
              const title = category.title.toLowerCase();
              const link = title === "tours" ? "/internalTours" : `/${title}`;

              return (
                <NavLink
                  key={index}
                  to={link}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    className="md:w-[248px] md:h-[248px] w-[100px] h-[100px] rounded-full"
                    src={imageMap[title]}
                    alt={category.title}
                  />
                  <h1 className="font-poppins font-medium md:text-3xl text-2xl leading-[100%] tracking-normal text-[#1A56DB]">
                    {category.title}
                  </h1>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
