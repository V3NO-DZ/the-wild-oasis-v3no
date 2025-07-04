import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { data, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success(`Booking #${data.id}  has been checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
