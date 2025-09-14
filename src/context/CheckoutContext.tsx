import { createContext } from "react";
import type { CheckoutResponse } from "../types/sylvia/checkout";

export interface CheckoutContextType {
  bookingId: number | null;
  bookingType: string | null;
  paymentInfo: CheckoutResponse | null; // فيه payment_id + client_secret
  paymentMethod: string | null;
  setBooking: (id: number, type: string) => void;
  setPaymentInfo: (info: CheckoutResponse) => void;
  setMethod: (method: string) => void;
}

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);