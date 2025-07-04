import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  // const close = () => setOpenId("");
  // const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition ,setOpenId}}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const {  setPosition ,setOpenId } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    setOpenId((cur) => (cur === id ? "" : id));
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openId, close, position } = useContext(MenusContext);
  const ref = useOutsideClick(close , false);

  if (id !== openId) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function MenuButton({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);

  async function handleClick() {
    await onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

function Menu({ children }) {
  return <div>{children}</div>;
}

//
// ✅ Prop Types
//
Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func, // ✅ Made optional in case not used
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

//
// ✅ Register compound components
//
Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.MenuButton = MenuButton;

export default Menus;
