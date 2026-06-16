import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Store.css";
import { shops as fakeStores } from "../data/data.js";

export default function Store() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchStore = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/store/${id}`);
      setStore(res.data.store);
    } catch (err) {
      const fake =
        fakeStores.find((s) => s.id === id) || fakeStores[0];
      setStore(fake);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [id]);

  /* ✅ FIXED LOADING */
  if (loading) return <p>Loading...</p>;

  if (!store) return <p>Store not found</p>;

  return (
    <div className="store-page">

    <div className="store-header">

      {/* STATUS */}
      {store.status && (
        <div className={`status-badge ${store.status.toLowerCase()}`}>
          {store.status}
        </div>
      )}

      {/* IMAGE */}
      {store.logos?.[0] && (
        <img
          className="store-image"
          src={`/${store.logos[0]}`}
          alt={store.name}
        />
      )}

      <h2>{store.name}</h2>

      <p>{store.description}</p>

      {/* STORE IMAGES */}
      {store.images?.length > 0 && (
        <div className="store-images">
          {store.images.map((img, index) => (
            <img
              key={index}
              src={`/${img}`}
              alt={`${store.name} ${index}`}
              className="store-gallery-img"
              onClick={() => setSelectedImage(`/${img}`)}
            />
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* PERCENTAGE (IMPORTANT: keep visible in flow) */}
      {store.percentage && store.percentage !== "" && (
        <div className="percentage-badge">
          {store.percentage} OFF
        </div>
      )}

    </div>

    {/* ADDRESSES */}
    <div className="store-addresses">
      <h3>Addresses</h3>

      {store.addresses?.map((a, i) => (
        <p key={i}>{a}</p>
      ))}
    </div>

  </div>
  );
}