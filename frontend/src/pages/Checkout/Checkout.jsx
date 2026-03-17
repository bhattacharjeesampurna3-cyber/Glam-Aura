import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpay = async () => {
    try {
      // ✅ STEP 1: SAVE ORDER FIRST
      const orderRes = await API.post("/orders", {
        items: cart,
        shipping: form,
        totalPrice: total,
        status: "Pending"
      });

      const savedOrder = orderRes.data;

      // ✅ STEP 2: CREATE RAZORPAY ORDER
      const res = await API.post("/payment/create-order", {
        amount: total
      });

      const options = {
        key: "YOUR_RAZORPAY_KEY", // replace later
        amount: res.data.amount,
        currency: "INR",
        name: "GlamAura",
        description: "Beauty & Fashion Store",
        order_id: res.data.id,

        // ✅ SUCCESS
        handler: async function (response) {
          await API.put(`/orders/${savedOrder._id}`, {
            status: "Paid",
            paymentId: response.razorpay_payment_id
          });

          localStorage.removeItem("cart");
          alert("Payment Successful");
          navigate("/");
        }
      };

      const rzp = new window.Razorpay(options);

      // ❌ FAILURE
      rzp.on("payment.failed", async function () {
        await API.put(`/orders/${savedOrder._id}`, {
          status: "Failed"
        });

        alert("Payment Failed (Order Saved)");
      });

      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>Checkout</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "40px"
      }}>

        {/* SHIPPING */}
        <div style={{
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "10px"
        }}>
          <h2>Shipping Details</h2>

          <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
            <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle} />
            <input name="phone" placeholder="Phone" onChange={handleChange} style={inputStyle} />
            <input name="address" placeholder="Address" onChange={handleChange} style={inputStyle} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input name="city" placeholder="City" onChange={handleChange} style={inputStyle} />
              <input name="state" placeholder="State" onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <input name="pincode" placeholder="Pincode" onChange={handleChange} style={inputStyle} />
              <input name="country" placeholder="Country" onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "10px",
          height: "fit-content"
        }}>
          <h2>Order Summary</h2>

          <div style={{ marginTop: "20px" }}>
            {cart.map(item => (
              <div key={item._id} style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px"
              }}>
                <p>{item.name} × {item.qty}</p>
                <p>₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <hr style={{ margin: "20px 0" }} />

          <h3>Total: ₹{total}</h3>

          <button
            onClick={loadRazorpay}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#ff4d6d",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#111",
  color: "white"
};

export default Checkout;