import { useState } from "react";
import "./Register.css";
import { register } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    documentNumber: "",
    phone: "",
    birthDate: "",
    address: "",
    role: "user",
    isActive: true,
  };

  const [registerData, setRegisterData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};

    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(registerData.fullName)) {
      newErrors.fullName =
        "Enter a valid name (letters only, minimum 3 characters).";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        registerData.email
      )
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        registerData.password
      )
    ) {
      newErrors.password =
        "Minimum 8 characters, one uppercase, one lowercase and one number.";
    }

    if (!registerData.documentNumber.trim()) {
      newErrors.documentNumber = "Document number is required.";
    } else if (!/^\d{7,}$/.test(registerData.documentNumber)) {
      newErrors.documentNumber = "Numbers only, minimum 7 digits.";
    }

    if (!registerData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{8,}$/.test(registerData.phone)) {
      newErrors.phone = "Numbers only, minimum 8 digits.";
    }

    if (!registerData.birthDate) {
      newErrors.birthDate = "Birth date is required.";
    } else {
      const birth = new Date(registerData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        if (age - 1 < 18) {
          newErrors.birthDate = "You must be over 18 years old.";
        }
      } else if (age < 18) {
        newErrors.birthDate = "You must be over 18 years old.";
      }
    }

    if (!registerData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (registerData.address.trim().length < 5) {
      newErrors.address = "Address must have at least 5 characters.";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(register(registerData));
      alert("Registration successful");
      setRegisterData(initialState);
      navigate("/login");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      <label className="register-label">
        Full name:
        <input
          className="register-input"
          type="text"
          name="fullName"
          value={registerData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
        />
        {errors.fullName && (
          <span className="register-error">{errors.fullName}</span>
        )}
      </label>
      <label className="register-label">
        Email:
        <input
          className="register-input"
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="register-error">{errors.email}</span>}
      </label>
      <label className="register-label">
        Password:
        <input
          className="register-input"
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />
        {errors.password && (
          <span className="register-error">{errors.password}</span>
        )}
      </label>
      <label className="register-label">
        Document number:
        <input
          className="register-input"
          type="text"
          name="documentNumber"
          value={registerData.documentNumber}
          onChange={handleInputChange}
          placeholder="Enter your document number"
          required
        />
        {errors.documentNumber && (
          <span className="register-error">{errors.documentNumber}</span>
        )}
      </label>
      <label className="register-label">
        Phone:
        <input
          className="register-input"
          type="tel"
          name="phone"
          value={registerData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required
        />
        {errors.phone && <span className="register-error">{errors.phone}</span>}
      </label>
      <label className="register-label">
        Birth date:
        <input
          className="register-input"
          type="date"
          name="birthDate"
          value={registerData.birthDate}
          onChange={handleInputChange}
          required
        />
        {errors.birthDate && (
          <span className="register-error">{errors.birthDate}</span>
        )}
      </label>
      <label className="register-label">
        Address:
        <input
          className="register-input"
          type="text"
          name="address"
          value={registerData.address}
          onChange={handleInputChange}
          placeholder="Enter your address"
          required
        />
        {errors.address && (
          <span className="register-error">{errors.address}</span>
        )}
      </label>
      <button className="register-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Register;
