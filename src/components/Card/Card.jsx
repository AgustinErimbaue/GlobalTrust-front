import { useState } from "react";
import "./Card.css";

const Card = () => {
  const initialState = {
    type: "",
  };
  const [dataForm, setDataForm] = useState(initialState);
  const { type } = dataForm;

  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="card-container">
      <form className="card-form">
        <h2 className="card-title">Add Card</h2>
        <label>
          Card type:
          <select
            name="type"
            value={type}
            onChange={handleInputChange}
            className="card-input"
          >
            <option value="">Select card type</option>
            <option value="credit">Credit card</option>
            <option value="debit">Debit card</option>
          </select>
        </label>
        <button type="submit" className="card-btn">
          Add card
        </button>
      </form>
    </div>
  );
};

export default Card;
