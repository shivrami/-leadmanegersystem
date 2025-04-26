import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!credentials.username || !credentials.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Invalid credentials");
      }

      const data = await res.json();
      setSuccess("Login successful!");

      // ✅ Store login info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");

      setTimeout(() => {
        navigate("/admin/dashboard"); // Adjust path to your actual admin landing page
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter admin username"
          />
        </div>
        <div className="form-group mb-3 position-relative">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
          />
          <div
            className="position-absolute"
            style={{ top: "60%", right: "30px", transform: "translateY(-50%)", cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Toggle eye icon */}
          </div>
        </div>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {success && <div className="alert alert-success mt-2">{success}</div>}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
