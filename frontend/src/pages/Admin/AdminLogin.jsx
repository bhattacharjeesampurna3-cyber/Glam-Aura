import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Check if admin
      if (res.data.role !== "admin") {
        alert("You are not an admin");
        return;
      }

      // Save login info
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      // Go to admin dashboard
      navigate("/admin");

    } catch (error) {

      alert("Invalid admin credentials");

    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Login as Admin
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;