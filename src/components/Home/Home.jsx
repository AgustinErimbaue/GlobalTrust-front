import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../features/account/accountSlice";
import "./Home.css";
import { getCardById } from "../../features/card/cardSlice";
import { getLoansByUserId } from "../../features/loan/loanSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const { accountNumber, type, balance, currency } = useSelector(
    (state) => state.account
  );

  const { card } = useSelector((state) => state.card);
  const { loans } = useSelector((state) => state.loan);
  const user = useSelector((state) => state.auth.user);
  const naivigate = useNavigate();
  useEffect(() => {
    if (user && user.id) {
      dispatch(getById(user.id));
      dispatch(getCardById(user.id));
      dispatch(getLoansByUserId());
    }
  }, [dispatch, user]);

  return (
    <div className={`home-container ${!user ? 'welcome-layout' : ''}`}>
      <div className="home-card home-account-section glassmorphism">
        <h4 className="home-title">Account</h4>
        <div className="home-info">
          {user ? (
            <>
              <p>
                <strong>Account Number:</strong> {accountNumber}
              </p>
              <p>
                <strong>Type:</strong> {type}
              </p>
              <p>
                <strong>Balance:</strong> {balance}
              </p>
              <p>
                <strong>Currency:</strong> {currency}
              </p>
            </>
          ) : (
            <div className="welcome-container">
              <h1>Welcome to GlobalTrust</h1>
              <p className="tagline">Your trusted digital banking partner</p>

              <div className="features">
                <h2>Premium Banking Services:</h2>
                <ul>
                  <li>24/7 Account Access</li>
                  <li>Instant Global Transfers</li>
                  <li>Investment Portfolio Management</li>
                  <li>Personalized Financial Insights</li>
                  <li>Priority Customer Support</li>
                </ul>
              </div>

              <div className="cta-section">
                <p>
                  Please log in to access your account and explore our premium
                  services.
                </p>
                <button
                  className="login-btn"
                  onClick={() => naivigate("/login")}
                >
                  Secure Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {user && (
        <>
          <div className="home-card home-cards-section-container glassmorphism">
            <h4 className="home-title">
              <span
                role="img"
                aria-label="cards"
                style={{ marginRight: "8px" }}
              >
                💳
              </span>
              My Cards
            </h4>
            <div className="home-cards-section">
              {Array.isArray(card) && card.length > 0 ? (
                <div className="home-cards-grid">
                  {card.map((c) => (
                    <div key={c.id} className="home-card-item glassmorphism-light">
                      <div className="home-card-number">{c.number}</div>
                      <div className="home-card-details">
                        <span className="home-card-type">{c.type}</span>
                        <span className="home-card-cvv">CVV: {c.cvv}</span>
                      </div>
                      <div className="home-card-expiry">
                        Expires:{" "}
                        {new Date(c.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="home-no-cards">
                  <p>No cards found.</p>
                  <p>
                    <a
                      href="/card"
                      style={{ color: "#0038a8", textDecoration: "none" }}
                    >
                      Add your first card →
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="home-card home-loans-section-container glassmorphism">
            <h4 className="home-title">
              <span
                role="img"
                aria-label="loans"
                style={{ marginRight: "8px" }}
              >
                💰
              </span>
              My Loans
            </h4>
            <div className="home-loans-section">
              {Array.isArray(loans) && loans.length > 0 ? (
                <div className="home-loans-grid">
                  {loans.map((loan) => (
                    <div key={loan.id} className="home-loan-item glassmorphism-light">
                      <div className="home-loan-amount">
                        ${loan.amount?.toLocaleString()}
                      </div>
                      <div className="home-loan-details">
                        <span className="home-loan-rate">
                          {loan.interestRate}% APR
                        </span>
                        <span className="home-loan-term">
                          {loan.termMonths} months
                        </span>
                      </div>
                      <div className="home-loan-payment">
                        Monthly: ${loan.monthlyPayment?.toLocaleString()}
                      </div>
                      <div className="home-loan-status">
                        <span className={`status-badge status-${loan.status}`}>
                          {loan.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="home-no-loans">
                  <p>No loans found.</p>
                  <p>
                    <a
                      href="/loan"
                      style={{ color: "#0038a8", textDecoration: "none" }}
                    >
                      Apply for your first loan →
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
