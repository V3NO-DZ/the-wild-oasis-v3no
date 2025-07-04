import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
  const { logout, isLoading } = useLogout();

  function handleClick() {
    logout();
  }
  return (
    <ButtonIcon onClick={handleClick} disabled={isLoading}>
      {!isLoading ? <HiArrowRightStartOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
