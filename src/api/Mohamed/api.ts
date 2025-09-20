import axios from "axios";

const TOKEN = "fSdtjlVDoNAG630qkSCli05PL06AG64UMkQ7uVmHde778a55";

export const api = axios.create({
  baseURL: "https://round5-safarnia.huma-volve.com/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default api;