import api from "./api";
import type { Tour } from "../types/mohamed/types";

// Get all tours
export const getTours = async (): Promise<Tour[]> => {
  const res = await api.get("/tours");
  console.log(res.data);

  return res.data?.data ?? [];
};

// Get single tour by id
export const getTourById = async (id: string): Promise<Tour> => {
  const res = await api.get(`/tours/${id}`);
  return res.data?.data ?? res.data;
};
