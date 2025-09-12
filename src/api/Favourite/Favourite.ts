import type { FavoriteData } from "../../types/types";

type Data = {
  data: FavoriteData[]
}

export default async function getAllFavorites(): Promise<Data> {
  return await fetch("https://round5-safarnia.huma-volve.com/api/favorites", {
    method: "GET",
    headers: {
      "Authorization": "Bearer 38|fSdtjlVDoNAG630qkSCli05PL06AG64UMkQ7uVmHde778a55",
      "Accept": "application/json"
    }
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
