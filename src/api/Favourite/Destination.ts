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
    const res = await fetch("https://round5-safarnia.huma-volve.com/api/allcategory", {
      method: "GET",
      headers: {
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
        Accept: "application/json",
      },
    });

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
