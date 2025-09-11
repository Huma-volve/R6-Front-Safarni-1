
// src/components/checkout/PaymentForm.tsx
import React, { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";

interface Props {
  onNext: () => void;
}

export default function PaymentForm({ onNext }: Props) {
  const { setCardData } = useCheckout();
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Card Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCardData({ number, expiry, cvc });
          onNext();
        }}
        className="flex flex-col gap-3"
      >
        <input
          className="border px-3 py-2 rounded"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Expiry Date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
