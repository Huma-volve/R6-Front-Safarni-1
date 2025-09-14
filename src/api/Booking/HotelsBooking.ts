import type { Hotel, Room, Review, Booking } from "../../types/HotelTypes/HotelTypes";

export const API_BASE_URL = "https://round5-safarnia.huma-volve.com/api";
export const BEARER_TOKEN =
  "Bearer AcF8WHbQ6KJCA7P0vIV9D5bZswy6Kc4j20Gx00fXd7c1170b";

export const fetchRoomDetails = async (id: number): Promise<Room> => {
  const response = await fetch(`${API_BASE_URL}/room/details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.data;
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await fetch(`${API_BASE_URL}/hotels`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  const data = await response.json();
  return data.data;
};

export const fetchRoomsAvailability = async (
  hotelId: string
): Promise<Room[]> => {
  const response = await fetch(`${API_BASE_URL}/hotel/rooms/${hotelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: BEARER_TOKEN,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
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

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  if (image) formData.append("image", image);

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
