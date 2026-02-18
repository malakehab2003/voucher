import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 جديد
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  const handleAuthClick = () => {
    if (userLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        Voucher
        <Link to="/">
          <img src="logo.png" alt="store" />
        </Link>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/stores">Stores</Link></li>
        <li><Link to="/deals">Deals</Link></li>
      </ul>

      <div className="right-section">
        <button className="nav-btn" onClick={handleAuthClick}>
          {userLoggedIn ? "Profile" : "Login"}
        </button>

        <div 
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
}
