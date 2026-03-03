import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { addToCart } from "../../utils/cartUtils";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <p style={{ padding: "40px" }}>Loading...</p>;

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: { items: [{ ...product, quantity: 1 }] }
    });
  };

  return (
    <div className="product-details">

      <img
        src={product.image}
        alt={product.name}
      />

      <div>
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>

        <p className="description">
          {product.description ||
            "Premium quality product designed for modern lifestyle."}
        </p>

        <div className="product-buttons">

          <button
            onClick={() => {
              addToCart(product);
              alert("Added to cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="buy-now"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;