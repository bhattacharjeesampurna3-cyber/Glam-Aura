import "../../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";  // Uncomment when backend is ready  

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
   // CHECKING ADMIN LOGIN
   const handleSubmita = (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  // USER LOGIN
  localStorage.setItem("role", "user");
  navigate("/home");
};
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

  try {

    if (isLogin) {

      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } else {

      await API.post("/auth/register", formData);

      alert("Registration successful");
      setIsLogin(true);
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
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

          <p style={{ cursor: "pointer", marginTop: "10px" }} onClick={() => navigate("/admin-login")}>
           Login as Admin
          </p>
 
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