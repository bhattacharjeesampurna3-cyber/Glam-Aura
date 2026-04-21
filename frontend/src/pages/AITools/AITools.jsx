import { Link } from "react-router-dom";
import "../../styles/AITools.css";

const AITools = () => {
  return (
    <div className="ai-container">

      {/* HEADER */}
      <div className="ai-header">
        <h1>AI Beauty Studio ✨</h1>
        <p>
          Smart AI-powered tools to enhance your beauty, style, and confidence
        </p>
      </div>

      {/* GRID */}
      <div className="ai-grid">

        <Link to="/ai/body-shape" className="ai-card">
          <div className="icon">✨</div>
          <h2>Body Shape Calculator</h2>
          <p>Discover your body type instantly using smart calculations</p>
        </Link>

        <Link to="/ai/makeup" className="ai-card">
          <div className="icon">📸</div>
          <h2>Makeup AI</h2>
          <p>Upload your photo and get personalized makeup suggestions</p>
        </Link>

        <Link to="/ai/wardrobe" className="ai-card">
          <div className="icon">👗</div>
          <h2>AI Wardrobe Stylist</h2>
          <p>Try outfits virtually and find your perfect style</p>
        </Link>

      </div>

    </div>
  );
};

export default AITools;