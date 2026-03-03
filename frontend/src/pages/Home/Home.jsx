import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../utils/api";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.slice(0, 4)); // show only 4 products
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section
        className="hero"
        style={{ backgroundImage: `url('/images/Banner.jpeg')` }}
      >
        <div className="hero-overlay">
          <h1>AI Beauty & Fashion Recommendation</h1>
          <p>Discover shades & styles made just for you</p>
          <button
            className="hero-btn"
            onClick={() => navigate("/recommendations")}
          >
            Try AI Now
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">

        <div
          className="category-card"
          style={{ backgroundImage: "url('/images/makeup.jpg')" }}
          onClick={() => navigate("/category/beauty")}
        >
          <div className="category-overlay">
            <h3>Makeup</h3>
          </div>
        </div>

        <div
          className="category-card"
          style={{ backgroundImage: "url('/images/ai.jpg')" }}
          onClick={() => navigate("/category/ai-tools")}
        >
          <div className="category-overlay">
            <h3>AI Tools</h3>
          </div>
        </div>

        <div
          className="category-card"
          style={{ backgroundImage: "url('/images/fashion.jpg')" }}
          onClick={() => navigate("/category/fashion")}
        >
          <div className="category-overlay">
            <h3>Dresses</h3>
          </div>
        </div>

        <div
          className="category-card"
          style={{ backgroundImage: "url('/images/luxury.jpg')" }}
          onClick={() => navigate("/category/luxury")}
        >
          <div className="category-overlay">
            <h3>Luxury</h3>
          </div>
        </div>

      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-section">
        <h2 className="section-title">Featured Products</h2>

        {loading && <p>Loading products...</p>}

        <div className="featured-grid">
          {products.map((product) => (
            <div
              key={product._id}
              className="featured-card"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
              />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;