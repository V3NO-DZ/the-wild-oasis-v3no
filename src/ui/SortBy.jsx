import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "./Select";

function SortBy({ options, sortField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get(sortField) || options[0]?.value;

  function handleChange(e) {
    const newParams = new URLSearchParams(searchParams); // Clone for safety
    newParams.set(sortField, e.target.value);
    setSearchParams(newParams);
  }
  return (
    <>
      <Select
        onChange={handleChange}
        options={options}
        type="white"
        value={sortBy}
      ></Select>
    </>
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  sortField: PropTypes.string.isRequired,
};

export default SortBy;
