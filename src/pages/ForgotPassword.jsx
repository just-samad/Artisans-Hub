import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    // Simulate sending reset email
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Password reset link sent to your email."
      });
    }, 1000);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter your registered email address and we'll send you a link to reset your password.
        </p>

        {message.text && (
          <p className={message.type === "error" ? "error-msg" : "success-msg"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary full">
            Send Reset Link
          </button>
        </form>

        <div className="resend-section">
          Remember your password?
          <button className="resend-btn" onClick={() => window.location.href = "/login"}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
