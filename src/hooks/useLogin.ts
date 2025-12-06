import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/home");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
}
