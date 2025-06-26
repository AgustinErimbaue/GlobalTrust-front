import { useEffect, useState } from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  getCardById,
  resetCardState,
  deleteCard
} from "../../features/card/cardSlice";

const Card = () => {
  const initialState = {
    type: "",
  };
  const [dataForm, setDataForm] = useState(initialState);
  const [deleteButton, setDeleteButton] = useState(false);
  const { type } = dataForm;
  const dispatch = useDispatch();
  const { card, isSuccess } = useSelector((state) => state.card);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getCardById(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isSuccess && user && user.id) {
      dispatch(getCardById(user.id));
      const timer = setTimeout(() => {
        dispatch(resetCardState());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, dispatch, user]);

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

  const handleDeleteButtonClick = () => {
    setDeleteButton(!deleteButton);
  };  
  return (
    <div className="card-container">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2 className="card-title">Add Card</h2>
        {isSuccess && (
          <div className="card-success-message">Card created successfully!</div>
        )}
        <label htmlFor="card-type">
          Card type:
          <select
            id="card-type"
            name="type"
            value={type}
            onChange={handleInputChange}
            className="card-input"
            aria-label="Card type"
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

      <label className="lost-card-label">
        Lost your card?
        <button type="button" className="lost-card-btn" onClick={handleDeleteButtonClick}>
          Select card to delete
        </button>
      </label>

      {Array.isArray(card) && card.length > 0 && (
        <div className="cards-list">
          <h3>
            <span role="img" aria-label="cards" style={{ marginRight: "8px" }}>
              💳
            </span>
            My Cards
          </h3>
          {card.map((c) => (
            <div key={c.id} className="card-info">
              <div className="card-info-content">
                <div className="card-number">{c.number}</div>
                <h4>CVV: {c.cvv}</h4>
                <div className="card-type">{c.type}</div>
                <h4>
                  Expiration: {new Date(c.expirationDate).toLocaleDateString()}
                </h4>
                {deleteButton && (
                  <button
                    className="delete-card-btn"
                    onClick={() => {
                      dispatch(deleteCard(c.id));
                      setDeleteButton(false);
                    }}
                  >
                    Delete Card
                  </button>
                )}
              </div>
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
