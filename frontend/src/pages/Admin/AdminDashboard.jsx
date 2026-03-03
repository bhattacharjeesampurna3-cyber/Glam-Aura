import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  // 🔄 Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ➕ Add Product
  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Sending Form:", form); // DEBUG

      const res = await API.post(
        "/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts([...products, res.data]);

      // Reset form properly
      setForm({
        name: "",
        price: "",
        image: "",
        category: ""
      });

      alert("Product added successfully");

    } catch (error) {

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }

      alert(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="admin-dashboard">

      <h1>Admin Panel</h1>

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e)=>setForm({...form,price:Number(e.target.value)})}
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e)=>setForm({...form,image:e.target.value})}
      />

      {/* ✅ CATEGORY DROPDOWN ADDED */}
      <select
        value={form.category}
        onChange={(e)=>setForm({...form,category:e.target.value})}
      >
        <option value="">Select Category</option>
        <option value="beauty">Beauty</option>
        <option value="fashion">Fashion</option>
        <option value="luxury">Luxury</option>
      </select>

      <button onClick={addProduct}>
        Add Product
      </button>

      <hr />

      <div>
        {products.map((p)=>(
          <div key={p._id} style={{ marginBottom: "10px" }}>
            <strong>{p.name}</strong> - ₹{p.price} ({p.category})
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;