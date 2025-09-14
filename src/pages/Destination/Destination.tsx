import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Star } from "lucide-react";
import getAllDestinations from "../../api/Favourite/Destination";
import { getTourById } from "../../api/Mohamed/tours";
import type { DestinationData } from "../../types/Khaled/Fav/types";
import type { Tour } from "../../types/mohamed/types";
import Loading from "../../components/Loading/Loading";
import { ArrowBack } from "../../components/ArrowBack/ArrowBack";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";
import getAllReviews, { type ReviewData } from "../../api/Favourite/Reviews";
import icon from "../../assets/images/hotel1.jpg";

const Destination = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const toggleFavoriteMutation = useToggleFavorite();

  // Fetch tour details
  const { data: tourDetails } = useQuery<Tour>({
    queryKey: ["tour", id],
    queryFn: () => getTourById(id!),
    enabled: !!id,
  });

  // Cached tours
  const cachedTours = queryClient.getQueryData<Tour[]>(["tours"]);
  const cachedTour = cachedTours?.find((t) => t.id === Number(id));

  // Merge cached + API data
  const tour = {
    ...cachedTour,
    ...tourDetails,
  } as Tour | undefined;

  const isFavorite = !!tour?.is_favorite;

  // Toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tourDetails) return;
    toggleFavoriteMutation.mutate({
      id: tourDetails.id,
      currentlyFavorite: isFavorite,
    });
  };

  // Fetch destinations
  const { data: destinationsData } = useQuery<{ data: DestinationData[] }>({
    queryKey: ["destinations"],
    queryFn: getAllDestinations,
  });

// Fetch reviews
const {
  isLoading,
  error,
  data: reviewsData,
} = useQuery<{ data: ReviewData[] }>({
  queryKey: ["reviews", id],
  queryFn: () => getAllReviews(Number(id)),
  enabled: !!id,
});

const reviews: ReviewData[] = reviewsData?.data || [];
const destinations: DestinationData[] = destinationsData?.data || [];

console.log("reviews",reviews);


  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-center text-black">
        <Loading />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <>
      {/* Tour Details Section */}
      {tour ? (
        <div className="absolute top-0 left-0 min-h-screen w-full bg-white pb-8 overflow-hidden md:static md:px-8 lg:px-[130px] md:pt-40">
          {/* Header */}
          <div className="absolute top-[64px] left-0 z-40 flex w-full items-center justify-between px-4 md:top-[158px] md:px-12 lg:px-28">
            <div className="flex w-full flex-col gap-4 px-4 md:flex-row md:items-center">
              <ArrowBack />
            </div>
            <button
              onClick={handleToggleFavorite}
              disabled={toggleFavoriteMutation.isPending}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 p-2 backdrop-blur-sm transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Hero Section */}
          <div className="relative h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-20 md:mt-0">
            <img
              src={tour?.image}
              alt={tour?.title}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="py-8 px-4 md:px-0">
            {/* Overview */}
            <div className="mb-8 flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-2xl font-semibold text-gray-900 md:text-4xl">
                  {tour?.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(tour?.rating ?? 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-700 md:text-lg">
                    {tour?.rating} ({tour?.views})
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <p className="font-semibold text-gray-600 md:text-xl">
                  City Breaks
                </p>
                <p className="text-lg font-medium text-gray-600 md:text-2xl">
                  {tour?.duration !== undefined
                    ? `${tour?.duration} Days and ${tour?.duration - 1} Nights`
                    : "Duration not available"}
                </p>
                <p className="font-medium text-gray-500 md:text-2xl">
                  {tour?.location}
                </p>
              </div>
            </div>

            {/* Top Activities */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl md:text-3xl font-medium text-gray-900">
                Top Activities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tour?.highlights?.map((highlight, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={tour?.image}
                      alt={highlight}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        {highlight}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {tour?.description.slice(0, 60)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Time to Visit */}
            <div>
              <h2 className="mb-4 text-xl md:text-2xl font-medium text-gray-900">
                Best Time to Visit
              </h2>
              <div className="rounded-2xl border border-neutral-300 p-4 md:rounded-lg">
                <p className="max-w-6xl text-base md:text-xl text-gray-600">
                  Spring (April-June) and autumn (September-October) are perfect
                  times to visit Paris, with mild weather and fewer tourists.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Destinations Section */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {destinations.map((item) => (
            <Link to={`/destination/${item.id}`} key={item.id}>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={item.image}
                  alt={item.description}
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-xl object-cover shadow-md"
                />
                <p className="text-center text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

     {/* Reviews Section */}
<div className="bg-white px-6 py-12">
  <h2 className="mb-8 text-2xl md:text-3xl font-semibold text-gray-900">
    Reviews
  </h2>
  {isLoading ? (
    <Loading />
  ) : reviews.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          {/* user info */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={review.user?.avatar || icon }
              alt={review.user?.name || "Reviewer"}
              className="h-12 w-12 rounded-full bg-gray-200 object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">
                {review.user?.name || "Anonymous"}
              </p>
              <span className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.floor(review.rating ?? 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          {/* review text */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {review.review}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No reviews yet.</p>
  )}
</div>

    </>
  );
};

export default Destination;
