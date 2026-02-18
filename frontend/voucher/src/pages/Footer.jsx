import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>Voucher<span>Store</span></h2>
          <p>Your best place to buy digital vouchers instantly.</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Deals</a>
          <a href="#">Support</a>
        </div>

        {/* SUPPORT */}
        <div className="footer-links">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <h4>Subscribe</h4>
          <p>Get latest deals & offers</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} VoucherStore. All rights reserved.
      </div>
    </footer>
  );
}
