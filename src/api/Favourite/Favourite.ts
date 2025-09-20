import type { FavoriteData } from "../../types/Khaled/Fav/types";

type Data = {
  data: FavoriteData[]
}

export default async function getAllFavorites(): Promise<Data> {
  const token = localStorage.getItem("authToken");
  return await fetch("https://round5-safarnia.huma-volve.com/api/favorites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      return { data: data.data }; 
    })
    .catch((err) => {
      console.log(err);
      return { data: [] }; 
    });
}
