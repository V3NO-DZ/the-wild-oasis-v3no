import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "account successfully created! please verify the new account from user's email address"
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("something went wrong");
    },
  });

  return { signup, isLoading };
}
