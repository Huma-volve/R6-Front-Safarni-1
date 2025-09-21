import api from "./api";
import type { Tour } from "../types/mohamed/types";

export const getTourSearch = async (search = ""): Promise<Tour[]> => {
  try {
    const params = search.trim() ? { search: search.trim() } : {};

    const res = await api.get("/tours", { params });
    console.log(res.data);

    return res.data?.data ?? [];
  } catch (error) {
    console.error("Error fetching tours:", (error as Error).message || error);
    return [];
  }
};
