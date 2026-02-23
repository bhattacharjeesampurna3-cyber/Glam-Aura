import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark luxury-nav">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">GlamAura</Link>

        <div>
          <Link to="/upload" className="btn btn-outline-light me-2">
            AI Try
          </Link>
          <Link to="/login" className="btn btn-pink">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
