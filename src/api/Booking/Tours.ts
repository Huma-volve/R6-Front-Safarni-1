import type { TourData } from "../../types/Khaled/Fav/types";

type Data = {
  data: TourData[];
};

export async function getAllTours(): Promise<Data> {
  return await fetch(
    "https://round5-safarnia.huma-volve.com/api/my-tour-bookings",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
