import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { addToCart, addToWishlist } from "../../utils/cartUtils";
import "../../styles/home.css";

function CategoryPage() {

  const { type } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [type]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      const filtered = res.data.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === type.toLowerCase()
      );

      setProducts(filtered);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="category-container">

      <h2 className="category-title">
        {type} Products
      </h2>

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p>No products found in this category.</p>
      )}

      <div className="product-grid">
        {products.map((product) => (
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

              <div className="product-hover">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    alert("Added to cart");
                  }}
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                    alert("Added to wishlist");
                  }}
                  style={{ background: "#444" }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>

            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CategoryPage;