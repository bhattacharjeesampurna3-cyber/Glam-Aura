import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Glam Aura
      </div>

      <div className="nav-links">
        <a>Beauty</a>
        <a>Fashion</a>
        <a>Luxury</a>
        <a>AI Tools</a>
      </div>

      <input className="search" placeholder="Search products..." />

      <div className="nav-icons">
        <span>❤</span>
        <span>🛒</span>
        <span>👤</span>
      </div>

    </nav>
  );
}

export default Navbar;