import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div>
          <div className="footer-logo">GlamAura</div>
          <p className="footer-about">
            AI powered beauty and fashion recommendations
            designed just for you.
          </p>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">Makeup</a></li>
            <li><a href="#">Dresses</a></li>
            <li><a href="#">Luxury</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 GlamAura. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;