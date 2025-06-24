import React, { useState } from "react";
import "./Account.css";
const Account = () => {
  const initialState = {
    balance: 0,
    type: "",
    currency: "",
  };
  const [accountData, setAccountData] = useState(initialState);

  const handleChangeInput = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
    console.log(accountData);
  };

  const { balance, type, currency } = accountData;
  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="account-title">Account</h2>
        <form className="account-form">
          <label>
            Account type:
            <input
              type="text"
              name="type"
              value={type}
              onChange={handleChangeInput}
              className="account-input"
              placeholder="e.g. Savings account"
            />
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
          </label>
        </form>
      </div>
    </div>
  );
};

export default Account;
