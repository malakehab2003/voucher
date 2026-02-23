import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Stores.css";

export default function Store() {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fake data
  // Fake data
  const fakeStores = [
    { id: 1, name: "Adidas", category_id: 1 },
    { id: 2, name: "Nike", category_id: 2 },
    { id: 3, name: "Puma", category_id: 1 },
  ];

  const fakeCategories = [
    { id: 1, name: "clothes" },
    { id: 2, name: "courses" },
    { id: 3, name: "makeup and accessories" },
    { id: 4, name: "optics and glasses" },
    { id: 5, name: "gym" },
    { id: 6, name: "perfumes" },
    { id: 7, name: "clinics" },
  ];

  // Fetch stores (with optional category filter)
  const fetchStores = async (categoryId = "") => {
    try {
      let url = "http://localhost:5000/api/store/list";
      if (categoryId) url += `?category_id=${categoryId}`;

      const res = await axios.get(url);
      setStores(res.data.stores);
    } catch (err) {
      console.log("Backend failed, using fake stores:", err.message);
      // Use fake stores if backend fails
      if (categoryId) {
        setStores(fakeStores.filter((s) => s.category_id === parseInt(categoryId)));
      } else {
        setStores(fakeStores);
      }
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category/list");
      setCategories(res.data.categories);
    } catch (err) {
      console.log("Backend failed, using fake categories:", err.message);
      setCategories(fakeCategories);
    }
  };

  useEffect(() => {
    fetchStores();
    fetchCategories();
  }, []);

  // When dropdown changes
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchStores(categoryId);
  };

  // Reset filter
  const handleReset = () => {
    setSelectedCategory("");
    fetchStores();
  };

  return (
    <div className="store-container">
      <h2>All Stores</h2>

      {/* Dropdown */}
      <div className="filter-section">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Stores */}
      <div className="stores-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            {store.images?.[0] && (
              <img
                src={store.images[0]}
                alt={store.name}
                className="store-img"
              />
            )}
            <h3>{store.name}</h3>
            <Link to={`/store/${store.id}`}>
              <button>View Vouchers</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}