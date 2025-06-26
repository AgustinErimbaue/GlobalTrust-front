import axios from "axios";

const API_URL = "http://localhost:8080/cards";

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

const cardService = {
  createCard,
  getById
};

export default cardService;
