import { useNavigate } from "react-router-dom";
import { signup } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/home");
    },
  });
}