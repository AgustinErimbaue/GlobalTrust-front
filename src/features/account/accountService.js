import axios from "axios";

const API_URL = "https://globaltrust-back.onrender.com/accounts";

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

const deleteAccount = async (accountId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/delete-account/${accountId}`, {
    headers: { authorization: token },
  });
  return res.data;
};
const accountService = {
  getById,
  createAccount,
  deleteAccount
};

export default accountService;
