import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button className="logout-link" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
