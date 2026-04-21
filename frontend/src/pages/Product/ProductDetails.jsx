import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../utils/api";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);

  const [selectedShade, setSelectedShade] = useState(null);

  /* =========================
     FETCH PRODUCT
  ========================= */
  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await API.get(`/products/${id}`);

        setProduct(res.data);
        setMainImage(res.data.image);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = () => {

    if (!selectedShade && product?.shades?.length > 0) {
      alert("Please select a shade");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      ...product,
      selectedShade,
      qty
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");

    navigate("/cart");
  };

  if (!product) {
    return <div style={{ padding: "50px" }}>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: "60px",
        display: "flex",
        gap: "60px"
      }}
    >

      {/* ================= IMAGE SECTION ================= */}
      <div>

        {/* 🔥 MAIN IMAGE (CHANGES WITH SHADE) */}
        <img
          src={selectedShade?.image || mainImage}
          alt={product.name}
          style={{
            width: "420px",
            borderRadius: "12px"
          }}
        />

        {/* GALLERY */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{ width: "70px", cursor: "pointer" }}
              onClick={() => {
                setMainImage(img);
                setSelectedShade(null); // reset shade
              }}
            />
          ))}
        </div>

      </div>

      {/* ================= INFO ================= */}
      <div style={{ maxWidth: "500px" }}>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p style={{ color: "#aaa" }}>{product.description}</p>

        <p>Stock: {product.stock}</p>

        {/* ================= SHADE SECTION ================= */}
        {product.shades && product.shades.length > 0 && (
          <div style={{ marginTop: "20px" }}>

            <h3>Select Shade</h3>

            {/* SHADE CIRCLES */}
            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px"
            }}>

              {product.shades.map((shade, index) => (

                <div
                  key={index}
                  onClick={() => setSelectedShade(shade)}
                  title={shade.name}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: shade.color,
                    border:
                      selectedShade?.name === shade.name
                        ? "3px solid white"
                        : "2px solid gray",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                />

              ))}

            </div>

            {/* 🔥 SELECTED SHADE INFO */}
            {selectedShade && (
              <div style={{ marginTop: "20px" }}>

                <p>
                  Selected Shade: <b>{selectedShade.name}</b>
                </p>

                {/* 🔥 SHADE IMAGE PREVIEW */}
                {selectedShade.image && (
                  <img
                    src={selectedShade.image}
                    alt={selectedShade.name}
                    style={{
                      width: "120px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      border: "1px solid #444"
                    }}
                  />
                )}

              </div>
            )}

          </div>
        )}

        {/* ================= QUANTITY ================= */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
          <span style={{ margin: "0 10px" }}>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        {/* ================= BUTTONS ================= */}
        <div style={{ marginTop: "20px" }}>

          <button onClick={addToCart}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;