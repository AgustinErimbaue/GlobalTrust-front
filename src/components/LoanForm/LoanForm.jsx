import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoanForm.css";
import { createLoan } from "../../features/loan/loanSlice";

const LoanForm = () => {
  const initialState = {
    amount: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { amount } = formData;

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
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    dispatch(createLoan({ ...formData, amount: Number(amount) }));
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

        <div className="loan-form-info">
          <p>
            <strong>Loan Range:</strong> $1,000 - $50,000
            <br />
            <strong>Interest Rate:</strong> Starting at 5.99% APR
            <br />
            <strong>Terms:</strong> 12-84 months
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
