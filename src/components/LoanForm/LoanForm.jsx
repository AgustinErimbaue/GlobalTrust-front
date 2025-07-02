import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoanForm.css";
import { createLoan } from "../../features/loan/loanSlice";

const LoanForm = () => {
  const initialState = {
    amount: "",
    interestRate: "",
    termMonths: "",
    monthlyPayment: "",
    status: "pending",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { amount, interestRate, termMonths, monthlyPayment, status } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const validate = () => {
    const validationErrors = {};
    
    if (!amount) {
      validationErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || amount <= 0) {
      validationErrors.amount = "Please enter a valid amount greater than zero.";
    } else if (amount < 1000) {
      validationErrors.amount = "Minimum loan amount is $1,000.";
    } else if (amount > 50000) {
      validationErrors.amount = "Maximum loan amount is $50,000.";
    }

    if (!interestRate) {
      validationErrors.interestRate = "Interest rate is required.";
    } else if (isNaN(interestRate) || interestRate <= 0) {
      validationErrors.interestRate = "Please enter a valid interest rate.";
    } else if (interestRate < 5.99 || interestRate > 30) {
      validationErrors.interestRate = "Interest rate must be between 5.99% and 30%.";
    }

    if (!termMonths) {
      validationErrors.termMonths = "Loan term is required.";
    } else if (isNaN(termMonths) || termMonths <= 0) {
      validationErrors.termMonths = "Please enter a valid term in months.";
    } else if (termMonths < 12 || termMonths > 84) {
      validationErrors.termMonths = "Loan term must be between 12 and 84 months.";
    }

    if (!monthlyPayment) {
      validationErrors.monthlyPayment = "Monthly payment is required.";
    } else if (isNaN(monthlyPayment) || monthlyPayment <= 0) {
      validationErrors.monthlyPayment = "Please enter a valid monthly payment amount.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    dispatch(createLoan({ 
      ...formData, 
      amount: Number(amount),
      interestRate: Number(interestRate),
      termMonths: Number(termMonths),
      monthlyPayment: Number(monthlyPayment),
      status
    }));
    setFormData(initialState);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="loan-form-container">
      <form className="loan-form" onSubmit={handleSubmit}>
        <h2 className="loan-form-title">Personal Loan Application</h2>
        <p className="loan-form-subtitle">
          Enter the loan amount you need and we'll process your application
        </p>

        {showSuccess && (
          <div className="loan-form-success">
            🎉 Loan application submitted successfully! 
            <br />
            <small>Redirecting you to your account... We'll review your application and get back to you within 24-48 hours.</small>
          </div>
        )}

        <div className="loan-form-group">
          <label htmlFor="amount" className="loan-form-label">
            Loan Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={amount}
            onChange={handleInputChange}
            className="loan-form-input"
            placeholder="Enter loan amount (e.g., 10000)"
            min="1000"
            max="50000"
            step="100"
            required
          />
          {errors.amount && (
            <div className="loan-form-error">
              {errors.amount}
            </div>
          )}
        </div>

        <div className="loan-form-group">
          <label htmlFor="interestRate" className="loan-form-label">
            Interest Rate (%)
          </label>
          <input
            id="interestRate"
            type="number"
            name="interestRate"
            value={interestRate}
            onChange={handleInputChange}
            className="loan-form-input"
            placeholder="Enter interest rate (e.g., 7.5)"
            min="5.99"
            max="30"
            step="0.01"
            required
          />
          {errors.interestRate && (
            <div className="loan-form-error">
              {errors.interestRate}
            </div>
          )}
        </div>

        <div className="loan-form-group">
          <label htmlFor="termMonths" className="loan-form-label">
            Loan Term (Months)
          </label>
          <select
            id="termMonths"
            name="termMonths"
            value={termMonths}
            onChange={handleInputChange}
            className="loan-form-input"
            required
          >
            <option value="">Select loan term</option>
            <option value="12">12 months (1 year)</option>
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
          </select>
          {errors.termMonths && (
            <div className="loan-form-error">
              {errors.termMonths}
            </div>
          )}
        </div>

        <div className="loan-form-group">
          <label htmlFor="monthlyPayment" className="loan-form-label">
            Monthly Payment ($)
          </label>
          <input
            id="monthlyPayment"
            type="number"
            name="monthlyPayment"
            value={monthlyPayment}
            onChange={handleInputChange}
            className="loan-form-input"
            placeholder="Enter monthly payment (e.g., 250)"
            min="1"
            step="0.01"
            required
          />
          {errors.monthlyPayment && (
            <div className="loan-form-error">
              {errors.monthlyPayment}
            </div>
          )}
        </div>

        <div className="loan-form-group">
          <label htmlFor="status" className="loan-form-label">
            Status
          </label>
          <input
            id="status"
            type="text"
            name="status"
            value={status}
            className="loan-form-input"
            disabled
            style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
          />
          <small style={{ color: '#6c757d', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Status will be set to "pending" automatically upon submission
          </small>
        </div>

        <div className="loan-form-info">
          <p>
            <strong>Loan Range:</strong> $1,000 - $50,000<br/>
            <strong>Interest Rate Range:</strong> 5.99% - 30% APR<br/>
            <strong>Term Options:</strong> 12-84 months<br/>
            <strong>Note:</strong> All loan applications start with "pending" status
          </p>
        </div>

        <button type="submit" className="loan-form-button">
          Apply for Loan
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
