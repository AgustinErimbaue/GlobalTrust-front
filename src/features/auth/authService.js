import axios from "axios";

const API_URL = "http://localhost:8080/users";

const getUserById = async (userId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const register = async (registerData) => {
  const res = await axios.post(`${API_URL}/register`, registerData);
  return res.data;
};

const login = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/logout`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${API_URL}/update-user/${profileData.id}`,
    profileData,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const deleteAccount = async (userId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/delete-user/${userId}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  updateProfile,
  deleteAccount,
  getUserById,
};

export default authService;
