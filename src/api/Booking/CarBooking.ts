import type { Car } from "../../types/CarBooking/CarTypes";
import { formatDate } from "../../types/CarBooking/CarTypes";

export const fetchCarsData = async (): Promise<Car[]> => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/cars",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data.cars;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const pickUpCar = async (id: number | string): Promise<any> => {
  try {
    const response = await fetch(
      `https://round7-safarni-team-one.huma-volve.com/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
        },
        body: JSON.stringify({
          car_id: id,
          pickup_date: formatDate(new Date()),
          return_date: formatDate(new Date(Date.now() + 86400000)),
        }),
      }
    );

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchCarDetails = async (id: string): Promise<Car | null> => {
  try {
    const response = await fetch(
      `https://round7-safarni-team-one.huma-volve.com/api/cars/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
