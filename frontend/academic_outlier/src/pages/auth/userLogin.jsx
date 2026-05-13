import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', formData);
      const { user } = response.data;
      
      // If user has a degree set, they are already onboarded
      if (user.profile && user.profile.currentDegree && user.profile.currentDegree !== 'Other') {
        navigate('/dashboard');
      } else {
        navigate('/user/onboarding');
      }
    } catch (err) {
      console.error('Login Error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'https://academic-outlier.onrender.com';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="bg-background text-on-surface min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden antialiased">
      {/* Left Panel: Deep Trust Blue Graphic Area */}
      <div className="hidden lg:flex flex-col justify-between lg:w-1/2 bg-primary relative overflow-hidden pt-32 pb-16 px-16 min-h-screen">
        {/* Abstract Decoration / Graphic Area */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-container to-primary rounded-full blur-[120px] opacity-60 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-surface-tint to-primary rounded-full blur-[100px] opacity-40 transform -translate-x-1/4 translate-y-1/4"></div>
          {/* Conceptual Academic Image / Graphic */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 mix-blend-overlay">
            <img
              alt="Abstract architectural lines of a modern university library bathed in soft natural light"
              className="w-full h-full object-cover grayscale"
              data-alt="Abstract architectural lines of a modern university library bathed in soft natural light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7NXBtjr2GClQPHuvL2NAY8zFbPax4fJigEzX2gtXcd_qj02e9p4JkwDoancrPx-u4ULRg7LUzRPyVro3yfbPHmjFhL50as9pcRu-GHBAiRDWZN8XURM_j_SWJEBgr45MuR8S5iTsA-KtcyNT9TOGbDssVgrP8J0sW4aMKSz5CkF5jDimNU5vaL49y4T59QWQqNeqtQAGn57ZlPAHVTecBwzu-_zLsRPjN6H-_cbdNstSqPJqY6QMucmrNiD1qhLHb_qA54br97x8x"
            />
          </div>
        </div>
        {/* Logo / Brand Anchor */}
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tighter text-on-primary">Academic Atelier</h2>
        </div>
        {/* Value Proposition */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-bold text-on-primary leading-tight tracking-tight mb-6">
            Your AI ecosystem from university discovery to financing.
          </h1>
          <p className="text-lg text-primary-fixed-dim leading-relaxed">
            Experience a tailored, data-driven approach to your academic future. Built for clarity, designed for success.
          </p>
        </div>
      </div>
      {/* Right Panel: Login Container */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center bg-surface-container-low pt-32 pb-8 px-8 relative overflow-y-auto">

        <div className="my-auto w-full flex flex-col items-center">


        {/* Main Login Card (Surface Lowest for pop) */}
        <div className="w-full max-w-md bg-surface-container-lowest p-10 rounded-xl shadow-[0_20px_40px_rgba(0,35,111,0.03)] flex flex-col gap-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary tracking-tight font-headline">Welcome to Academic Atelier</h2>
            <p className="text-on-surface-variant font-body">Start your scholarly journey with ease.</p>
          </div>
          {/* SSO Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative"
            >
              {/* Ghost border for separation without harsh lines */}
              <div className="absolute inset-0 border border-outline-variant opacity-20 rounded-lg pointer-events-none"></div>
              {/* Inline SVG for Google Logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-on-surface font-medium font-body">Continue with Google</span>
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-surface-container-high flex-1"></div>
            <span className="text-on-surface-variant text-sm font-label uppercase tracking-widest">or</span>
            <div className="h-px bg-surface-container-high flex-1"></div>
          </div>
          {/* Email Input & Submit */}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-on-surface-variant font-label tracking-widest uppercase" htmlFor="email">Email Address</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-low border-0 text-on-surface placeholder:text-on-surface-variant/50 rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 transition-colors peer font-body"
                  id="email"
                  name="email"
                  placeholder="student@university.edu"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {/* The Ghost Border technique for focus state */}
                <div className="absolute inset-0 border border-outline-variant opacity-0 peer-focus:opacity-20 rounded-lg pointer-events-none transition-opacity"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-on-surface-variant font-label tracking-widest uppercase" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-low border-0 text-on-surface placeholder:text-on-surface-variant/50 rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 transition-colors peer font-body pr-12"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
                <div className="absolute inset-0 border border-outline-variant opacity-0 peer-focus:opacity-20 rounded-lg pointer-events-none transition-opacity"></div>
              </div>
              <div className="flex justify-end mt-1">
                <button 
                  type="button"
                  onClick={() => navigate('/user/forgot-password')}
                  className="text-xs font-bold text-primary hover:text-primary-container transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && <p className="text-error text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-3 px-4 rounded-lg font-medium hover:from-primary-container hover:to-primary transition-all focus:outline-none focus:ring-2 focus:ring-surface-tint focus:ring-offset-2 flex justify-center items-center gap-2 font-body text-center"
            >
              Log In
              <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </form>
          {/* Footer Link */}
          <div className="text-center mt-2">
            <p className="text-sm text-on-surface-variant font-body">
              Don't have an account?{' '}
              <a className="text-primary font-semibold hover:text-primary-container transition-colors" href="/user/register">Sign up</a>
            </p>
          </div>
        </div>
      </div>
      {/* AI Copilot Floating Action Button */}

        <button className="absolute bottom-10 right-10 w-14 h-14 bg-primary/90 backdrop-blur-md rounded-full shadow-[0_20px_40px_rgba(0,35,111,0.15)] flex items-center justify-center text-on-primary hover:scale-105 transition-transform focus:outline-none z-50">
          <span className="material-symbols-outlined" data-icon="sparkles" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
