import React, { createContext, useState } from "react";

export type PaymentMethod = "paypal" | "mastercard" | "visa";

export interface PaymentFormValues {
  method: PaymentMethod;
  fullName: string;
  email: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

interface Ctx {
  lastPayment: PaymentFormValues | null;
  setLastPayment: (d: PaymentFormValues | null) => void;
}

const CheckoutContext = createContext<Ctx | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastPayment, setLastPayment] = useState<PaymentFormValues | null>(null);
  return (
    <CheckoutContext.Provider value={{ lastPayment, setLastPayment }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// export const usePayment = () => useContext(CheckoutContext)!;


export default CheckoutContext