import styled from "styled-components";
import HeaderMenu from "../ui/HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

// Define styled component
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
  display: flex;
  gap : 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

export default function Header() {
  return (
    <StyledHeader>
      
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
