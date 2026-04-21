import { useState } from "react";
import "../../styles/WardrobeAI.css";

const WardrobeAI = () => {

  const [bodyPreview, setBodyPreview] = useState(null);
  const [dressPreview, setDressPreview] = useState(null);

  const handleBodyUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBodyPreview(URL.createObjectURL(file));
    }
  };

  const handleDressUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setDressPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="wardrobe-container">

      {/* Header */}
      <div className="wardrobe-header">
        <h1>AI Wardrobe Stylist 👗</h1>
        <p>Try outfits virtually and discover your perfect look</p>
      </div>

      {/* Upload Section */}
      <div className="wardrobe-card">

        {/* Upload Body */}
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleBodyUpload}
          />

          {!bodyPreview ? (
            <div className="upload-content">
              <p>📷 Upload Full Body</p>
              <span>Click or drag & drop</span>
            </div>
          ) : (
            <img
              src={bodyPreview}
              alt="body preview"
              className="preview-img"
            />
          )}
        </label>

        {/* Upload Dress */}
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleDressUpload}
          />

          {!dressPreview ? (
            <div className="upload-content">
              <p>👗 Upload Dress</p>
              <span>Click or drag & drop</span>
            </div>
          ) : (
            <img
              src={dressPreview}
              alt="dress preview"
              className="preview-img"
            />
          )}
        </label>

      </div>

      {/* Coming Soon Button */}
      <button className="try-btn coming-soon-btn" disabled>
        Coming Soon
      </button>

      <p className="coming-soon-text">
        AI Virtual Try-On will be available in the next update ✨
      </p>

    </div>
  );
};

export default WardrobeAI;