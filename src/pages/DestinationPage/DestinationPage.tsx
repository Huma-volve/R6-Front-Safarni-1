import { ArrowBack } from "../../components/ArrowBack/ArrowBack";
import { Heart, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTourById } from "../../api/tours";
import type { Tour } from "../../types/mohamed/types";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";
import Loading from "../../components/Loading/Loading";
import { Helmet, HelmetProvider } from "react-helmet-async";

const DestinationPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const toggleFavoriteMutation = useToggleFavorite();

  const {
    data: tourDetails,
    isLoading,
    isError,
  } = useQuery<Tour>({
    queryKey: ["tour", id],
    queryFn: () => getTourById(id!),
    enabled: !!id,
  });

  const cachedTours = queryClient.getQueryData<Tour[]>(["tours"]);
  const cachedTour = cachedTours?.find((t) => t.id === Number(id));

  const tour = {
    ...cachedTour,
    ...tourDetails,
  } as Tour | undefined;

  const isFavorite = !!tour?.is_favorite;

  console.log(tourDetails, "tourDetails");

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tour) return;
    toggleFavoriteMutation.mutate({
      id: tour.id,
      currentlyFavorite: isFavorite,
    });
  };

  if (isLoading)
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      </>
    );

  if (isError || !tour) {
    return (
      <div className="p-8 text-center text-red-500">Failed to load tour</div>
    );
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Safarni - Details Page</title>
        </Helmet>
      </HelmetProvider>
      <div className="min-h-screen bg-white absolute top-0 left-0 md:static md:pt-60 md:px-[130px] pb-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-12 lg:px-28 absolute top-[64px] md:top-[158px] left-0 w-full z-40">
          <div className="flex flex-col md:items-center md:flex-row gap-4 w-full px-4">
            <ArrowBack />
          </div>
          <button
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer p-2 backdrop-blur-sm transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-0 py-8">
          {/* Destination Overview */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h1 className="text-xl md:text-4xl font-semibold text-gray-900 ">
                  {tour.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(tour.rating ?? 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="md:text-lg font-medium text-gray-700">
                    {tour.rating} ({tour.views})
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <p className="md:text-xl font-semibold text-gray-600 ">
                  City Breaks
                </p>
                <p className="text-lg md:text-2xl font-medium text-gray-600">
                  {tour.duration !== undefined
                    ? `${tour.duration} Days and ${tour.duration - 1} Nights`
                    : "Duration not available"}
                </p>
                <p className="md:text-2xl font-medium text-gray-500">
                  {tour.location}
                </p>
              </div>
            </div>
          </div>
          {/* Top Activities Section  */}
          <div className="mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-6">
              Top Activities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Activity 1 */}
              {tour.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="overflow-hidden transition-shadow duration-300"
                >
                  <img
                    src={tour.image}
                    alt={highlight}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="py-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {highlight}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tour.description.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Best Time to Visit Section */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Best Time to Visit
            </h2>
            <div className="border border-neutral-300 p-4 rounded-2xl md:rounded-lg">
              <p className="text-xl text-gray-600 max-w-6xl">
                Spring (April-June) and autumn (September-October) are perfect
                times to visit Paris, with mild weather and fewer tourists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationPage;
