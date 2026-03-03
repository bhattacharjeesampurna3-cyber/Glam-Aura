import "../../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    // Temporary demo login (replace with backend later)
    localStorage.setItem("token", "demo-user");

    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p style={{ color: "#ffdddd" }}>{error}</p>}
          

          <button type="submit">Login</button>
        </form>

        <div className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;