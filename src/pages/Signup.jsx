import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-scop">
          <label className="auth-label">Username</label>
          <input
            name="username"
            className="auth-input"
            type="text"
            placeholder="Enter your username"
            autoComplete="username"
            value={formData.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-scope">
          <label className="auth-label">Email</label>
          <input
            name="email"
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-scope">
          <label className="auth-label">Password</label>
          <input
            name="password"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            autoComplete="password"
            value={formData.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-scope">
          <label className="auth-label">Confirm Password</label>
          <input
            name="confirmPassword"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            autoComplete="password"
            value={formData.confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" type="submit">
          Sign up
        </button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </div>
  );
}
