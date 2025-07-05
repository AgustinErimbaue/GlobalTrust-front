import axios from "axios";

const API_URL = "https://globaltrust-back.onrender.com/cards";

const createCard = async (cardData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/create-card`, cardData, {
    headers: { authorization: token },
  });
  return res.data;
};

const getById = async (cardId) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${API_URL}/get-cards/${cardId}`, {
    headers: { authorization: token },
  });
  return res.data;
}

const deleteCard = async (cardId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/delete-card/${cardId}`, {
    headers: { authorization: token },
  });
  return res.data;
};
const cardService = {
  createCard,
  getById,
  deleteCard
};

export default cardService;
