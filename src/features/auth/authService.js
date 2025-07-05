import axios from "axios";

const API_URL = "https://globaltrust-back.onrender.com/users";

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
  try {
    const res = await axios.post(`${API_URL}/register`, registerData);
    if (res.data && res.data.user && res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    if (error.response) {
      const errorMessage = error.response.data?.msg || 
                          error.response.data?.message || 
                          "Error al crear el usuario";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Server is not responding");
    } else {
      throw new Error(error.message || "Registration failed");
    }
  }
};

const login = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, loginData);
    if (res.data && res.data.user && res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    if (error.response) {
      const errorMessage = error.response.data?.msg || 
                          error.response.data?.message || 
                          "Usuario o contraseña incorrectos";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Server is not responding");
    } else {
      throw new Error(error.message || "Login failed");
    }
  }
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

const deleteUser = async (userId) => {
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
  deleteUser,
  getUserById,
};

export default authService;
