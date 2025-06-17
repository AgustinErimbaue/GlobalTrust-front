import { useState } from "react";
import "./Register.css"; 
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
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(registerData.email)
    ) {
      newErrors.email = "Ingrese un email válido.";
    }

    if (!registerData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(registerData.password)
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
      alert("Registro exitoso");
      setRegisterData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Nombre completo:
        <input
          type="text"
          name="fullName"
          value={registerData.fullName}
          onChange={handleInputChange}
          placeholder="Ingrese su nombre completo"
          required
        />
        {errors.fullName && (
          <span style={{ color: "red" }}>{errors.fullName}</span>
        )}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleInputChange}
          placeholder="Ingrese su email"
          required
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleInputChange}
          placeholder="Ingrese su contraseña"
          required
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </label>
      <label>
        Número de documento:
        <input
          type="text"
          name="documentNumber"
          value={registerData.documentNumber}
          onChange={handleInputChange}
          placeholder="Ingrese su número de documento"
          required
        />
        {errors.documentNumber && (
          <span style={{ color: "red" }}>{errors.documentNumber}</span>
        )}
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="phone"
          value={registerData.phone}
          onChange={handleInputChange}
          placeholder="Ingrese su número de teléfono"
          required
        />
        {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
      </label>
      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="birthDate"
          value={registerData.birthDate}
          onChange={handleInputChange}
          required
        />
        {errors.birthDate && (
          <span style={{ color: "red" }}>{errors.birthDate}</span>
        )}
      </label>
      <label>
        Dirección:
        <input
          type="text"
          name="address"
          value={registerData.address}
          onChange={handleInputChange}
          placeholder="Ingrese su dirección"
          required
        />
        {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Register;
