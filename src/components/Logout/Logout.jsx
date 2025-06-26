import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { resetAccount } from "../../features/account/accountSlice";
import { resetCardState } from "../../features/card/cardSlice";
import "./Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(resetAccount());
    dispatch(resetCardState());
    navigate("/");
  };

  return (
    <button className="logout-link" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
