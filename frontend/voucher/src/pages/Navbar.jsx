import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  // Close menu on outside click + scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
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
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <div className="logo-text">
            <span className="main-logo">Voucher</span>
            <span className="sub-logo">For Everything</span>
          </div>
        </Link>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src="logo.png" alt="store" />
        </Link>
      </div>

      <ul
        ref={menuRef}
        className={`nav-links ${menuOpen ? "active" : ""}`}
      >
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/stores" onClick={() => setMenuOpen(false)}>Stores</Link>
        </li>
        <li>
          <Link to="/deals" onClick={() => setMenuOpen(false)}>Deals</Link>
        </li>
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