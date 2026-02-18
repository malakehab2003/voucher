import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Stores.css";

export default function Store() {
  const [stores, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/store/list");
      setShops(res.data.stores);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="store-container">
      <h2>All Stores</h2>
      <div className="stores-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            {store.images?.[0] && <img
              src={store.images?.[0]}
              alt={store.name}
              className="store-img"
            />}
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
