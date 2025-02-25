import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4040/users", {
        name,
        email,
        password,
      });
      alert("Signup Successful");
      navigate("/login"); // Navigate to the login page on success
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
