import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Recommendations from "./pages/Recommendations/Recommendations";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>

      {/* Top Navbar */}
      <Navbar />

      {/* Website Pages */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;