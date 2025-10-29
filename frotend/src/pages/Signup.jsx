import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// This file used to be Signup; per request we turned it into a Sign in page
// while keeping the filename to avoid changing routes. The visible heading
// and form are for Sign in.
const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // call optional onLogin prop (frontend-only) and navigate home
    onLogin && onLogin({ email: email.trim() });
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div
        className="auth-card auth-split auth-elevated"
        style={{ maxWidth: 920 }}
      >
        <div className="auth-left">
          <div className="logo">FINEbank.IO</div>
          <h2>Sign in</h2>
          <p className="muted">
            Welcome back — sign in to continue to your Loan Management
            Dashboard.
          </p>
          <div style={{ marginTop: 18 }} className="small muted">
            Need an account?{" "}
            <Link to="/signup" className="link">
              Create one
            </Link>
          </div>
        </div>

        <form className="auth-right" onSubmit={submit}>
          <h3>Sign in</h3>
          {error && <div className="auth-error">{error}</div>}

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoFocus
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />

          <div className="row-between" style={{ marginTop: 8 }}>
            <div />
            <Link to="/forgot-password" className="small link">
              Forgot password?
            </Link>
          </div>

          <div className="auth-actions" style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">
              Sign in
            </button>
          </div>

          <div className="muted small" style={{ marginTop: 12 }}>
            By signing in you agree to our <span className="link">Terms</span>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
