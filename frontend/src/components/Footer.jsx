import "./footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
          <h2>GlamStyle</h2>
          <p>
            AI-powered beauty & fashion recommendations tailored just for you.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>AI Recommendations</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul>
            <li>FAQs</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span>📷</span>
            <span>📘</span>
            <span>🐦</span>
            <span>▶</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GlamStyle. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
