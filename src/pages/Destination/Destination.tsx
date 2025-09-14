import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Star } from "lucide-react";
import { getTourById } from "../../api/Mohamed/tours";
import type { Tour } from "../../types/mohamed/types";
import Loading from "../../components/Loading/Loading";
import { ArrowBack } from "../../components/ArrowBack/ArrowBack";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";
import getAllReviews, { type ReviewData } from "../../api/Favourite/Reviews";
import icon from "../../assets/images/hotel1.jpg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Destination = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const toggleFavoriteMutation = useToggleFavorite();

  // Get tour details
  const { data: tourDetails } = useQuery<Tour>({
    queryKey: ["tour", id],
    queryFn: () => getTourById(id!),
    enabled: !!id,
  });

  // Get cached tours
  const cachedTours = queryClient.getQueryData<Tour[]>(["tours"]);
  const cachedTour = cachedTours?.find((t) => t.id === Number(id));

  // Merge cached + fresh tour data
  const tour = {
    ...cachedTour,
    ...tourDetails,
  } as Tour | undefined;

  const isFavorite = !!tour?.is_favorite;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tourDetails) return;
    toggleFavoriteMutation.mutate({
      id: tourDetails.id,
      currentlyFavorite: isFavorite,
    });
  };

  // Get reviews
  const {
    isLoading,
    error,
    data: reviewsData,
  } = useQuery<{ data: ReviewData[] }>({
    queryKey: ["reviews", id],
    queryFn: () => getAllReviews(Number(id)),
    enabled: !!id,
  });

  const Allreviews: ReviewData[] = reviewsData?.data || [];

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="bg-white">
      {tour && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-32">
          {/* الهيدر الكبير */}
          <div className="relative mt-6">
            <div className="absolute top-4 left-4 z-20">
              <ArrowBack />
            </div>
            <button
              onClick={handleToggleFavorite}
              disabled={toggleFavoriteMutation.isPending}
              className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
            <img
              src={tour?.image || icon}
              alt={tour?.title}
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full rounded-xl object-cover"
            />
          </div>

          {/* Tour Info */}
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-semibold text-gray-900">
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
                <span className="font-medium text-gray-700">
                  {tour?.rating} ({tour?.views})
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-gray-600">
              <p className="font-semibold">City Breaks</p>
              <p className="text-lg font-medium">
                {tour?.duration
                  ? `${tour?.duration} Days and ${tour?.duration - 1} Nights`
                  : "Duration not available"}
              </p>
              <p className="font-medium">{tour?.location}</p>
            </div>
          </div>

          {/* Top Activities */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Top Activities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tour?.highlights?.map((highlight, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={tour?.image || icon}
                    alt={highlight}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {highlight}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {tour?.description?.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Time */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Best Time to Visit
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-gray-600 text-sm">
                Spring (April–June) and autumn (September–October) are perfect
                times to visit Paris, with mild weather and fewer tourists.
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Gallery <span className="text-blue-600">(0)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> 
              <h2 className="text-center text-gray-600 bg-gray-100 p-4 rounded-lg">
                No Gallery
              </h2>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="text-blue-600 text-sm font-medium">
                + Add Photo
              </button>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Allreviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.user?.avatar || icon}
                        alt={review.user?.name || "Reviewer"}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <p className="font-medium text-gray-900">
                        {review.user?.name || "Anonymous"}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">
                        {dayjs(review.created_at).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(review.rating ?? 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{review.review}</p>
                </div>
              ))}
            </div>
            {Allreviews.length === 0 && (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            )}
            {Allreviews.length > 0 && (
              <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  See More
                </button>
              </div>
            )}
          </div>

          {/* السعر وزر Book Now */}
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-medium">
              Total price :{" "}
              <span className="text-blue-600 font-semibold">$150.00</span>/night
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destination;
