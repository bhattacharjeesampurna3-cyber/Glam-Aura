import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Recommendations from "./pages/Recommendations/Recommendations";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/Profile/Profile";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import CategoryPage from "./pages/Category/CategoryPage";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />

        <Route path="/category/:type" element={<CategoryPage />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;