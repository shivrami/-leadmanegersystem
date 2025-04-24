import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Counselorlogin = () => {
  const [credentials, setCredentials] = useState({ counselorUsername: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
  
    if (!credentials.counselorUsername || !credentials.password) {
      setError("Username and password are required.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:8080/api/counselors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Invalid credentials");
      }
  
      const data = await res.json(); // ✅ get response body
      setSuccess("Login successful!");
  
      // ✅ Store login info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "counselor");
      localStorage.setItem("counselorUsername", data.counselorUsername);
      localStorage.setItem("counselorId", data.id);
      console.log("Response data:", data);


  
      setTimeout(() => {
        navigate("/counselor/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Counselor Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="counselorUsername"
            value={credentials.counselorUsername}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter counselor username"
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter password"
          />
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

export default Counselorlogin;
