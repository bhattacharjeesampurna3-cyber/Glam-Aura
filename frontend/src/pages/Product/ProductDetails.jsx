import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);


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

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({ ...product, qty });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");

    navigate("/cart");

  };



  /* =========================
     ADD TO WISHLIST
  ========================= */

  const addToWishlist = () => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item._id === product._id);

    if (!exists) {

      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      alert("Added to wishlist");

    } else {

      alert("Already in wishlist");

    }

  };



  if (!product) {

    return <div style={{ padding: "50px" }}>Loading...</div>;

  }



  return (

    <div
      style={{
        padding: "60px",
        display: "flex",
        gap: "60px",
        alignItems: "flex-start"
      }}
    >

      {/* IMAGE SECTION */}

      <div>

        <img
          src={mainImage}
          alt={product.name}
          style={{
            width: "420px",
            borderRadius: "12px",
            transition: "0.3s",
            cursor: "zoom-in"
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        />

        {/* IMAGE GALLERY */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px"
          }}
        >

          {product.images && product.images.map((img, i) => (

            <img
              key={i}
              src={img}
              alt="gallery"
              style={{
                width: "70px",
                cursor: "pointer",
                borderRadius: "6px"
              }}
              onClick={() => setMainImage(img)}
            />

          ))}

        </div>

      </div>



      {/* PRODUCT INFO */}

      <div style={{ maxWidth: "500px" }}>

        <h1>{product.name}</h1>

        <h2 style={{ margin: "10px 0" }}>
          ₹{product.price}
        </h2>

        <p>
          ⭐ {product.rating ? product.rating.toFixed(1) : 0}
          {" "}({product.numReviews || 0} reviews)
        </p>

        <p style={{ marginTop: "20px", color: "#ccc" }}>
          {product.description}
        </p>

        <p style={{ marginTop: "20px" }}>
          Stock: {product.stock}
        </p>



        {/* QUANTITY SELECTOR */}

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>

        </div>



        {/* ACTION BUTTONS */}

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px"
          }}
        >

          <button onClick={addToCart}>
            Add to Cart
          </button>

          <button onClick={addToWishlist}>
            Add to Wishlist
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;