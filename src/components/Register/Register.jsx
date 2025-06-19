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
      newErrors.fullName = "El nombre completo es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(registerData.fullName)) {
      newErrors.fullName =
        "Ingrese un nombre válido (solo letras, mínimo 3 caracteres).";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        registerData.email
      )
    ) {
      newErrors.email = "Ingrese un email válido.";
    }

    if (!registerData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        registerData.password
      )
    ) {
      newErrors.password =
        "Mínimo 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    if (!registerData.documentNumber.trim()) {
      newErrors.documentNumber = "El número de documento es obligatorio.";
    } else if (!/^\d{7,}$/.test(registerData.documentNumber)) {
      newErrors.documentNumber = "Solo números, mínimo 7 dígitos.";
    }

    if (!registerData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{8,}$/.test(registerData.phone)) {
      newErrors.phone = "Solo números, mínimo 8 dígitos.";
    }

    if (!registerData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    } else {
      const birth = new Date(registerData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        if (age - 1 < 18) {
          newErrors.birthDate = "Debes ser mayor de 18 años.";
        }
      } else if (age < 18) {
        newErrors.birthDate = "Debes ser mayor de 18 años.";
      }
    }

    if (!registerData.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    } else if (registerData.address.trim().length < 5) {
      newErrors.address = "La dirección debe tener al menos 5 caracteres.";
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
      alert("Registro exitoso");
      setRegisterData(initialState);
      navigate("/login");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      <label className="register-label">
        Nombre completo:
        <input
          className="register-input"
          type="text"
          name="fullName"
          value={registerData.fullName}
          onChange={handleInputChange}
          placeholder="Ingrese su nombre completo"
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
          placeholder="Ingrese su email"
          required
        />
        {errors.email && <span className="register-error">{errors.email}</span>}
      </label>
      <label className="register-label">
        Contraseña:
        <input
          className="register-input"
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleInputChange}
          placeholder="Ingrese su contraseña"
          required
        />
        {errors.password && (
          <span className="register-error">{errors.password}</span>
        )}
      </label>
      <label className="register-label">
        Número de documento:
        <input
          className="register-input"
          type="text"
          name="documentNumber"
          value={registerData.documentNumber}
          onChange={handleInputChange}
          placeholder="Ingrese su número de documento"
          required
        />
        {errors.documentNumber && (
          <span className="register-error">{errors.documentNumber}</span>
        )}
      </label>
      <label className="register-label">
        Teléfono:
        <input
          className="register-input"
          type="tel"
          name="phone"
          value={registerData.phone}
          onChange={handleInputChange}
          placeholder="Ingrese su número de teléfono"
          required
        />
        {errors.phone && <span className="register-error">{errors.phone}</span>}
      </label>
      <label className="register-label">
        Fecha de nacimiento:
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
        Dirección:
        <input
          className="register-input"
          type="text"
          name="address"
          value={registerData.address}
          onChange={handleInputChange}
          placeholder="Ingrese su dirección"
          required
        />
        {errors.address && (
          <span className="register-error">{errors.address}</span>
        )}
      </label>
      <button className="register-submit" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default Register;
