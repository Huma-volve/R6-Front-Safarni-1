export type BookingType = "room" | "car" | "flight" | "tour";

export interface CheckoutRequest {
  booking_id: number;
  booking_type: BookingType;
}

export interface CheckoutResponse {
  payment_id: string;
  client_secret: string; // from Stripe
}

export interface ConfirmRequest {
  payment_id: string;
  payment_method_id: string;
}

export interface ConfirmResponse {
  status: "succeeded" | "pending" | "failed";
  message?: string;
}