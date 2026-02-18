import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./store.css";

export default function Store() {
  const { id } = useParams(); // store id from URL
  const [store, setStore] = useState(null);
  const [vouchers, setVouchers] = useState([]);

  const fetchStore = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/store/${id}`);
      setStore(res.data.store);
      setVouchers(res.data.store.vouchers);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [id]);

  if (!store) return <p>Loading store...</p>;

  return (
    <div className="store-page">
      <h2>{store.name}</h2>
      {store.description && <p>{store.description}</p>}

      <h3>Vouchers</h3>
      <div className="vouchers-grid">
        {vouchers.length === 0 ? (
          <p>No vouchers available</p>
        ) : (
          vouchers.map((v) => (
            <div key={v.id} className="voucher-card">
              <h4>{v.name}</h4>
              <p>Price: ${v.price}</p>
              {v.discount && <p>Discount: {v.discount}%</p>}
              {v.percentage && <p>Percentage: {v.percentage}%</p>}
              <p>Quantity: {v.quantity}</p>
              <button>Buy Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
