import { useState } from "react";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { email, password } = loginData;

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      newErrors.email = "Ingrese un email válido.";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {      alert("Inicio de sesión exitoso");
      setLoginData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
      </label>
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
