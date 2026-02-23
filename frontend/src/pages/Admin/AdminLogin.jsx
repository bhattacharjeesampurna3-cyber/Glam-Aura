const AdminLogin = () => {
  return (
    <div className="admin-login-container">
      <div className="admin-box">
        <h3>Admin Login</h3>
        <input className="form-control mb-3" placeholder="Admin Email" />
        <input className="form-control mb-3" type="password" placeholder="Password" />
        <button className="btn btn-dark w-100">Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
