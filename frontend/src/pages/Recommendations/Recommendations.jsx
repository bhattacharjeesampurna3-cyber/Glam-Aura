import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { formatPrice, capitalize } from "../../helpers";
import API from "../../utils/api"; // Uncomment when backend ready

function Recommendations() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      // ===== WHEN BACKEND IS READY =====
      const res = await API.get("/ml/recommendations");
      setProducts(res.data);

      // Dummy Data (Temporary)
      setTimeout(() => {
        setProducts([
          {
            id: 1,
            name: "matte pink lipstick",
            category: "makeup",
            price: 799,
            image: "/images/lipstick1.jpg",
          },
          {
            id: 2,
            name: "warm tone foundation",
            category: "makeup",
            price: 1299,
            image: "/images/foundation1.jpg",
          },
          {
            id: 3,
            name: "elegant evening dress",
            category: "fashion",
            price: 3499,
            image: "/images/dress1.jpg",
          },
        ]);

        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error fetching recommendations");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Fetching your personalized recommendations..." />;
  }

  return (
    <div className="trending">
      <h2>Recommended For You</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h4>{capitalize(product.name)}</h4>

            <p>{capitalize(product.category)}</p>

            <span>{formatPrice(product.price)}</span>

            <button
              style={{
                marginTop: "12px",
                padding: "8px 15px",
                background: "#ff3f6c",
                border: "none",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
