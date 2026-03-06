import { useState } from "react";

function Checkout() {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "auto",
      padding: "40px",
      color: "white"
    }}>

      <h1 style={{ marginBottom: "40px" }}>Checkout</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "40px"
      }}>

        {/* SHIPPING FORM */}

        <div style={{
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "12px"
        }}>

          <h2 style={{ marginBottom: "20px" }}>
            Shipping Details
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>

            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              style={inputStyle}
            />

          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            style={{
              ...inputStyle,
              marginTop: "20px",
              width: "100%",
              height: "100px"
            }}
          />

        </div>


        {/* ORDER SUMMARY */}

        <div style={{
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "12px",
          height: "fit-content"
        }}>

          <h2>Order Summary</h2>

          <div style={{ marginTop: "20px" }}>

            <p> Lipstick × 1 </p>

            <h3 style={{ marginTop: "20px" }}>
              Total: ₹500
            </h3>

            <button style={{
              marginTop: "30px",
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              background: "#ff4d6d",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}>
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#121212",
  color: "white",
  width: "100%"
};

export default Checkout;