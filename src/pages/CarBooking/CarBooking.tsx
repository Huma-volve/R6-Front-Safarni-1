import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../assets/images/download.png";
import carImage from "../../assets/images/download (1).jpeg";
import { Link } from "react-router-dom";
import type { Car, BrandCount } from "../../types/CarBooking/CarTypes";
import {
  fetchCarsData,
  calculateBrands,
  pickUpCar,
  filterCarsBySearch,
  filterCarsByBrand,
} from "../../types/CarBooking/CarTypes";

const CarRentalApp = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [brands, setBrands] = useState<BrandCount[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    const loadCars = async () => {
      const carsData = await fetchCarsData();
      setCars(carsData);
      setFilteredCars(carsData);
    };

    loadCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      const brandData = calculateBrands(cars);
      setBrands(brandData);
    }
  }, [cars]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredCars(filterCarsBySearch(cars, value));
  };

  const handleBrandClick = (brand: string) => {
    setBrandFilter(brand);
    setFilteredCars(filterCarsByBrand(cars, brand));
  };

  const pickUpHandler = (id: number) => {
    pickUpCar(id);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-10 mb-8 w-full">
          <ArrowBackIosNewIcon className="w-5 h-5 text-gray-600 cursor-pointer bg-[#F3F4F6] rounded-full p-0.5" />

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full px-4 py-2 pl-[42px] border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent text-gray-700"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Brands</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleBrandClick(brand.name)}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                  <img src={logo} alt={brand.name} className="rounded-xl" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center mb-3">
                  {brand.name}
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  {brand.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 w-[35%]">
                    {car.model}
                  </h3>
                  <div className="text-4xl">
                    <img
                      src={carImage}
                      alt={car.model}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-5 items-center mb-6 text-sm text-gray-600">
                  <span>{car.transmission}</span>
                  <span>| {car.seats}</span>
                  <span>| {car.fuel_type}</span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => pickUpHandler(car.id)}
                    className="flex-1 bg-[#1E429F] cursor-pointer text-white py-2 px-4 rounded-lg font-medium hover:bg-[#1E429F] transition-colors"
                  >
                    Rent Now
                  </button>
                  <Link
                    to={`/carDetails/${car.id}`}
                    className="flex-1 text-center  border border-[#1E429F] text-[#1E429F] py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalApp;
