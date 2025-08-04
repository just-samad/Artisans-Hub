import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Login = () => {
  const [form, setForm] = useState({ contact: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  AOS.init({ duration: 800 });
}, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in:', form);
    // Add login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box" data-aos="zoom-in">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your ArtisanHub journey</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email or Phone</label>
            <input
              type="text"
              name="contact"
              placeholder="example@gmail.com or 08123456789"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePassword} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="forgot-remember">
            <button type="button" className="forgot-btn" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn-primary full">Login</button>

          <p className="register-link">
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
