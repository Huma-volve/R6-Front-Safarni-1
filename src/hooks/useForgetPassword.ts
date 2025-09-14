import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";

export function useForgetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      navigate("/verify-code");
    },
  });
}
