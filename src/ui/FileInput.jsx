import styled from "styled-components";
import PropTypes from "prop-types";
// ✅ 1. Import forwardRef from React
import { forwardRef } from "react";

const StyledFileInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

// ✅ 2. Wrap component with forwardRef and pass ref to the input
const FileInput = forwardRef(function FileInput({ id, accept, ...props }, ref) {
  return (
    <StyledFileInput
      type="file"
      id={id}
      accept={accept}
      ref={ref} // ✅ Forwarded ref is attached here
      {...props}
    />
  );
});

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  accept: PropTypes.string,
};

export default FileInput;
