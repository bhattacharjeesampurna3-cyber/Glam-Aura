import "../../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../utils/api";  // Uncomment when backend is ready  

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (isLogin) {
        // ===== LOGIN =====
        localStorage.setItem("token", "dummy-token");
        navigate("/home");

      } else {
        // ===== REGISTER =====
        if (!formData.name) {
          alert("Please enter your name");
          return;
        }

        alert("Registration Successful! Please login.");
        setIsLogin(true);
      }

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

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

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p>
          {isLogin ? "New user?" : "Already have an account?"}
          <span
            style={{ cursor: "pointer", fontWeight: "bold", marginLeft: "5px" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Auth;