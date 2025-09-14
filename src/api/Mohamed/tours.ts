import api from "./api";
import type { Tour } from "../../types/mohamed/types";
// Get single tour by id

export const getTourById = async (id: string): Promise<Tour> => {
    const res = await api.get(`/tours/${id}`);
    return res.data?.data ?? res.data;
  };
