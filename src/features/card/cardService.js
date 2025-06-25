import axios from "axios";

const API_URL = "http://localhost:8080/cards";

const createCard = async (carData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/create-card`, carData, {
    headers: { authorization: token },
  });
  return res.data;
};

const cardService = {
  createCard,
};

export default cardService;
