import type { HotelData } from "../../types/Khaled/Fav/types";

type Data = {
  data: HotelData[];
};

export async function getAllHotels(): Promise<Data> {
  const token = localStorage.getItem("authToken");
  return await fetch(
    "https://round7-safarni-team-one.huma-volve.com/api/hotels",
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
