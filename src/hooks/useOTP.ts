import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useOTP() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/home");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
