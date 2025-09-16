import { useQuery } from "@tanstack/react-query";
import { allLocations } from "../api/LocationAPI";
import type { LocationResponse } from "../types/types";

export function useLocation() {
  return useQuery<LocationResponse[], Error>({
    queryKey: ["location"],
    queryFn: allLocations,
  });
}
