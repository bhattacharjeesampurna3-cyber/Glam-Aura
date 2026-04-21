import { useEffect, useState } from "react";
import API from "../../utils/api";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // 🔥 SHADES
  const [shadeName, setShadeName] = useState("");
  const [shadeColor, setShadeColor] = useState("#d2a679");
  const [shadeImage, setShadeImage] = useState("");
  const [shades, setShades] = useState([]);

  /* =========================
     FETCH PRODUCTS
  ========================= */
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     ADD SHADE
  ========================= */
  const addShade = () => {

    if (!shadeName) {
      alert("Enter shade name");
      return;
    }

    const newShade = {
      name: shadeName,
      color: shadeColor,
      image: shadeImage
    };

    setShades([...shades, newShade]);

    // reset
    setShadeName("");
    setShadeImage("");
  };

  /* =========================
     ADD PRODUCT
  ========================= */
  const addProduct = async () => {

    if (!name || !price || !category) {
      alert("Fill required fields");
      return;
    }

    // 🔥 IMPORTANT VALIDATION
    if (
      (subcategory === "lipstick" || subcategory === "foundation") &&
      shades.length === 0
    ) {
      alert("Please add at least one shade");
      return;
    }

    try {

      console.log("SENDING DATA:", {
        name,
        shades
      });

      await API.post("/products", {
        name,
        price,
        image,
        images: images ? images.split(",") : [],
        category,
        subcategory,
        shades, // 🔥 MUST BE SENT
        stock,
        description
      });

      alert("✅ Product Added");

      // RESET FORM
      setName("");
      setPrice("");
      setImage("");
      setImages("");
      setCategory("");
      setSubcategory("");
      setStock("");
      setDescription("");
      setShades([]);

      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("❌ Failed to add product");
    }
  };

  /* =========================
     DELETE PRODUCT
  ========================= */
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>

      <h1 style={{ marginBottom: "20px" }}>Admin Panel</h1>

      {/* ================= FORM ================= */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px"
      }}>

        <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Main Image" value={image} onChange={(e) => setImage(e.target.value)} />
        <input placeholder="Gallery Images (comma separated)" value={images} onChange={(e) => setImages(e.target.value)} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="beauty">Beauty</option>
          <option value="fashion">Fashion</option>
          <option value="luxury">Luxury</option>
        </select>

        {/* 🔥 SUBCATEGORY */}
        {category === "beauty" && (
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
            <option value="">Select Type</option>
            <option value="lipstick">Lipstick</option>
            <option value="foundation">Foundation</option>
          </select>
        )}

        <input placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* ================= SHADE SECTION ================= */}
        {(subcategory === "lipstick" || subcategory === "foundation") && (
          <>
            <input
              placeholder="Shade Name"
              value={shadeName}
              onChange={(e) => setShadeName(e.target.value)}
            />

            <input
              type="color"
              value={shadeColor}
              onChange={(e) => setShadeColor(e.target.value)}
            />

            <input
              placeholder="Shade Image URL (optional)"
              value={shadeImage}
              onChange={(e) => setShadeImage(e.target.value)}
            />

            <button onClick={addShade}>Add Shade</button>
          </>
        )}

      </div>

      {/* ================= SHOW SHADES ================= */}
      {shades.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Added Shades:</h3>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {shades.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: s.color,
                  marginBottom: "5px"
                }} />
                <small>{s.name}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={addProduct}>
        Add Product
      </button>

      <hr style={{ margin: "30px 0" }} />

      {/* ================= PRODUCT LIST ================= */}
      {products.map((p) => {

        let status = "In Stock";
        if (p.stock == 0) status = "Sold Out";
        else if (p.stock <= 5) status = "Low Stock";

        return (
          <div key={p._id} style={{ marginBottom: "15px" }}>
            <b>{p.name}</b> - ₹{p.price} ({p.category}) |
            Stock: {p.stock} | {status}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteProduct(p._id)}
            >
              Delete
            </button>
          </div>
        );
      })}

    </div>
  );
}

export default AdminDashboard;