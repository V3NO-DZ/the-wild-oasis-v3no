import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";
import PropTypes from "prop-types";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get(filterField) || options[0]?.value;

  function handleClick(value) {
    const newParams = new URLSearchParams(searchParams); // Clone for safety
    newParams.set(filterField, value);
    setSearchParams(newParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentValue}
          disabled={option.value === currentValue}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

Filter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterField: PropTypes.string.isRequired,
};

export default Filter;
