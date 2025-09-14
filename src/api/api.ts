import axios from "axios";

const TOKEN = localStorage.getItem("authToken") || "";

export const api = axios.create({
  baseURL: "https://round5-safarnia.huma-volve.com/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default api;
