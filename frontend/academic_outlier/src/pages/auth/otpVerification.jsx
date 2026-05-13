import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axios';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/verify-otp', { otp: otpValue });
      console.log('Verification Success:', response.data);
      navigate('/user/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || email === 'your email') {
      setError('Email not found. Please try registering again.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/resend-otp', { email });
      alert('A new verification code has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex antialiased">
      {/* Left Panel: Branded Deep Blue */}
      <div className="hidden lg:flex w-1/2 bg-primary relative flex-col justify-between p-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #00236f 0%, #1e3a8a 100%)' }}>
        {/* Abstract Background Graphic */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #b6c4ff 0%, transparent 40%)" }}></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary-container opacity-50 blur-3xl"></div>
        {/* Top Content */}
        <div className="relative z-10 flex items-center space-x-3">
          <span className="material-symbols-outlined text-4xl text-on-primary">architecture</span>
          <span className="text-2xl font-black tracking-tight text-on-primary">The Academic Atelier</span>
        </div>
        {/* Mid Content */}
        <div className="relative z-10 max-w-lg mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-on-primary leading-tight tracking-tight mb-6">
            Your AI ecosystem from university discovery to financing.
          </h1>
          <p className="text-lg text-primary-fixed-dim font-body">
            The Scholarly Canvas awaits. Focus on your future, while we curate the possibilities.
          </p>
        </div>
      </div>
      {/* Right Panel: White Card for OTP */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 relative bg-background">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,35,111,0.08)] p-10 relative z-10">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center space-x-2 mb-10 justify-center">
            <span className="material-symbols-outlined text-3xl text-primary">architecture</span>
            <span className="text-xl font-bold tracking-tight text-primary">The Academic Atelier</span>
          </div>
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-headline font-bold text-primary tracking-tight mb-3">Verify your email</h2>
            <p className="text-on-surface-variant font-body">We've sent a 6-digit code to <span className="font-semibold text-on-surface">{email}</span></p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="space-y-8">
            <div aria-label="Enter verification code" className="flex justify-between space-x-2 sm:space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  aria-label={`Digit ${index + 1}`}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold font-headline bg-surface-container-low text-on-surface border-none rounded-lg focus:bg-surface-container-lowest focus:ring-1 focus:ring-outline-variant/20 focus:outline-none transition-colors duration-200"
                  maxLength="1"
                  placeholder="•"
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            {/* Actions */}
            <div className="flex flex-col space-y-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-primary to-primary-container hover:from-primary-container hover:to-primary text-on-primary font-bold font-label py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-tint text-center disabled:opacity-70"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                  </>
                )}
              </button>
              <div className="text-center">
                <button 
                  className="text-on-surface-variant font-label text-sm hover:text-primary transition-colors uppercase tracking-widest font-semibold focus:outline-none disabled:opacity-50" 
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                >
                  Resend Code
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Go Back Link */}
        <div className="absolute top-8 left-8 hidden lg:block">
          <a href="/user/login" className="text-on-surface-variant hover:text-primary flex items-center space-x-2 transition-colors font-body focus:outline-none">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
