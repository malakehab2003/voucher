import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { shops as fakeStores }  from '../data/data.js';
import { categories as fakeCategories }  from '../data/data.js';

export default function Home() {
  const [stores, setStores] = useState([]);
  const [index, setIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/store/list");

      const data = res.data.stores.map((s) => ({
        ...s,
        image:
          s.images?.[0]
            ? "/" + s.images[0]
            : "https://via.placeholder.com/800x400?text=" + s.name,
      }));

      setStores(data);
    } catch (err) {
      console.log("Using fake stores");
      setStores(fakeStores);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (stores.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stores.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [stores.length]);

  // reset index
  useEffect(() => {
    setIndex(0);
  }, [stores]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % stores.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? stores.length - 1 : prev - 1
    );
  };

  // swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <div className="home">

      {/* HERO */}
      <section
        className="hero"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {stores.length === 0 ? (
          <h1 className="loading">Loading Stores...</h1>
        ) : (
          <>
            {/* Background */}
            <div
              key={stores[index].images[0]}
              className="hero-bg"
              style={{
                backgroundImage: `url(${stores[index].logos[0]})`,
              }}
            ></div>

            {/* Content */}
            <div className="hero-content">
              <h1>{stores[index].name}</h1>
              <p>{stores[index].description}</p>

              <Link to="/stores">
                <button className="hero-btn">Explore Store</button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Hook place */}
      {/* <img className="hook" src="hook.jpeg" alt="Hook" /> */}

      {/* STORE GRID */}
      <section className="store">
        <div className="store-header-row">
          <h2>Popular Stores</h2>
        </div>

        <div className="store-scroll">
          {stores.map((store) => (
            <Link to={`/store/${store.id}`} className="store-link">
              <div className="store-card" key={store.id}>

                {store.status && (
                  <div className={`status-badge ${store.status.toLowerCase()}`}>
                    {store.status}
                  </div>
                )}

                {/* IMAGE */}
                {store.logos?.[0] && (
                  <img
                    src={`/${store.logos[0]}`}
                    alt={store.name}
                    className="store-card-img"
                  />
                )}

                <h3>{store.name}</h3>
                <p>{store.description}</p>
                {store.percentage && (
                  <div className="percentage-badge">
                    {store.percentage} OFF
                  </div>
                )}

                  <button>View Store</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}