import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide email and password");
      return;
    }
    // frontend-only auth: accept any credentials
    onLogin({ email });
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-split">
        <div className="auth-left">
          <div className="logo">FINEbank.IO</div>
          <h2>Welcome back</h2>
          <p className="muted">
            Manage loans, payments and track transactions in one place. Sign in
            to continue to your dashboard.
          </p>
        </div>

        <form className="auth-right" onSubmit={submit}>
          <h3>Sign in to your account</h3>
          {error && <div className="auth-error">{error}</div>}
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="row-between"></div>

          <div className="auth-actions">
            <button className="btn primary" type="submit">
              Log in
            </button>
          </div>

          <div className="forgot muted small">Forgot password?</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
