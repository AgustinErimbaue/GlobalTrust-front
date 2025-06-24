import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import "./Profile.css";
import {
  updateProfile,
  getUserById,
  deleteUser,
} from "../../features/auth/authSlice";
import { deleteAccount } from "../../features/account/accountSlice";

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
      "Are you sure you want to delete your account?"
    );
    if (confirm) {
      dispatch(deleteUser(user.id));
      dispatch(deleteAccount(user.id));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.documentNumber.trim()) return "Document number is required";
    if (!formData.phone.trim()) return "Phone is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    await dispatch(updateProfile(formData));
    await dispatch(getUserById(user.id));
    setEditMode(false);
  };

  if (!user) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">
            User Profile
            <FiSettings className="gear-icon" onClick={toggleMenu} />
          </h2>
          {menuOpen && (
            <div className="profile-menu">
              <button onClick={handleEdit}>Edit profile</button>
              <button onClick={handleDelete}>Delete account</button>
            </div>
          )}
        </div>

        {editMode ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">
              Full name:
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="documentNumber">
              Document number:
              <input
                id="documentNumber"
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="phone">
              Phone:
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <div className="form-buttons">
              <button type="submit">Save changes</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Full name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Document number:</strong> {user.documentNumber}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
