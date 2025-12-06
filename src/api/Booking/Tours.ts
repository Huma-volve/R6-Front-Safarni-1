import type { TourData } from "../../types/Khaled/Fav/types";

type Data = {
  data: TourData[];
};

export async function getAllTours(): Promise<Data> {
  const token = localStorage.getItem("authToken");
  return await fetch(
    "https://round7-safarni-team-one.huma-volve.com/api/my-tour-bookings",
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
