import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./store.css";

export default function Store() {
  const { id } = useParams(); // store id from URL
  const [store, setStore] = useState(null);
  const [vouchers, setVouchers] = useState([]);

  // Fake data
  const fakeStores = [
    {
      id: "1",
      name: "Store One",
      description: "This is a fake store description.",
      vouchers: [
        { id: "1", name: "Voucher A", price: 10, discount: 20, quantity: 5 },
        { id: "2", name: "Voucher B", price: 15, percentage: 10, quantity: 2 },
      ],
    },
    {
      id: "2",
      name: "Store Two",
      description: "Another fake store with vouchers.",
      vouchers: [
        { id: "3", name: "Voucher C", price: 5, quantity: 10 },
      ],
    },
  ];

  const fetchStore = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/store/${id}`);
      setStore(res.data.store);
      setVouchers(res.data.store.vouchers);
    } catch (err) {
      console.log("Backend failed, using fake store:", err.message);
      // Use fake store based on id
      const fake = fakeStores.find((s) => s.id === id) || fakeStores[0];
      setStore(fake);
      setVouchers(fake.vouchers);
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