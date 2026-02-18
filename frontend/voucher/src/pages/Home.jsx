import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";


export default function Home() {
  const [vouchers, setVouchers] = useState([]);

  const fetchVouchers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/voucher/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVouchers(res.data.vouchers);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Buy Digital Vouchers Instantly 🎁</h1>
        <p>Best deals on gaming, shopping, and gift cards</p>
        <Link to="/stores">
          <button className="hero-btn">Shop Now</button>
        </Link>
      </section>

      {/* STORE SECTION */}
      <section className="store">
        <h2>Popular Vouchers</h2>

        <div className="voucher-grid">
          {vouchers.length === 0 ? (
            <p>Loading vouchers...</p>
          ) : (
            vouchers.map((voucher) => (
              <div className="voucher-card" key={voucher.id}>
                <h3>{voucher.name}</h3>
                <p>${voucher.price} Available</p>
                <button>Buy Now</button>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
