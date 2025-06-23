import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Card from "./components/Card/Card";
import Loan from "./components/Loan/Loan";
import Logout from "./components/Logout/Logout";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/card" element={<Card />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
