import axios from "axios";

const API_URL = "http://localhost:8080/users";

const register = async (registerData) => {
  const res = await axios.post(`${API_URL}/register`, registerData);
  return res.data;
};

const login = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data
};

const authService = {
  register,
  login,
};

export default authService;
