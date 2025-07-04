import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({user}) => {
      toast.success("account user succesefully updated");
      queryClient.setQueryData(["user"], user)
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
