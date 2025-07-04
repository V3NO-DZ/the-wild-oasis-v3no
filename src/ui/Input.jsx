import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(0, 128, 255, 0.2); /* Adjust to match your brand */
  }
`;

export default Input;
