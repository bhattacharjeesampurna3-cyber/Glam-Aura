import React, { useState } from "react";
import "../../styles/MakeupAI.css";

function MakeupAI() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const analyzeFace = async () => {

    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("image", image);

    try {

      const response = await fetch("http://127.0.0.1:5000/makeup-ai", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      console.log("AI RESPONSE:", data);

      setResult(data);

    } catch (err) {

      console.error(err);
      setError("AI analysis failed.");

    }
  };

  return (

    <div className="makeup-container">

      <div className="bg-glow"></div>

      <div className="makeup-header">
        <h1>AI Makeup Assistant</h1>
        <p>Upload your photo and get personalized beauty recommendations</p>
      </div>

      <div className="makeup-card">

        {/* Upload Area */}

        <label className="upload-box">

          <input type="file" accept="image/*" onChange={uploadImage} />

          {preview ? (
            <img src={preview} className="preview-img" alt="preview" />
          ) : (
            <div className="upload-content">
              <p>Upload Face Image</p>
              <span>PNG / JPG</span>
            </div>
          )}

        </label>

        <button className="analyze-btn" onClick={analyzeFace}>
          Analyze Face
        </button>

        {error && <p className="error-text">{error}</p>}

        {/* ================= RESULT ================= */}

        {result && (
          <div className="recommend-list">

            <h2>{result.skin_analysis.skin_tone} Skin Tone</h2>

            <p>
              <b>Undertone:</b> {result.skin_analysis.undertone}
            </p>

            <p>
              <b>Complexion:</b> {result.skin_analysis.complexion}
            </p>

            <br />

            {/* FOUNDATION */}

            <h3>💄 Foundation</h3>

            {result.recommended_products.foundation ? (

              <a
                href={result.recommended_products.foundation.link}
                className="ai-product-card"
                target="_blank"
                rel="noreferrer"
              >

                <img
                  src={result.recommended_products.foundation.image}
                  className="ai-product-img"
                  alt="foundation"
                />

                <p>
                  {result.recommended_products.foundation.name}
                  <br />
                  {result.recommended_products.foundation.shade}
                </p>

              </a>

            ) : (
              <p>No recommendation</p>
            )}


            {/* LIPSTICK */}

            <h3>💋 Lipstick</h3>

            {result.recommended_products.lipstick ? (

              <a
                href={result.recommended_products.lipstick.link}
                className="ai-product-card"
                target="_blank"
                rel="noreferrer"
              >

                <img
                  src={result.recommended_products.lipstick.image}
                  className="ai-product-img"
                  alt="lipstick"
                />

                <p>
                  {result.recommended_products.lipstick.name}
                  <br />
                  {result.recommended_products.lipstick.shade}
                </p>

              </a>

            ) : (
              <p>No recommendation</p>
            )}


            {/* BLUSH */}

            <h3>🌸 Blush</h3>

            {result.recommended_products.blush ? (

              <a
                href={result.recommended_products.blush.link}
                className="ai-product-card"
                target="_blank"
                rel="noreferrer"
              >

                <img
                  src={result.recommended_products.blush.image}
                  className="ai-product-img"
                  alt="blush"
                />

                <p>
                  {result.recommended_products.blush.name}
                  <br />
                  {result.recommended_products.blush.shade}
                </p>

              </a>

            ) : (
              <p>No recommendation</p>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default MakeupAI;