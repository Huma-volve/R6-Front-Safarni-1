import { useQuery } from "@tanstack/react-query";
import { allRecommendedTours } from "../api/HomeAPI";
import type { RecommendedTourResponse } from "../types/types";

export function useRecommendedTour() {
  return useQuery<RecommendedTourResponse[], Error>({
    queryKey: ["recommendedTour"],
    queryFn: allRecommendedTours,
  });
}
