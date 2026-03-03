import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../utils/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: data.email,
        password: data.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        alert("This account is not an admin");
      }

    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login">

      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>setData({...data,password:e.target.value})}
      />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default AdminLogin;