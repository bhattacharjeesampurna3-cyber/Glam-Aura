import { useState } from "react";
import "../../styles/BodyShape.css";

const BodyShape = () => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  const calculateShape = () => {
    const b = Number(bust);
    const w = Number(waist);
    const h = Number(hips);
    const s = Number(shoulder);

    if (!b || !w || !h || !s || !height) {
      setResult("Please fill all fields");
      return;
    }

    if (b === h && w < b * 0.75) setResult("Hourglass");
    else if (h > b) setResult("Pear");
    else if (b > h && s > h) setResult("Inverted Triangle");
    else if (b === h && w >= b * 0.75) setResult("Rectangle");
    else setResult("Apple");
  };

  return (
    <div className="body-container">

      {/* BACKGROUND GLOW */}
      <div className="bg-glow"></div>

      {/* HEADER */}
      <div className="body-header">
        <h1>Body Shape Calculator ✨</h1>
        <p>Smart AI insights for your perfect style</p>
      </div>

      {/* CARD */}
      <div className="body-card">

        <div className="input-grid">
          <input placeholder="Bust" onChange={(e) => setBust(e.target.value)} />
          <input placeholder="Waist" onChange={(e) => setWaist(e.target.value)} />
          <input placeholder="Hips" onChange={(e) => setHips(e.target.value)} />
          <input placeholder="Shoulder" onChange={(e) => setShoulder(e.target.value)} />
          <input placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
        </div>

        <button onClick={calculateShape}>Calculate</button>

        {result && (
          <div className="result-card">
            <p>Your Body Type</p>
            <h2>{result}</h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default BodyShape;