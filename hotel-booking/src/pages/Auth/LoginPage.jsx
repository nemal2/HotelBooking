import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../api/userApi";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Debug log for auth state changes
    console.log("Auth state changed, isAuthenticated:", isAuthenticated);
    
    // Redirect if already logged in
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to /home");
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // In LoginPage.jsx handleSubmit method
try {
  setLoading(true);
  const response = await apiLogin(formData);
  
  if (!response.user) {
    throw new Error("Invalid server response. Please try again.");
  }
  
  // Just pass the user object to login
  login(response.user);
  
  navigate("/home");
} catch (err) {
  setError(err.message || "Invalid email or password. Please try again.");
}

    setLoading(false);
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
          <p><Link to="/">Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;