import { useEffect, useState } from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  getCardById,
  resetCardState,
} from "../../features/card/cardSlice";

const Card = () => {
  const initialState = {
    type: "",
  };
  const [dataForm, setDataForm] = useState(initialState);
  const { type } = dataForm;
  const dispatch = useDispatch();
  const { card, isSuccess } = useSelector((state) => state.card);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && (user._id || user.id)) {
      dispatch(getCardById(user._id || user.id));
    }
  }, [dispatch, user?._id, user?.id]);

  useEffect(() => {
    if (isSuccess && user && (user._id || user.id)) {
      dispatch(getCardById(user._id || user.id));
      const timer = setTimeout(() => {
        dispatch(resetCardState());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, dispatch, user?._id, user?.id]);

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
  };

  return (
    <div className="card-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2 className="card-title">Add Card</h2>
        {isSuccess && (
          <div className="card-success-message">Card created successfully!</div>
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

      {Array.isArray(card) && card.length > 0 && (
        <div className="cards-list">
          <h3>My Cards</h3>
          {card.map((c) => (
            <div key={c.id} className="card-info">
              <h4>Card Number: {c.number}</h4>
              <h4>CVV: {c.cvv}</h4>
              <h4>Type: {c.type}</h4>
              <h4>
                Expiration: {new Date(c.expirationDate).toLocaleDateString()}
              </h4>
            </div>
          ))}
        </div>
      )}
      {Array.isArray(card) && card.length === 0 && (
        <div className="cards-list">
          <h3>No cards found.</h3>
        </div>
      )}
    </div>
  );
};

export default Card;
