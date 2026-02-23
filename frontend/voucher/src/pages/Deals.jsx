import { useEffect, useState } from "react";
import axios from "axios";
import "./Deals.css";

export default function Deals() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fake data
  const fakeCategories = [
    { id: 1, name: "clothes" },
    { id: 2, name: "courses" },
    { id: 3, name: "makeup and accessories" },
    { id: 4, name: "optics and glasses" },
    { id: 5, name: "gym" },
    { id: 6, name: "perfumes" },
    { id: 7, name: "clinics" },
  ];

  const fakeProducts = [
    {
      id: "1",
      name: "Gaming Voucher",
      price: 10,
      store: { images: ["https://via.placeholder.com/150"] },
      category_id: 2,
    },
    {
      id: "2",
      name: "Shopping Voucher",
      price: 20,
      store: { images: ["https://via.placeholder.com/150"] },
      category_id: 3,
    },
    {
      id: "3",
      name: "Gift Card",
      price: 15,
      store: { images: ["https://via.placeholder.com/150"] },
      category_id: 1,
    },
  ];

  const fetchProducts = async (categoryId = "") => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:5000/api/voucher/list";
      if (categoryId) url += `?category_id=${categoryId}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data.vouchers);
    } catch (err) {
      console.log("Backend failed, using fake products:", err.message);
      // فلترة على fakeProducts لو فيه category
      if (categoryId) {
        setProducts(fakeProducts.filter((p) => p.category_id === parseInt(categoryId)));
      } else {
        setProducts(fakeProducts);
      }
    }
  };

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
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleReset = () => {
    setSelectedCategory("");
    fetchProducts();
  };

  return (
    <div className="deal-container">
      <h2>Deals</h2>

      {/* Category Filter */}
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

      {/* Products Grid */}
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.store?.images?.[0] && (
                <img src={product.store.images[0]} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button>Buy Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}