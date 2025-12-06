export type DestinationData = {
  id: number;
  description: string;
  image: string;
};

type Data = {
  data: DestinationData[];
};

export default async function getAllDestinations(): Promise<Data> {
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/allcategory",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return { data: json.data || [] };
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return { data: [] };
  }
}
