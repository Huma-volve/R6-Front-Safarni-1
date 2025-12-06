import type { LocationResponse } from "../types/types";

export async function allLocations(): Promise<LocationResponse> {
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/locations",
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

    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
