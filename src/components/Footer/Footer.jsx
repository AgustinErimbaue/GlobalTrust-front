import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <h3>GlobalTrust</h3>
            </div>
            <p className="footer-description">
              Your trusted partner for secure banking and financial services worldwide.
            </p>
            <div className="footer-contact">
              <p>📞 +1 (555) 123-4567</p>
              <p>📧 support@globaltrust.com</p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/account">My Account</a></li>
              <li><a href="/card">Credit Cards</a></li>
              <li><a href="/loan">Loans</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#personal-banking">Personal Banking</a></li>
              <li><a href="#business-banking">Business Banking</a></li>
              <li><a href="#investments">Investments</a></li>
              <li><a href="#insurance">Insurance</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#help-center">Help Center</a></li>
              <li><a href="#contact-us">Contact Us</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Follow Us</h4>
            <div className="footer-social">
              <a href="#facebook" className="social-link" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
            </div>
            <div className="footer-security">
              <p>🔒 FDIC Insured</p>
              <p>🛡️ SSL Secured</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; 2025 GlobalTrust Bank. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              <a href="#terms">Terms of Service</a>
              <span className="footer-divider">|</span>
              <a href="#privacy">Privacy Policy</a>
              <span className="footer-divider">|</span>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
