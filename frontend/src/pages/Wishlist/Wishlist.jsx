import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cartUtils";
import "../../styles/home.css";

function Wishlist() {

  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const moveToCart = (product) => {
    // Add to cart
    addToCart(product);

    // Remove from wishlist
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== product._id
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);

    alert("Moved to Cart");
  };

  return (
    <div className="category-container">

      <h2 className="category-title">My Wishlist</h2>

      {wishlist.length === 0 && (
        <p>Your wishlist is empty.</p>
      )}

      <div className="product-grid">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <h4>{product.name}</h4>
            <p>₹{product.price}</p>

            {/* Buttons */}
            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>

              <button
                style={buttonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  moveToCart(product);
                }}
              >
                Move to Cart
              </button>

              <button
                style={{ ...buttonStyle, background: "#444" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product._id);
                }}
              >
                Remove
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#ff4d79",
  color: "white",
  cursor: "pointer",
  fontSize: "14px"
};

export default Wishlist;