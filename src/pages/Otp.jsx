import React, { useState, useEffect } from 'react';
import './Otp.css';
import { useNavigate } from 'react-router-dom'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(''); // ✅ success or error

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code.');
      setStatus('error');
      return;
    }

    try {
      setVerifying(true);

      const response = await axios.post(
        'https://artisan-hub-e5io.onrender.com/verify',
        { code: otp }
      );

      setMessage(response.data.message || 'Verification successful!');
      setStatus('success');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
      setStatus('error');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'https://artisan-hub-e5io.onrender.com/resend-otp',
        {}
      );

      setMessage(response.data.message || 'OTP resent! Check your email');
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Resend failed');
      setStatus('error');
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
              onChange={(e) => setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}
          {message && (
            <p className={status === 'success' ? 'success-msg' : 'error-msg'}>
              {message}
            </p>
          )}

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
