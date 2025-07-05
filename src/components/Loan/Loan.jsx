import { useNavigate } from 'react-router-dom'
import './Loan.css'

const Loan = () => {
  const navigate = useNavigate()

  const handleApplyClick = () => {
    navigate('/loan-form')
  }

  return (
    <div className="loan-container">
      <div className="loan-hero">
        <h1 className="loan-title">Personal Loans Made Simple</h1>
        <p className="loan-subtitle">
          Get the financial freedom you deserve with our competitive personal loan rates
        </p>
      </div>

      <div className="loan-content">
        <div className="loan-card">
          <div className="loan-icon" aria-hidden="true">💰</div>
          <h2>Need a Personal Loan?</h2>
          <p className="loan-description">
            Whether you're consolidating debt, financing a major purchase, or covering unexpected expenses, 
            our personal loans offer flexible terms and competitive rates tailored to your needs.
          </p>
          
          <ul className="loan-features" role="list">
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">✓</span>
              <span>Loan amounts from $1,000 to $50,000</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">✓</span>
              <span>Competitive interest rates starting at 5.99% APR</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">✓</span>
              <span>Flexible repayment terms (12-84 months)</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">✓</span>
              <span>No prepayment penalties</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">✓</span>
              <span>Quick approval process</span>
            </li>
          </ul>

          <button 
            className="loan-cta-button" 
            onClick={handleApplyClick}
            type="button"
            aria-label="Apply for your personal loan - navigate to application form"
          >
            Apply for Your Personal Loan
          </button>
          
          <p className="loan-disclaimer">
            *Subject to credit approval. Terms and conditions apply. 
            APR varies based on creditworthiness and other factors.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loan