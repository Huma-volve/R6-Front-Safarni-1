import type {
  CategoryResponse,
  RecommendedTourResponse,
  TrendingToursResponse,
} from "../types/types";

export async function allCategories(): Promise<CategoryResponse[]> {
  try {
    const res = await fetch(
      "https://round5-safarnia.huma-volve.com/api/allcategory",
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

    return data.data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}

export async function allRecommendedTours(): Promise<
  RecommendedTourResponse[]
> {
  try {
    const res = await fetch(
      "https://round5-safarnia.huma-volve.com/api/recommendedtour",
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

export async function allTrendingTours(): Promise<TrendingToursResponse[]> {
  try {
    const res = await fetch(
      "https://round5-safarnia.huma-volve.com/api/trending-tours",
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
