import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome back</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-scope">
          <label className="auth-label">email</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="input-scope">
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Entr your password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" type="submit">
          Sign in
        </button>
      </form>
      <div className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
