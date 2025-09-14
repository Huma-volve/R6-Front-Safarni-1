import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { 
  CheckoutRequest, 
  CheckoutResponse, 
  ConfirmRequest, 
  ConfirmResponse 
} from "../types/sylvia/checkout";

const API_BASE = "http://round5-safarnia.huma-volve.com/api";

// 🔹 Checkout Mutation
export const useCheckoutMutation = () =>
  useMutation<CheckoutResponse, Error, CheckoutRequest>({
    mutationFn: async (data) => {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const res = await axios.post(`${API_BASE}/checkout`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Checkout request:", data);
      return res.data;
    },
  });

// 🔹 Confirm Checkout Mutation
export const useConfirmCheckout = () =>
  useMutation<ConfirmResponse, Error, ConfirmRequest>({
    mutationFn: async (data) => {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const res = await axios.post(`${API_BASE}/checkout/confirm`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Confirm request:", data);
      console.log("Confirm response:", res);
      return res.data;
    },
  });
