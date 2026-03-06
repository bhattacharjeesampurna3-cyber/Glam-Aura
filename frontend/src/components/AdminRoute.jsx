import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  if (userInfo.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}

export default AdminRoute;