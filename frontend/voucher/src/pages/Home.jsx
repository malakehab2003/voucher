import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [index, setIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const fakeStores = [
    {
      id: "1",
      name: "Volo",
      description: "Men clothes store",
      images: ["volo.jpg"],
    },
    {
      id: "2",
      name: "Tiny Kids",
      description: "Kids clothes store",
      images: ["tiny_kids.jpeg"],
    },
    {
      id: "3",
      name: "Real Soft House",
      description: "Courses institute",
      images: ["real_soft_house.jpg"],
    },
    {
      id: "4",
      name: "Dr Mark",
      description: "Dentist",
      images: ["dr_mark_dentist.jpeg"],
    },
    {
      id: "5",
      name: "Max gym",
      description: "This gym for healthy and athletics.",
      images: ["max_gym.jpeg"]
    },
    {
      id: "6",
      name: "Vatrina",
      description: "This is a slipper shop for men and women.",
      images: ["vatrina.png"]
    },
    {
      id: "7",
      name: "view optics",
      description: "This shop for glasses and sunglasses.",
      images: ["view_optics.jpeg"]
    },
    {
      id: "8",
      name: "Shailene",
      description: "Women clothes store",
      images: ["shailene.jpeg"]
    },
    {
      id: "9",
      name: "No.1",
      description: "Elegant classic shoes",
      images: ["No.1 classic shoe.jpeg"]
    },
  ];

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
                backgroundImage: `url(${stores[index].images[0]})`,
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

            {/* LEFT */}
            <button className="arrow left" onClick={prevSlide}>
              ❮
            </button>

            {/* RIGHT */}
            <button className="arrow right" onClick={nextSlide}>
              ❯
            </button>

            {/* DOTS */}
            <div className="hero-dots">
              {stores.map((_, i) => (
                <span
                  key={i}
                  className={i === index ? "dot active" : "dot"}
                  onClick={() => setIndex(i)}
                ></span>
              ))}
            </div>
          </>
        )}
      </section>

      {/* STORE GRID */}
      <section className="store">
        <h2>Popular Stores</h2>

        <div className="voucher-grid">
          {stores.map((store) => (
            <div className="voucher-card" key={store.id}>
              <h3>{store.name}</h3>
              <p>{store.description}</p>
              <Link to={`/store/${store.id}`}>
                <button>View Store</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}