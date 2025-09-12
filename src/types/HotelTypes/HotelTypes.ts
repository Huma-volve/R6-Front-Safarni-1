export interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  average_rating: number;
}

export interface Room {
  id: number;
  description: string;
  price: string;
  area: number;
  capacity: number;
  bathroom_number: number;
  image: string;
  discount: string | null;
  average_rating: number;
  total_reviews: number;
}

export interface Review {
  id: number;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  review_text: string;
  created_at: string;
}

export interface Booking {
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  adults_count: number;
  children_count: number;
  infants_count: number;
  note_to_owner?: string;
}

export interface GalleryImage {
  id: number;
  image: string;
  alt: string;
}

import hotelImage from "../../assets/images/hotel3.jpg";
export const API_BASE_URL = "https://round5-safarnia.huma-volve.com/api";
export const BEARER_TOKEN = "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b";


export const fetchRoomDetails = async (id: number): Promise<Room> => {
  const response = await fetch(`${API_BASE_URL}/room/details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await fetch(
    "https://round5-safarnia.huma-volve.com/api/hotels",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b",
      },
    }
  );
  const data = await response.json();
  return data.data;
};


export const fetchRoomsAvailability = async (hotelId: string): Promise<Room[]> => {
  const response = await fetch(`${API_BASE_URL}/hotel/rooms/${hotelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data.data;
};

export const fetchReviews = async (roomId: number): Promise<Review[]> => {
  const response = await fetch(`${API_BASE_URL}/hotel/review/${roomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

export const submitReview = async (
  roomId: number,
  rating: number,
  reviewText: string,
  image: File | null
): Promise<any> => {
  const formData = new FormData();
  formData.append("room_id", String(roomId));
  formData.append("rating", String(rating));
  formData.append("review_text", reviewText);

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_BASE_URL}/hotel/review`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  return response.json();
};

export const bookRoom = async (bookingData: Booking): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/booking/room`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: BEARER_TOKEN,
    },
    body: JSON.stringify(bookingData),
  });

  return response.text();
};


export const formatDate = (dateStr: string): string => {
  const months: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  const [day, month] = dateStr.split(" ");
  const currentYear = new Date().getFullYear();
  const date = new Date(currentYear, months[month], parseInt(day));

  return date.toISOString().split("T")[0];
};

export const calculateNights = (checkInDate: string, checkOutDate: string): number => {
  const parseDate = (dateStr: string) => {
    const months: { [key: string]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };

    const [day, month] = dateStr.split(" ");
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, months[month], parseInt(day));
  };

  const startDate = parseDate(checkInDate);
  const endDate = parseDate(checkOutDate);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return Math.max(1, nightsDiff);
};

export const calculateTotalPrice = (price: string, nights: number): string => {
  const basePrice = parseFloat(price || "150");
  return (basePrice * nights).toFixed(2);
};




export const getGalleryImages = (): GalleryImage[] => {
  return [
    { id: 1, image: hotelImage, alt: "Room" },
    { id: 2, image: hotelImage, alt: "Beach" },
    { id: 3, image: hotelImage, alt: "Hotel" },
    { id: 4, image: hotelImage, alt: "Pool" },
    { id: 5, image: hotelImage, alt: "Building" },
    { id: 6, image: hotelImage, alt: "Ocean" },
    { id: 7, image: hotelImage, alt: "Nature" },
    { id: 8, image: hotelImage, alt: "Beach" },
  ];
};