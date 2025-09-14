import { useQuery } from "@tanstack/react-query";

import type { SearchToursResponse } from "../types/types";
import { allSearchedTours } from "../api/FilterAPI";
import { useLocation } from "react-router-dom";

export function useFilteredSearch() {
  const { search } = useLocation();
  return useQuery<SearchToursResponse[], Error>({
    queryKey: ["avail_tours", search],
    queryFn: () => allSearchedTours(search),
  });
}
