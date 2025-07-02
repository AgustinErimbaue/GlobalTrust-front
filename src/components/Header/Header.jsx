import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Header.css";
import Logout from "../Logout/Logout";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && 
          !event.target.closest('.header-mobile-menu') && 
          !event.target.closest('.header-mobile-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
        
        <div 
          className={`header-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMobileMenu();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      
      <div className={`header-mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="header-mobile-links">
          {!user ? (
            <>
              <Link to="/register" className="header-link" onClick={closeMobileMenu}>
                Register
              </Link>
              <Link to="/login" className="header-link" onClick={closeMobileMenu}>
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/card" className="header-link" onClick={closeMobileMenu}>
                Card
              </Link>
              <Link to="/loan" className="header-link" onClick={closeMobileMenu}>
                Loan
              </Link>
              <Link to="/profile" className="header-link" onClick={closeMobileMenu}>
                Profile
              </Link>
              <div onClick={closeMobileMenu}>
                <Logout/>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
