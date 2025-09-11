// src/context/CheckoutContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";

type PaymentMethod = "paypal" | "mastercard" | "visa" | null;

interface CheckoutState {
  step: number;
  method: PaymentMethod;
  cardData: { number: string; expiry: string; cvc: string } | null;
  setStep: (step: number) => void;
  setMethod: (method: PaymentMethod) => void;
  setCardData: (data: { number: string; expiry: string; cvc: string }) => void;
}

const CheckoutContext = createContext<CheckoutState | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [cardData, setCardData] = useState<CheckoutState["cardData"]>(null);

  return (
    <CheckoutContext.Provider
      value={{ step, setStep, method, setMethod, cardData, setCardData }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}
