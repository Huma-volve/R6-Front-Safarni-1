import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

const queryClient = new QueryClient();

// ⚡ Replace with your real STRIPE PUBLISHABLE KEY
// const stripePromise = loadStripe("pk_test_51S6gGJDrTeUTR7ciXuOdy1LbK1D9eKGfu8jP5Ph5toWDjbhH0KV4vTd56KSPiG3IkPcPir9PwDEhhlL7IM3mMicg00Ru9a3YzS");

localStorage.setItem("authToken", "165|GHG8QMz1Z5Wl0XzsN6ybXJia59zq3k3T4x64Cf3Z6559fc19");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
{/* <Elements stripe={stripePromise}> */ }