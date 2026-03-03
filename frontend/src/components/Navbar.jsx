import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "#ff2e63" }}>
          Glam Aura
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/category/beauty">Beauty</Link>
        <Link to="/category/fashion">Fashion</Link>
        <Link to="/category/luxury">Luxury</Link>
        <Link to="/category/ai-tools">AI Tools</Link>
      </div>

      <input className="search" placeholder="Search products..." />

      <div className="nav-icons">
        <Link to="/wishlist">❤</Link>
        <Link to="/cart">🛒</Link>
        <Link to="/profile">👤</Link>
      </div>

    </nav>
  );
}

export default Navbar;