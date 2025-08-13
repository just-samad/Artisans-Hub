import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
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

 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://artisan-hub-e5io.onrender.com/login', // Update URL if needed
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true, // if you're using cookies/session
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

 if (response.status === 200) {
  const token = response.data.token;
  localStorage.setItem('token', token); // ✅ store it
  console.log(token);
  navigate('/home');
}else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box" data-aos="zoom-in">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your ArtisanHub journey</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email </label>
            <input
                type="email"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
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
            <button type="button" className="forgot-btn" onClick={() => navigate('/forgot')}>
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
