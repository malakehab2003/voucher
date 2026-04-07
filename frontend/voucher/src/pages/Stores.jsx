import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Stores.css";

export default function Store() {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");


  const fakeStores = [
    {
      id: "1",
      name: "Volo",
      description: "This is a shop of selling men clothes.",
      category_id: 1,
      vouchers: [
        { id: "1", name: "Voucher A", price: 10, discount: 20, quantity: 5 },
        { id: "2", name: "Voucher B", price: 15, percentage: 10, quantity: 2 },
      ],

      images: ["volo.jpg"]
    },

    {
      id: "6",
      name: "Vatrina",
      description: "This is a slipper shop for men and women.",
      category_id: 1,
      vouchers: [
        { id: "1", name: "Voucher A", price: 10, discount: 20, quantity: 5 },
        { id: "2", name: "Voucher B", price: 15, percentage: 10, quantity: 2 },
      ],

      images: ["vatrina.png"]
    },

    {
      id: "2",
      name: "Tiny Kids",
      description: "This is store for selling kids clothes.",
      category_id: 1,
      vouchers: [
        { id: "3", name: "Voucher C", price: 5, quantity: 10 },
      ],
      
      images: ["tiny_kids.jpeg"]
    },

    {
      id: "3",
      name: "Real Soft House",
      category_id: 2,
      description: "this is an institue of courses.",
      vouchers: [
        { id: "3", name: "Voucher C", price: 5, quantity: 10 },
      ],
      
      images: ["real_soft_house.jpg"]
    },

    {
      id: "4",
      name: "Dr Mark",
      description: "Dentist.",
      category_id: 7,
      vouchers: [
        { id: "3", name: "Voucher C", price: 5, quantity: 10 },
      ],
      
      images: ["dr_mark_dentist.jpeg"]
    },

    {
      id: "5",
      name: "Max gym",
      description: "This gym for healthy and athletics.",
      category_id: 5,
      vouchers: [
        { id: "3", name: "Voucher C", price: 5, quantity: 10 },
      ],
      
      images: ["max_gym.jpeg"]
    },
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
  const fetchCategories = async (category) => {
    try {
      const res = await axios.get("http://localhost:5000/api/category/list");
      setCategories(res.data.categories);
    } catch (err) {
      console.log("Backend failed, using fake categories:", err.message);
      setCategories(fakeCategories);
    }
  };

  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  
  fetchStores(category);
  fetchCategories();
}, [location.search]);

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