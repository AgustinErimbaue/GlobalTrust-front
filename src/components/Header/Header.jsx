import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Header.css";
import Logout from "../Logout/Logout";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
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
                <button 
                  className="header-link" 
                  onClick={() => handleMobileNavigation('/register')}
                  aria-label="Go to registration page"
                >
                  Register
                </button>
                <button 
                  className="header-link" 
                  onClick={() => handleMobileNavigation('/login')}
                  aria-label="Go to login page"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button 
                  className="header-link" 
                  onClick={() => handleMobileNavigation('/card')}
                  aria-label="Go to card management"
                >
                  Card
                </button>
                <button 
                  className="header-link" 
                  onClick={() => handleMobileNavigation('/loan')}
                  aria-label="Go to loan services"
                >
                  Loan
                </button>
                <button 
                  className="header-link" 
                  onClick={() => handleMobileNavigation('/profile')}
                  aria-label="Go to user profile"
                >
                  Profile
                </button>
                <div onClick={closeMobileMenu}>
                  <Logout/>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
