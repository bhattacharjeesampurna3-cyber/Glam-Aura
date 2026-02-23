import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UploadPhoto from "./pages/Upload/UploadPhoto";
import BodyShapeCalc from "./pages/BodyShape/BodyShapeCalc";
import Recommendations from "./pages/Recommendations/Recommendations";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/upload" element={
        <ProtectedRoute>
          <UploadPhoto />
        </ProtectedRoute>
      }/>

      <Route path="/body-shape" element={<BodyShapeCalc />} />
      <Route path="/recommendations" element={<Recommendations />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
