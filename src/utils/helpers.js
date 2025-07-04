import {
  formatDistance,
  parseISO,
  differenceInDays,
  isValid,
} from "date-fns";

// Works for both Date objects and strings (e.g., from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Formats distance from now, cleans up "about" and "in"
export const formatDistanceFromNow = (dateStr) => {
  const date = parseISO(dateStr);
  if (!isValid(date)) return "Invalid date";

  return formatDistance(date, new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace(/^in /, "In ");
};

// Returns today's date in ISO string format with optional time settings
export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end)
    today.setUTCHours(23, 59, 59, 999); // End of day (UTC)
  else
    today.setUTCHours(0, 0, 0, 0); // Start of day (UTC)

  return today.toISOString();
};

// Formats a number as USD currency
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
