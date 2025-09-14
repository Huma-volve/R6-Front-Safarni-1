import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";

export function useOTP() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      navigate("/password-reset");
    },
  });
}
