import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  // const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
  

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://artisan-hub-e5io.onrender.com/register', {
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box" data-aos="zoom-in">
        <h2>Create Account</h2>
        <p className="subtitle">Join ArtisanHub and showcase your skill</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
          </div>

          {/* <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
          </div> */}

          <div className="input-group">
            <label>Contact Number</label>
            <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          {/* <div className="input-group">
            <label>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required />
          </div> */}

          {/* <div className="input-group">
            <label>Occupation</label>
            <input type="text" name="jobSkill" value={form.jobSkill} onChange={handleChange} required />
          </div> */}

          {/* <div className="input-group">
            <label>Identification Number</label>
            <input type="text" name="idNumber" value={form.idNumber} onChange={handleChange} required />
          </div> */}

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePassword} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <span onClick={toggleConfirmPassword} className="toggle-password">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div> */}

          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="register-link">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
