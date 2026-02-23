// ===== FORMAT PRICE =====
export const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};


// ===== CAPITALIZE FIRST LETTER =====
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};


// ===== EMAIL VALIDATION =====
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


// ===== CHECK IF USER LOGGED IN =====
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};


// ===== LOGOUT FUNCTION =====
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};


// ===== GET TOKEN =====
export const getToken = () => {
  return localStorage.getItem("token");
};


// ===== BASIC BODY SHAPE CALCULATOR =====
// Simple logic for demo (you can replace with ML later)

export const calculateBodyShape = (bust, waist, hips) => {
  bust = Number(bust);
  waist = Number(waist);
  hips = Number(hips);

  if (Math.abs(bust - hips) <= 5 && waist < bust && waist < hips) {
    return "Hourglass";
  }

  if (hips > bust) {
    return "Pear";
  }

  if (bust > hips) {
    return "Apple";
  }

  return "Rectangle";
};


// ===== IMAGE PREVIEW HELPER =====
export const previewImage = (file) => {
  return URL.createObjectURL(file);
};