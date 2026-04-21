import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const fixedCart = storedCart.map(item => ({
      ...item,
      qty: item.qty || item.quantity || 1
    }));

    setCart(fixedCart);

    localStorage.setItem("cart", JSON.stringify(fixedCart));

  }, []);

  /* =========================
     UPDATE QUANTITY
  ========================= */
  const updateQty = (index, change) => {

    const updatedCart = [...cart];

    updatedCart[index].qty += change;

    if (updatedCart[index].qty < 1) {
      updatedCart[index].qty = 1;
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeItem = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* =========================
     TOTAL CALCULATION
  ========================= */
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return acc + price * qty;
  }, 0);

  return (

    <div style={{ padding: "40px", color: "white" }}>

      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, index) => (

        <div
          key={index}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
            alignItems: "center",
            background: "#1e1e1e",
            padding: "15px",
            borderRadius: "12px"
          }}
        >

          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "120px",
              borderRadius: "10px"
            }}
          />

          {/* DETAILS */}
          <div>

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            {/* 🔥 SHADE DISPLAY */}
            {item.selectedShade && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "6px"
                }}
              >

                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: item.selectedShade.color,
                    borderRadius: "50%",
                    border: "1px solid #ccc"
                  }}
                />

                <span style={{ fontSize: "14px", color: "#bbb" }}>
                  {item.selectedShade.name}
                </span>

              </div>
            )}

            {/* QUANTITY */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "12px",
                alignItems: "center"
              }}
            >

              <button onClick={() => updateQty(index, -1)}>-</button>

              <span>{item.qty}</span>

              <button onClick={() => updateQty(index, 1)}>+</button>

            </div>

            {/* REMOVE */}
            <button
              style={{
                marginTop: "10px",
                background: "transparent",
                color: "#ff4d79",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => removeItem(index)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      {/* TOTAL */}
      <h2 style={{ marginTop: "40px" }}>
        Total: ₹{total}
      </h2>

      {/* BUY BUTTON */}
      {cart.length > 0 && (
        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            borderRadius: "10px",
            border: "none",
            background: "#ff4d79",
            color: "white",
            cursor: "pointer"
          }}
          onClick={() => navigate("/checkout")}
        >
          Buy Now
        </button>
      )}

    </div>
  );
}

export default Cart;