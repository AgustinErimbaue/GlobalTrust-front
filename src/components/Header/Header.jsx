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

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  return (
    <>
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
          
          <button 
            className={`header-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
              }
            }}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </nav>
        
        <nav 
          className={`header-mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <div className="header-mobile-links">
            {!user ? (
              <>
                <Link 
                  to="/register" 
                  className="header-link" 
                  onClick={closeMobileMenu}
                  aria-label="Go to registration page"
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="header-link" 
                  onClick={closeMobileMenu}
                  aria-label="Go to login page"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/card" 
                  className="header-link" 
                  onClick={closeMobileMenu}
                  aria-label="Go to card management"
                >
                  Card
                </Link>
                <Link 
                  to="/loan" 
                  className="header-link" 
                  onClick={closeMobileMenu}
                  aria-label="Go to loan services"
                >
                  Loan
                </Link>
                <Link 
                  to="/profile" 
                  className="header-link" 
                  onClick={closeMobileMenu}
                  aria-label="Go to user profile"
                >
                  Profile
                </Link>
                <div onClick={closeMobileMenu}>
                  <Logout/>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay active"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
