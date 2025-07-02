import axios from "axios";

const API_URL = "http://localhost:8080/loans/";

const createLoan = async (loanData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}loan-requests`, loanData, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const getLoansByUserId = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const loanService = { createLoan, getLoansByUserId };

export default loanService;
