import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import "./Profile.css";
import { updateProfile, deleteAccount, getUserById } from "../../features/auth/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    documentNumber: "",
    phone: "",
  });

  useEffect(() => {
    if (editMode && user) {
      setFormData({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        documentNumber: user.documentNumber,
        phone: user.phone,
      });
    }
  }, [user, editMode]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleEdit = () => {
    setEditMode(true);
    setMenuOpen(false);
  };

  const handleCancelEdit = () => setEditMode(false);

  const handleDelete = () => {
    const confirm = window.confirm(
      "¿Estás seguro de que querés eliminar tu cuenta?"
    );
    if (confirm) {
      dispatch(deleteAccount());
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(formData));
    await dispatch(getUserById(user.id));
    setEditMode(false);
  };

  if (!user) return <p className="profile-loading">Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">
            Perfil del Usuario
            <FiSettings className="gear-icon" onClick={toggleMenu} />
          </h2>
          {menuOpen && (
            <div className="profile-menu">
              <button onClick={handleEdit}>Editar perfil</button>
              <button onClick={handleDelete}>Eliminar cuenta</button>
            </div>
          )}
        </div>

        {editMode ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Nombre completo:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              DNI:
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <div className="form-buttons">
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Nombre completo:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>DNI:</strong> {user.documentNumber}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
