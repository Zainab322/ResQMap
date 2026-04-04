import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api.js";
import "../../styles/AdminLoginStyles.css";

// Import image
import loginHero from "../assets/images/login-hero.jpg";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      nav("/admin/incidents");
    } catch (err) {
      setMsg(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      {/* Theme Toggle */}
      <button className="theme-btn" onClick={toggleTheme}>
        {isDarkTheme ? '☀️' : '🌙'}
      </button>

      {/* Main Container */}
      <div className="container">
        {/* Left Side - Form */}
        <div className="form-side">
          <div className="form-wrapper">
            {/* Logo */}
            <div className="logo">
              <span className="logo-icon">🚑</span>
              <span className="logo-text">ResQ<span>Map</span></span>
            </div>

            {/* Header */}
            <div className="header">
              <h1 className="title">Welcome back</h1>
              <p className="subtitle">Sign in to continue to your dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="form">
              {/* Email */}
              <div className="field">
                <label className="label">Email</label>
                <div className="input-group">
                  <span className="icon">📧</span>
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label className="label">Password</label>
                <div className="input-group">
                  <span className="icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="options">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              {/* Error */}
              {msg && <div className="error">{msg}</div>}

              {/* Submit */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner"></div> : 'Sign In'}
              </button>

              {/* Signup */}
              <p className="signup-text">
                Don't have an account? <a href="/register">Create one</a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="image-side">
          <div className="image-container">
            <img src={loginHero} alt="Login" className="image" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
}