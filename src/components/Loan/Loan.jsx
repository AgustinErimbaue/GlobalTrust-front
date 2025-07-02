import React from 'react'
import './Loan.css'

const Loan = () => {
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
          <div className="loan-icon">💰</div>
          <h2>Need a Personal Loan?</h2>
          <p className="loan-description">
            Whether you're consolidating debt, financing a major purchase, or covering unexpected expenses, 
            our personal loans offer flexible terms and competitive rates tailored to your needs.
          </p>
          
          <div className="loan-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Loan amounts from $1,000 to $50,000</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Competitive interest rates starting at 5.99% APR</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Flexible repayment terms (12-84 months)</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>No prepayment penalties</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Quick approval process</span>
            </div>
          </div>

          <button className="loan-cta-button">
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