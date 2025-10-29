import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please complete all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // minimal email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onSignup && onSignup({ name, email });
    navigate("/");
  }

  return (
    <div className="auth-page">
      <form className="auth-card auth-elevated" onSubmit={submit} style={{maxWidth:420,width:'100%'}}>
        <h2 style={{marginTop:0}}>Create account</h2>
        <p className="muted">Minimal sign up — just the basics to get started.</p>

        {error && <div className="auth-error">{error}</div>}

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />

        <label>Confirm password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" />

        <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
          <button className="btn primary" type="submit">Create account</button>
        </div>

        <div className="muted small" style={{marginTop:12}}>
          Already have an account? <Link to="/login" className="link">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
