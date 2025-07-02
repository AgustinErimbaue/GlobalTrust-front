import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const { email, password } = loginData;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Enter a valid email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must have at least 8 characters.";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(loginData));
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="login-error-message">{error}</div>
      )}
      
      <label className="login-label">
        Email:
        <input
          className="login-input"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
        {errors.email && <span className="login-error">{errors.email}</span>}
      </label>

      <label className="login-label">
        Password:
        <input
          className="login-input"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
          disabled={isLoading}
        />
        {errors.password && (
          <span className="login-error">{errors.password}</span>
        )}
      </label>
      
      <button 
        className="login-submit" 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
