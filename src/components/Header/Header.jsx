import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";
import Logout from "../Logout/Logout";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="header-container">
      <nav className="header-nav">
        <div className="header-brand">
          <Link to="/" className="header-logo">
            GlobalTrust
          </Link>
        </div>
        
        <div className="header-links">
          <div className="header-nav-links">
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
              </>
            )}
          </div>
          
          {user && (
            <div className="header-user-actions">
              <div className="header-user-info">
                <span>Welcome, {user.fullName || 'User'}</span>
                <div className="header-user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              <Logout/>
            </div>
          )}
        </div>
        
        <div className="header-mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      
      <div className="header-mobile-menu">
        <div className="header-mobile-links">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
