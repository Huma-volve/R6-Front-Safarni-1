import type { FlightData } from "../../types/Khaled/Fav/types";

type Data = {
  data: FlightData[];
};

export async function getAllFlight(): Promise<Data> {
  const token = localStorage.getItem("authToken");
  return await fetch(
    "https://round7-safarni-team-one.huma-volve.com/api/flights",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
