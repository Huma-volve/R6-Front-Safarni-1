export type CategoryResponse = {
  title: string;
  image: string | undefined;
  data: { title: string; description: string; image: string };
};
export type RecommendedTourResponse = {
  status: string;
  id: number;
  title: string;
  location: string;
  image: string | undefined;
  rating: string;
  data: {
    id: number;
    title: string;
    location: string;
    image: string;
    rating: string;
  };
};

export type TrendingToursResponse = {
  id: number;
  title: string;
  location: string;
  image: string | undefined;
  rating: string;
  description: string;
  price: string;
  views: number;
  is_recommended: boolean;
  is_favourite: boolean;
};
