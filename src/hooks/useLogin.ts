import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/home");
    },
  });
}
