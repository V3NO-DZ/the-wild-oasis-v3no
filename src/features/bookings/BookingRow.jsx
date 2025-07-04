import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom"; // ✅ fixed
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { Flag } from "../../ui/Flag";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName, email, countryFlag , nationality } = {},
    cabins: { name: cabinName } = {},
  },
}) {
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        {countryFlag && (
          <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
        )}
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={String(bookingId)} />
          <Menus.List id={String(bookingId)}>
            <Menus.MenuButton
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.MenuButton>

            {/* ✅ Delete Button that opens the modal */}
            <Modal.Open opens={`confirm-delete-${bookingId}`}>
              <Menus.MenuButton icon={<HiTrash />} disabled={isDeleting}>
                Delete
              </Menus.MenuButton>
            </Modal.Open>

            {status === "unconfirmed" && (
              <Menus.MenuButton
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.MenuButton>
            )}
          </Menus.List>

          {/* ✅ Modal confirmation window per booking */}
          <Modal.Window name={`confirm-delete-${bookingId}`}>
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
              resourceName="booking"
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingRow;
