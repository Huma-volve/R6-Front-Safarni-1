import { useQuery } from "@tanstack/react-query"
import { allTrendingTours } from "../api/HomeAPI"
import type { TrendingToursResponse } from "../types/types";

export function useAvailableTours(){
    return useQuery<TrendingToursResponse[],Error>({
        queryKey:["avail_tours"],
        queryFn: allTrendingTours,
})
}