import "../../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

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

  // 🔥 LOGIN + REGISTER FUNCTION (FINAL FIX)
  const handleSubmit = async () => {
    console.log("🔥 LOGIN CLICKED");

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN API CALL
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("LOGIN RESPONSE:", res.data);

        // ✅ STORE USER
        const userData = {
        token: res.data.token,
        role: res.data.role,
        email: res.data.user?.email || res.data.email || formData.email,
};

        localStorage.setItem("user", JSON.stringify(userData));

        // 🚀 FORCE RELOAD (IMPORTANT FIX)
        window.location.href = "/home";

      } else {
        // REGISTER API
        await API.post("/auth/register", formData);

        alert("Registration successful");
        setIsLogin(true);
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* REGISTER NAME */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button type="button" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* ADMIN LOGIN */}
        <p
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={() => navigate("/admin-login")}
        >
          Login as Admin
        </p>

        {/* SWITCH LOGIN/REGISTER */}
        <p>
          {isLogin ? "New user?" : "Already have an account?"}
          <span
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
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