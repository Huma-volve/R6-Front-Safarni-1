// src/pages/Checkout/Success.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center">
        <span className="text-6xl">✅</span>
      </div>
      <h2 className="text-2xl font-bold mt-6">Payment Successful</h2>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
}
