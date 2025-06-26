import { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { email, password } = loginData;
  const navigate = useNavigate();

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
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(loginData));
      setSuccess(true);
      setLoginData(initialState);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {success && (
        <div className="login-success">Login successful!</div>
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
        />
        {errors.password && (
          <span className="login-error">{errors.password}</span>
        )}
      </label>
      <button className="login-submit" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
