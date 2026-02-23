import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">

      <section className="hero" style={{ backgroundImage: `url('/images/Banner.jpeg')` }}>
  <div className="hero-overlay">

    <h1>AI Beauty & Fashion Recommendation</h1>

    <p>Discover shades & styles made just for you</p>

    <button className="hero-btn" onClick={() => navigate("/recommendations")}>
      Try AI Now
    </button>

  </div>
</section>

      {/* CATEGORIES */}

      <section className="categories">

        <div className="category">Makeup</div>
        <div className="category">Skincare</div>
        <div className="category">Dresses</div>
        <div className="category">Luxury</div>

      </section>

      {/* PRODUCTS */}

      <section className="products">

        <div className="product">
          <img src="/images/lipstick.jpg" />
          <h4>Matte Lipstick</h4>
          <p>₹799</p>
        </div>

        <div className="product">
          <img src="/images/dress.jpg" />
          <h4>Summer Dress</h4>
          <p>₹1999</p>
        </div>

        <div className="product">
          <img src="/images/foundation.jpg" />
          <h4>Liquid Foundation</h4>
          <p>₹1299</p>
        </div>

      </section>

    </div>
  );
}

export default Home;