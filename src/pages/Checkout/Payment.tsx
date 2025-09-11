// src/pages/Checkout/Payment.tsx
import React from "react";
import CheckoutCard from "../../components/checkout/CheckoutCard";
import PaymentOptions from "../../components/checkout/PaymentOptions";
import PaymentForm from "../../components/checkout/PaymentForm";
import { useCheckout } from "../../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { step, setStep, method } = useCheckout();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      {/* Left card preview */}
      <CheckoutCard />

      {/* Right content */}
      <div>
        {step === 1 && <PaymentOptions onNext={() => setStep(2)} />}
        {step === 2 && <PaymentForm onNext={() => setStep(3)} />}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
            <p className="mb-6">Method: {method}</p>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Confirm Booking
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4">Processing Payment...</p>
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            <button
              onClick={() => navigate("/checkout/success")}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
