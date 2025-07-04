import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numCabins, numDays }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupationRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupationRate * 100)+"%"}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array.isRequired,
  confirmedStays: PropTypes.array.isRequired,
  numCabins: PropTypes.number.isRequired,
  numDays: PropTypes.number.isRequired,
};

export default Stats;
