import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import PropTypes from "prop-types";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default CheckoutButton;
