import { useEffect, useState } from "react";
import axios from "axios";
import "./Deals.css";

export default function Deals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:5000/api/voucher/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            setProducts(res.data.vouchers);
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert("Failed to fetch products!");
        }
    };

  return (
    <div className="deal-container">
      <h2>Deals</h2>

      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            {product.store.images && <img src={product.store.images[0]} alt="" />}
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
