import React from "react";
import { useCheckout } from "../../context/useCheckout";

interface Props {
  onNext: () => void;
}

export default function PaymentOptions({ onNext }: Props) {
  const { setMethod, paymentMethod } = useCheckout(); // ✅ تعديل: عشان نعرف عندنا إيه متاختر

  return (
    <div>
      <h1 className="text-center font-semibold text-black text-2xl">Payment Method</h1>
      <h2 className="text-xl text-gray-600 font-semibold my-4">Choose Payment Method</h2>
      <div className="flex gap-3">
        {["paypal", "mastercard", "visa"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMethod(m);
              onNext();
            }}
            className={`px-4 py-2 rounded-lg border ${paymentMethod === m ? "bg-blue-200" : "bg-gray-100 hover:bg-blue-100"}`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}