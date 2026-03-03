import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../utils/api";
import "../../styles/home.css";

function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
    } else {
      navigate("/");
    }
  }, []);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    try {

      const orderData = {
        userDetails: formData,
        items,
        totalAmount: totalPrice
      };

      await API.post("/orders", orderData);

      alert("Order placed successfully 🎉");

      localStorage.removeItem("cart");

      navigate("/home");

    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <div className="checkout-grid">

        {/* SHIPPING FORM */}
        <div className="checkout-form">

          <h3>Shipping Details</h3>

          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}

        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-summary">

          <h3>Order Summary</h3>

          {items.map((item) => (
            <p key={item._id}>
              {item.name} x {item.quantity || 1}
            </p>
          ))}

          <h4>Total: ₹{totalPrice}</h4>

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;