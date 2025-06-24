import axios from "axios";

const API_URL = "http://localhost:8080/accounts";

const getById = async (accountId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/account/${accountId}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const createAccount = async (accountData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/create-account`, accountData, {
    headers: { authorization: token },
  });
  return res.data;
};

const accountService = {
  getById,
  createAccount,
};

export default accountService;
