import { useState } from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { createCard, resetCardState } from "../../features/card/cardSlice";

const Card = () => {
  const initialState = {
    type: "",
  };
  const [dataForm, setDataForm] = useState(initialState);
  const { type } = dataForm;
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.card);

  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      alert("Please select a card type");
      return;
    }
    dispatch(createCard(dataForm));
    setDataForm(initialState);
    setTimeout(() => {
      dispatch(resetCardState());
    }, 2000);
  };

  return (
    <div className="card-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2 className="card-title">Add Card</h2>
        {isSuccess && (
          <div className="card-success-message">
            Card created successfully!
          </div>
        )}
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
