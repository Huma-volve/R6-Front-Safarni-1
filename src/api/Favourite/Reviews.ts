// types
export type ReviewData = {
  id: number;
  tour_id: number;
  user_id: number;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
};

type ReviewsResponse = {
  status: number;
  message: string;
  data: {
    tour_id: number;
    total_reviews: number;
    reviews: ReviewData[];
  };
};

// function
export default async function getAllReviews(
  tourId: number
): Promise<{ data: ReviewData[] }> {
  try {
    const res = await fetch(
      `https://round5-safarnia.huma-volve.com/api/tours/${tourId}/reviews`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: ReviewsResponse = await res.json();
    console.log(json);

    return { data: json.data.reviews || [] };
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return { data: [] };
  }
}
