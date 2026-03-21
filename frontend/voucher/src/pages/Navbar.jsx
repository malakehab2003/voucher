import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const menuRef = useRef();

  const fakeCategories = [
    { id: 1, name: "clothes" },
    { id: 2, name: "courses" },
    { id: 3, name: "makeup and accessories" },
    { id: 4, name: "optics and glasses" },
    { id: 5, name: "gym" },
    { id: 6, name: "perfumes" },
    { id: 7, name: "clinics" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
    fetchCategories();
  }, []);

  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category/list");
      setCategories(res.data.categories);
    } catch (err) {
      console.log("Using fake categories");

      setCategories(fakeCategories);
    }
  };

  // open dropdown
  const handleCategoriesClick = () => {
    setCategoriesOpen(!categoriesOpen);

    if (categories.length === 0) {
      fetchCategories();
    }
  };

  // go to stores with filter
  const handleCategorySelect = (categoryId) => {
    setCategoriesOpen(false);
    setMenuOpen(false);
    navigate(`/stores?category=${categoryId}`);
  };

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAuthClick = () => {
    if (userLoggedIn) navigate("/profile");
    else navigate("/login");
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

        <img src="/logo.png" alt="logo" />
      </div>

      <ul
        ref={menuRef}
        className={`nav-links ${menuOpen ? "active" : ""}`}
      >
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/stores">Stores</Link>
        </li>

        <li>
          <Link to="/deals">Deals</Link>
        </li>

        {/* 🔥 Categories Dropdown */}
        <li className="dropdown">
          <span onClick={handleCategoriesClick}>Categories ⬇</span>

          {categoriesOpen && (
            <ul className="dropdown-menu">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
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