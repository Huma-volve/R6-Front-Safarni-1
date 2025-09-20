import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { TourCardProps } from "../../types/mohamed/types";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";

const TourCard = ({ tour }: TourCardProps) => {
  const navigate = useNavigate();
  const toggleFavoriteMutation = useToggleFavorite();
  const isFavorite = !!tour.is_favorite;

  const handleSelect = () => {
    navigate(`/destination/${tour.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation.mutate({
      id: tour.id,
      currentlyFavorite: isFavorite,
    });
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-[0_0_26.37px_0_rgba(111,111,111,0.25)] hover:shadow-lg transition-all duration-300 cursor-pointer  p-2 md:p-4"
      onClick={handleSelect}
    >
      <div className="relative">
        <div className="w-full rounded-lg overflow-hidden mb-3">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-44 md:w-full h-44 rounded-lg object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-sm font-medium text-gray-400">Full Day Tours</p>
          </div>

          <div className="flex items-center gap-2">
            {tour.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{tour.rating}</span>
              </div>
            )}
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
          {tour.title}
        </h3>

        <div className="flex items-center flex-row">
          <p className="flex items-center gap-1 text-sm text-gray-500 font-medium">
            From
            <span className="text-blue-600 font-semibold"> {tour.price}</span>$
            Per Person
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
