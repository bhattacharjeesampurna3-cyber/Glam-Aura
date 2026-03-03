import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

function CategoryPage() {

  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [type]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      console.log("All Products:", res.data);
      console.log("URL Type:", type);

      const filtered = res.data.filter((product) => {
        if (!product.category) return false;

        return (
          product.category.trim().toLowerCase() ===
          type.trim().toLowerCase()
        );
      });

      console.log("Filtered Products:", filtered);

      setProducts(filtered);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", minHeight: "60vh" }}>
      
      <h2 style={{ textTransform: "capitalize", marginBottom: "30px" }}>
        {type} Products
      </h2>

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p>No products found in this category.</p>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "#1e1e1e",
              padding: "15px",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />

            <h4 style={{ marginTop: "10px" }}>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;