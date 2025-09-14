import type { SearchToursResponse } from "../types/types";
export async function allSearchedTours(
  params: string
): Promise<SearchToursResponse[]> {
  try {
    const res = await fetch(
      `https://round5-safarnia.huma-volve.com/api/tours${params}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
