import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

const queryClient = new QueryClient();

// ⚡ Replace with your real STRIPE PUBLISHABLE KEY
// const stripePromise = loadStripe("pk_test_51S6gGJDrTeUTR7ciXuOdy1LbK1D9eKGfu8jP5Ph5toWDjbhH0KV4vTd56KSPiG3IkPcPir9PwDEhhlL7IM3mMicg00Ru9a3YzS");
// const STRIPE_SECRET_KEY = "sk_test_51S6gGJDrTeUTR7ciagHRTgbESjdjVgsl3248My5lw5Tp6Wgy2qltFYaRbynOWyxA8V8qqfzduqUzDPemh94eHzVQ005jyjYMk9"

localStorage.setItem("authToken", "245|DWlAyWi8ZAkhjWD3ycCLxs2meAwbcwp8SYbWRBDq9991a63e");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </QueryClientProvider>
  </React.StrictMode>
);
{/* <Elements stripe={stripePromise}> */ }