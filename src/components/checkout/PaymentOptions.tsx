// src/components/checkout/PaymentOptions.tsx
import React from "react";
import { useCheckout } from "../../context/CheckoutContext";

interface Props {
  onNext: () => void;
}

export default function PaymentOptions({ onNext }: Props) {
  const { setMethod } = useCheckout();

  return (
    <div>
        <h1 className="text-center font-semibold text-black text-2xl">Payment Method</h1>
      <h2 className="text-xl text-grey-100 font-semibold my-4">Choose Payment Method</h2>
      <div className="flex gap-3">
        {["paypal", "mastercard", "visa"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMethod(m as any);
              onNext();
            }}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-100"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
