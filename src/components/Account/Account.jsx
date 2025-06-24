import { useState } from "react";
import "./Account.css";
import { createAccount } from "../../features/account/accountSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const initialState = {
    balance: "",
    type: "",
    currency: "",
  };
  const [accountData, setAccountData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { balance, type, currency } = accountData;

  const validate = () => {
    const newErrors = {};
    if (!type.trim()) newErrors.type = "Account type is required";
    if (balance === "" || isNaN(balance) || Number(balance) < 0) newErrors.balance = "Balance must be 0 or greater";
    if (!currency) newErrors.currency = "Currency is required";
    return newErrors;
  };

  const handleChangeInput = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(createAccount({ ...accountData, balance: Number(balance) }));
      setAccountData(initialState);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const isFormValid = () => {
    const validationErrors = validate();
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="account-title">Account</h2>
        {success && (
          <div className="account-success-message">
            Account created!
          </div>
        )}
        <form className="account-form" onSubmit={handleSubmit}>
          <label>
            Account type:
            <select
              name="type"
              value={type}
              onChange={handleChangeInput}
              className="account-input"
            >
              <option value="">Select account type</option>
              <option value="savings">Savings account</option>
              <option value="checking">Checking account</option>
              <option value="investment">Investment account</option>
            </select>
            {errors.type && <span style={{ color: "#ffbaba", fontSize: "0.95em" }}>{errors.type}</span>}
          </label>
          <label>
            Balance:
            <input
              type="number"
              name="balance"
              value={balance}
              onChange={handleChangeInput}
              className="account-input"
              min="0"
              step="0.01"
            />
            {errors.balance && <span style={{ color: "#ffbaba", fontSize: "0.95em" }}>{errors.balance}</span>}
          </label>
          <label>
            Currency:
            <select
              name="currency"
              value={currency}
              onChange={handleChangeInput}
              className="account-input"
            >
              <option value="">Select currency</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="ARS">Argentine Peso (ARS)</option>
            </select>
            {errors.currency && <span style={{ color: "#ffbaba", fontSize: "0.95em" }}>{errors.currency}</span>}
          </label>
          <div className="form-buttons" style={{ marginTop: "1.2rem" }}>
            <button
              type="submit"
              className="account-input account-btn"
              disabled={!isFormValid()}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
