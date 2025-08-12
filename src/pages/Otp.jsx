import React, { useState, useEffect } from 'react';
import './Otp.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('https://hawauai-backend.onrender.com/verify-otp', {
        otp,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage('OTP Verified! Redirecting...');
        // TODO: Redirect or continue flow
      } else {
        setError('Invalid OTP, please try again');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('https://hawauai-backend.onrender.com/resend-otp', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage('OTP resent! Check your email');
      } else {
        setError('Could not resend OTP. Try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Resend failed');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box" data-aos="fade-up">
        <h2>Email Verification</h2>
        <p className="subtitle">We just sent a code to your email</p>

        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}
          {message && <p className="success-msg">{message}</p>}

          <button type="submit" className="btn-primary full" disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="resend-section">
          <p>Didn’t get the email?</p>
          <button onClick={handleResend} disabled={resending} className="resend-btn">
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;