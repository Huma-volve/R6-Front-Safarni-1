// src/pages/Checkout/Checkout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="max-w-6xl mx-auto relative top-10 my-10 py-5">
      <Outlet />
    </div>
  );
}
