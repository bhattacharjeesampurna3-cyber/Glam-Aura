import "../../styles/home.css";

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content text-center text-white">
          <h1>AI Beauty & Fashion Recommendation</h1>
          <p>Discover shades & styles made just for you</p>
          <a href="/upload" className="btn btn-luxury">
            Try Now
          </a>
        </div>
      </section>

      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="premium-card">
              <h4>AI Shade Match</h4>
              <p>Upload photo & get perfect lipstick shade.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="premium-card">
              <h4>Body Shape AI</h4>
              <p>Find dresses that suit your structure.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="premium-card">
              <h4>Luxury Picks</h4>
              <p>Curated premium fashion collection.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
