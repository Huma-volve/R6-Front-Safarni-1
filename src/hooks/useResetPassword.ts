import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/password-reset");
    },
  });
}
