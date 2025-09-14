import type { CarData } from "../../types/Khaled/Fav/types";

type Data = {
  cars: CarData[];
};

export async function getAllCars(): Promise<Data> {
  try {
    const res = await fetch("https://round5-safarnia.huma-volve.com/api/cars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
    });

    const data = await res.json();

    return { cars: data.cars ?? [] }; 
  } catch (err) {
    console.log(err);
    return { cars: [] };
  }
}
