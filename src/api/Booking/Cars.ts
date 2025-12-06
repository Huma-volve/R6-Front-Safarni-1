import type { CarData } from "../../types/Khaled/Fav/types";

type Data = {
  cars: CarData[];
};

export async function getAllCars(): Promise<Data> {
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch("https://round7-safarni-team-one.huma-volve.com/api/cars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return { cars: data.cars ?? [] }; 
  } catch (err) {
    console.log(err);
    return { cars: [] };
  }
}
