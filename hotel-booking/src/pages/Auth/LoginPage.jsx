import "./LoginPage.css";
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/users/login", {
        email,
        password,
      });
      if (response.data) {
        alert("Login Successful");
        navigate("/home"); // Navigate to the home page on success
      }
    } catch (error) {
      alert("Invalid credentials or server error");
    }
  };


  return (
    <div className="login-page">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default LoginPage;
