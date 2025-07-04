import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  color: red;
`;

function FormRow({ label, children, error }) {
  return (
    <StyledFormRow>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error className="error">{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.string,
};

export default FormRow;
