import type { FlightData } from "../../types/Khaled/Fav/types";

type Data = {
  data: FlightData[];
};

export async function getAllFlight(): Promise<Data> {
  return await fetch("https://round5-safarnia.huma-volve.com/api/flights", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
