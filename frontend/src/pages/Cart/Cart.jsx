import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

function Cart() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: { items: cart }
    });
  };

  return (
    <div className="category-container">

      <h2 className="category-title">My Cart</h2>

      {cart.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      <div className="product-grid">
        {cart.map((product) => (
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

            {/* Quantity Controls */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(product._id);
                }}
                style={qtyBtn}
              >
                -
              </button>

              <span style={{ margin: "0 10px" }}>
                {product.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(product._id);
                }}
                style={qtyBtn}
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              style={removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(product._id);
              }}
            >
              Remove
            </button>

          </div>
        ))}
      </div>

      {/* Total + Buy Now */}
      {cart.length > 0 && (
        <div style={{ marginTop: "40px" }}>

          <h3>Total: ₹{totalPrice}</h3>

          <button
            style={buyNowBtn}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>
      )}

    </div>
  );
}

const qtyBtn = {
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none",
  background: "#ff4d79",
  color: "white",
  cursor: "pointer"
};

const removeBtn = {
  marginTop: "10px",
  padding: "8px",
  borderRadius: "8px",
  border: "none",
  background: "#444",
  color: "white",
  cursor: "pointer"
};

const buyNowBtn = {
  marginTop: "20px",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#ff4d79",
  color: "white",
  cursor: "pointer",
  fontSize: "16px"
};

export default Cart;