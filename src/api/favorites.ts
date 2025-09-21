// api/favorites.ts
import type { Tour } from "../types/mohamed/types";
import api from "./api";

// Get Data favorites
export const getFavorites = async (): Promise<Tour[]> => {
  try {
    const res = await api.get("/favorites");
    return res.data.data || res.data || [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching favorites:", error.message);
    } else {
      console.error("Error fetching favorites:", error);
    }
    return [];
  }
};

// Add favorite
export const addFavorite = async (id: number | string) => {
  try {
    const res = await api.post(`/favorites/add/${id}`, { id });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding favorite:", error.message);
    } else {
      console.error("Error adding favorite:", error);
    }
    throw error;
  }
};

// Delete favorite
export const removeFavorite = async (id: number | string) => {
  try {
    const res = await api.delete(`/favorites/remove/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error removing favorite:", error.message);
    } else {
      console.error("Error removing favorite:", error);
    }
    throw error;
  }
};
