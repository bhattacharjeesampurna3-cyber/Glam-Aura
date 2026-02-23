import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-md-3 mb-4">
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <div className="p-3">
          <h6>{product.name}</h6>
          <p className="text-muted">₹ {product.price}</p>
          <button
            className="btn btn-pink w-100"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
