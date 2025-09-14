import { useQuery } from "@tanstack/react-query"
import { allCategories } from "../api/HomeAPI"
import type { CategoryResponse } from "../types/types";

export function useCategory(){
    return useQuery<CategoryResponse[],Error>({
        queryKey:["category"],
        queryFn: allCategories,
})
}