
export interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: number;
  model: string;
  image?: string;
  transmission: string;
  seats: number;
  fuel_type: string;
  brand: string;
  category_id: number;
  category: Category;
  daily_rate: string;
  has_ac: boolean | number;
  created_at: string;
  updated_at: string;
}

export interface BrandCount {
  name: string;
  count: number;
}

export const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};

export const fetchCarsData = async (): Promise<Car[]> => {
  const response = await fetch(
    "https://round5-safarnia.huma-volve.com/api/cars",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
    }
  );
  const data = await response.json();
  return data.cars;
};

export const pickUpCar = async (id: number | string): Promise<void> => {
  const response = await fetch(
    `https://round5-safarnia.huma-volve.com/api/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
      body: JSON.stringify({
        car_id: id,
        pickup_date: formatDate(new Date()),
        return_date: formatDate(new Date(Date.now() + 86400000)),
      }),
    }
  );

  const data = await response.json();
  console.log(data);
};

export const filterCarsBySearch = (cars: Car[], searchTerm: string): Car[] => {
  return cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterCarsByBrand = (cars: Car[], brand: string): Car[] => {
  return brand === "All" ? cars : cars.filter((car) => car.brand === brand);
};

export const calculateBrands = (cars: Car[]): BrandCount[] => {
  const brands: BrandCount[] = [{ name: "All", count: cars.length }];
  
  cars.forEach((car) => {
    const existingBrand = brands.find((b) => b.name === car.brand);
    if (existingBrand) {
      existingBrand.count += 1;
    } else {
      brands.push({ name: car.brand, count: 1 });
    }
  });
  
  return brands;
};

export const fetchCarDetails = async (id: string): Promise<Car> => {
  const response = await fetch(
    `https://round5-safarnia.huma-volve.com/api/cars/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const calculateHourlyRate = (dailyRate: string): string => {
  const daily = parseFloat(dailyRate);
  return (daily / 24).toFixed(2);
};