import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tour } from "../types/mohamed/types";
import { addFavorite, removeFavorite } from "../api/favorites";

type Vars = { id: number | string; currentlyFavorite: boolean };
type Context = { previousTours?: Tour[]; previousFavorites?: number[] };

export const useToggleFavorite = () => {
  const qc = useQueryClient();

  return useMutation<void, unknown, Vars, Context>({
    mutationFn: async ({ id, currentlyFavorite }) => {
      if (!currentlyFavorite) {
        await addFavorite(id);
      } else {
        await removeFavorite(id);
      }
    },

    onMutate: async ({ id, currentlyFavorite }) => {
      await qc.cancelQueries({ queryKey: ["tours"] });
      await qc.cancelQueries({ queryKey: ["favorites"] });

      const previousTours = qc.getQueryData<Tour[]>(["tours"]);
      const previousFavorites = qc.getQueryData<number[]>(["favorites"]);

      const numericId = typeof id === "string" ? parseInt(id) : id;

      qc.setQueryData<Tour[] | undefined>(["tours"], (old) =>
        old?.map((t) =>
          t.id === id || t.id === numericId
            ? { ...t, is_favorite: !currentlyFavorite }
            : t
        )
      );

      qc.setQueryData<number[] | undefined>(["favorites"], (old) => {
        if (!currentlyFavorite) {
          if (!old) return [numericId];
          if (old.includes(numericId)) return old;
          return [...old, numericId];
        } else {
          return old?.filter((fid) => fid !== numericId) ?? [];
        }
      });

      return { previousTours, previousFavorites };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTours) {
        qc.setQueryData(["tours"], context.previousTours);
      }
      if (context?.previousFavorites) {
        qc.setQueryData(["favorites"], context.previousFavorites);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tours"] });
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
