import "../../styles/profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔐 MASK EMAIL FUNCTION
  const maskEmail = (email) => {
    if (!email) return "Not available";

    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    const visiblePart = name.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(name.length - 4, 2));
    const lastPart = name.slice(-2);

    return `${visiblePart}${maskedPart}${lastPart}@${domain}`;
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        {/* PROFILE IMAGE */}
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />
        </div>

        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">

          <div className="info-box">
            <span className="label">Email</span>
            <span className="value">
              {maskEmail(user?.email)}
            </span>
          </div>

          <div className="info-box">
            <span className="label">Role</span>
            <span className="value">
              {user?.role || "User"}
            </span>
          </div>

        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;