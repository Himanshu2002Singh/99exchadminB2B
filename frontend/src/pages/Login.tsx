import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "admin"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(formData);
  
      if (res.success && res.token && res.user) {
        // Store authentication data
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("userData", JSON.stringify(res.user));
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(res.message || "Login failed. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="title">Admin Panel</h1>
        <h2 className="subtitle">Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button 
            type="submit"  
            style={{background:'blue',color:'white'}}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;