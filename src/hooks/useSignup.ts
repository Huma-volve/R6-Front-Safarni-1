import { useNavigate } from "react-router-dom";
import { signup } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/verify-code");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
