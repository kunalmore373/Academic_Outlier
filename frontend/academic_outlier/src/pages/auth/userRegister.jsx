import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios' ;

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Submitting registration with:', formData);
    setLoading(true);
    setError('');
    try {
      console.log('Calling API...');
      const response = await api.post('/auth/register', formData);
      console.log('API Response:', response.data);
      navigate('/user/otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.message || err.message || 'Registration failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'https://academic-outlier.onrender.com';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <main className="flex-grow flex items-stretch">
        <div className="flex w-full min-h-screen">

          {/* Left Panel (Branding / Value Prop) */}
          <div className="hidden lg:flex w-5/12 bg-primary text-on-primary pt-32 pb-16 px-16 flex-col justify-between relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00236f 0%, #1e3a8a 100%)' }}>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
            <div className="z-10">
              <div className="text-2xl font-bold tracking-tighter text-on-primary mb-24">The Academic Atelier</div>
              <h1 className="text-5xl font-display font-bold leading-tight tracking-tight mb-8">
                Join the Elite Academic Community.
              </h1>
              <p className="text-xl text-on-primary-container font-medium leading-relaxed max-w-md">
                Your journey to global education starts here. Personalised, AI-driven, and designed for your success.
              </p>
            </div>
            <div className="z-10 text-on-primary-container text-sm">
              © 2024 The Academic Atelier.
            </div>
          </div>
          {/* Right Panel (Form) */}
          <div className="w-full lg:w-7/12 bg-surface-container-lowest flex flex-col items-center pt-32 pb-12 px-8 sm:px-12 lg:px-24 overflow-y-auto">

            <div className="w-full max-w-md space-y-10 my-auto">

              {/* Mobile Brand Identity (Visible only on small screens) */}
              <div className="lg:hidden text-2xl font-bold tracking-tighter text-primary text-center mb-8">
                The Academic Atelier
              </div>
              {/* Header */}
              <div className="text-center sm:text-left space-y-3">
                <h2 className="text-3xl font-headline font-extrabold tracking-tight text-primary">Create your account</h2>
                <p className="text-on-surface-variant text-base">Step into a space of focus and authority.</p>
              </div>

              {error && (
                <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm font-medium border border-error/20">
                  {error}
                </div>
              )}
              {/* Social Sign Up */}
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-medium py-3 px-4 rounded-lg transition-colors border border-outline-variant/20 shadow-[0_2px_10px_rgba(0,35,111,0.02)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Sign up with Google
              </button>
              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink-0 mx-4 text-sm text-on-surface-variant uppercase tracking-widest font-medium">or sign up with email</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>
              {/* Form */}
              <form className="space-y-6" onSubmit={handleRegister}>
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-wide text-on-surface uppercase text-[0.75rem]" htmlFor="fullName">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                    </span>
                    <input 
                      className="w-full bg-surface-container-low border border-transparent focus:border-outline-variant/20 focus:bg-surface-container-lowest text-on-surface text-base rounded-lg pl-11 pr-4 py-3.5 outline-none transition-all duration-200 placeholder:text-on-surface-variant/50" 
                      id="fullName" 
                      value={formData.fullName}
                      onChange={handleChange} 
                      placeholder="Jane Doe" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-wide text-on-surface uppercase text-[0.75rem]" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                    </span>
                    <input 
                      className="w-full bg-surface-container-low border border-transparent focus:border-outline-variant/20 focus:bg-surface-container-lowest text-on-surface text-base rounded-lg pl-11 pr-4 py-3.5 outline-none transition-all duration-200 placeholder:text-on-surface-variant/50" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange} 
                      placeholder="jane@university.edu" 
                      type="email" 
                      required
                    />
                  </div>
                </div>
                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-wide text-on-surface uppercase text-[0.75rem]" htmlFor="password">Create Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                    </span>
                    <input 
                      className="w-full bg-surface-container-low border border-transparent focus:border-outline-variant/20 focus:bg-surface-container-lowest text-on-surface text-base rounded-lg pl-11 pr-12 py-3.5 outline-none transition-all duration-200 placeholder:text-on-surface-variant/50" 
                      id="password" 
                      value={formData.password}
                      onChange={handleChange} 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"} 
                      required
                    />
                    <button 
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-on-surface-variant hover:text-primary transition-colors" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {(() => {
                    const pass = formData.password;
                    let strength = 0;
                    if (pass.length >= 8) strength++;
                    if (/[A-Z]/.test(pass)) strength++;
                    if (/[0-9]/.test(pass)) strength++;
                    if (/[^A-Za-z0-9]/.test(pass)) strength++;

                    const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
                    const colors = ["bg-error", "bg-error", "bg-warning", "bg-success", "bg-success"];
                    const label = labels[strength];
                    const colorClass = colors[strength];

                    return (
                      <>
                        <div className="mt-3 flex gap-2 w-full h-1.5">
                          <div className={`flex-1 rounded-full ${strength >= 1 ? colorClass : 'bg-surface-container-high'}`}></div>
                          <div className={`flex-1 rounded-full ${strength >= 2 ? colorClass : 'bg-surface-container-high'}`}></div>
                          <div className={`flex-1 rounded-full ${strength >= 3 ? colorClass : 'bg-surface-container-high'}`}></div>
                          <div className={`flex-1 rounded-full ${strength >= 4 ? colorClass : 'bg-surface-container-high'}`}></div>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">
                          Strength: <span className={`${strength >= 3 ? 'text-success' : strength >= 2 ? 'text-warning' : 'text-error'} font-medium`}>{label}</span> 
                          {pass.length < 8 && " (Need at least 8 characters)"}
                        </p>
                      </>
                    );
                  })()}
                </div>
                {/* CTA Button */}
                <button 
                  className="w-full text-on-primary font-semibold text-lg py-4 px-6 rounded-lg shadow-[0_10px_20px_rgba(0,35,111,0.15)] hover:shadow-[0_15px_30px_rgba(0,35,111,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-surface-tint focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center" 
                  style={{ background: 'linear-gradient(135deg, #00236f 0%, #1e3a8a 100%)' }} 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
              {/* Footer Link */}
              <div className="text-center pt-6">
                <p className="text-on-surface-variant text-sm">
                  Already have an account?{' '}
                  <a className="text-primary font-semibold hover:text-primary-container underline decoration-primary/30 underline-offset-4 transition-colors" href="/user/login">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Floating AI Copilot Button (Contextual: Allowed here as a global assistant) */}
      <button className="fixed bottom-10 right-10 w-14 h-14 bg-primary/90 backdrop-blur-md rounded-full shadow-[0_20px_40px_rgba(0,35,111,0.2)] flex items-center justify-center text-on-primary hover:bg-primary transition-all duration-300 hover:scale-105 z-50 focus:outline-none focus:ring-4 focus:ring-primary-container/50">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
      </button>
    </div>
  );
};

export default UserRegister;
