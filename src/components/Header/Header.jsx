import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";
import Logout from "../Logout/Logout";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="header-nav">
      <Link to="/" className="header-link">
        Home
      </Link>
      {!user ? (
        <>
          <Link to="/register" className="header-link">
            Register
          </Link>
          <Link to="/login" className="header-link">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link to="/card" className="header-link">
            Card
          </Link>
          <Link to="/loan" className="header-link">
            Loan
          </Link>
          <Link to="/profile" className="header-link">
            Profile
          </Link>
          <Logout/>
        </>
      )}
    </nav>
  );
};

export default Header;
