export const addToCart = (product) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];

  const alreadyInCart = existing.find(item => item._id === product._id);

  if (!alreadyInCart) {
    existing.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existing));
  }
};

export const addToWishlist = (product) => {
  const existing = JSON.parse(localStorage.getItem("wishlist")) || [];

  const alreadyInWishlist = existing.find(item => item._id === product._id);

  if (!alreadyInWishlist) {
    existing.push(product);
    localStorage.setItem("wishlist", JSON.stringify(existing));
  }
};