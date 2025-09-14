import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import getAllFavorites from "../../api/Favourite/Favourite";
import { useQuery } from "@tanstack/react-query";
import type { FavoriteData } from "../../types/types";
import Loading from "../../components/Loading/Loading";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type FavoritesResponse = {
  data: FavoriteData[];
};

const Favorites = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<FavoritesResponse>({
    queryKey: ["favorites"],
    queryFn: getAllFavorites,
  });

  const favorites: FavoriteData[] = data?.data || [];
  const [activeFavorites, setActiveFavorites] = useState<number[]>([]);

  function handleBack() {
    navigate("/profile");
  }

  function toggleFavorite(id: number) {
    setActiveFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-black h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className=" w-[80%] mx-auto mb-6">
        <button
          onClick={handleBack}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
          <ArrowBackIcon className="text-gray-700" fontSize="medium" />
        </button>
        <h2 className="text-2xl text-center font-semibold">Favorite</h2>
      </div>

      <div className="w-[80%] mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <button
              onClick={() => toggleFavorite(item.id)}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
            >
              {activeFavorites.includes(item.id) ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon className="text-red-500" />
              )}
            </button>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  {item.title.split("&")[0]}
                </h3>
                <span className="text-sm font-semibold flex items-center gap-1">
                  <StarRateRoundedIcon color="warning" />
                  {item.rating}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 mt-2 text-sm text-gray-600">
                <p className="text-gray-500">Pick Up Available</p>
                <p className="text-gray-500">{item.min_age} Days</p>
              </div>

              <p className="mt-2 text-gray-500 font-medium">
                From{" "}
                <span className="text-blue-700 font-medium">
                  {item.price}$
                </span>{" "}
                <span className="text-gray-500">per Person</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
