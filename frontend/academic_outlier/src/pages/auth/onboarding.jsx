import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Onboarding = () => {
  const navigate = useNavigate();
  const [degree, setDegree] = useState('');
  const [budget, setBudget] = useState('');
  const [gpa, setGpa] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState(['USA', 'Canada']);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customDestination, setCustomDestination] = useState('');
  const [customDestinations, setCustomDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultDestinations = ['USA', 'UK', 'Canada', 'Germany', 'Australia'];
  const allDestinations = [...defaultDestinations, ...customDestinations];

  const toggleDestination = (dest) => {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const handleCustomDestinationKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = customDestination.trim();
      if (trimmed) {
        if (!allDestinations.includes(trimmed)) {
          setCustomDestinations([...customDestinations, trimmed]);
        }
        if (!selectedDestinations.includes(trimmed)) {
          setSelectedDestinations([...selectedDestinations, trimmed]);
        }
        setCustomDestination('');
        setShowOtherInput(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        profile: {
          currentDegree: degree,
          annualBudget: Number(budget),
          targetDestinations: selectedDestinations,
          academicStanding: {
            gpa: Number(gpa)
          }
        }
      };
      await api.patch('/users/profile', payload);
      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding Error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex">
      {/* Split Screen Layout */}
      <div className="flex w-full min-h-screen">
        {/* Left Panel: Brand & Vision */}
        <div className="hidden lg:flex w-5/12 bg-primary relative flex-col justify-between p-12 overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-50 mix-blend-screen"></div>
          <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-secondary rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-on-primary">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              <span className="font-headline font-black text-2xl tracking-tighter">Academic Atelier</span>
            </div>
          </div>
          <div className="relative z-10 mt-auto mb-20 pr-10">
            <div className="bg-[#00236f]/40 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <h1 className="font-headline text-4xl font-bold text-on-primary leading-tight tracking-tight mb-4">
                Your AI ecosystem from university discovery to financing.
              </h1>
              <p className="text-primary-fixed-dim text-lg font-light leading-relaxed">
                Curating your elite academic journey with precision and intelligence.
              </p>
            </div>
          </div>
          <div className="relative z-10 text-primary-fixed-dim text-sm">
            © 2024 The Academic Atelier. All rights reserved.
          </div>
          {/* Graphic Element placeholder */}
          <img alt="Academic Architecture" className="absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 w-3/4 opacity-10 mix-blend-overlay object-cover h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgB3v0UtyY3F8_u5-r9jJzEeH2rgX1sug1Ax8D9hGArUAfcZoZGQPL-eE9tK_vG3_84QizJAytT1x87PASJm4MiJjw4-waRoN3q9bPpx_AUUvEvHo3Wv2PNHq0kpcZfEnRrsTJjQ6sAowRJtUfVi_2QffuPOfXjZmJxg_eLHPJk1AUXp5RyDoa28HTnue2qKTLGSfMBxPRCwjyRbKSR7UkJY7qXaEG-YZV4wv1bPQhDsHFwkQiP-mosg3SYqDciFaDnahXY33eqEgr"/>
        </div>
        {/* Right Panel: Onboarding Form */}
        <div className="w-full lg:w-7/12 bg-surface-container-low flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-y-auto">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden w-full max-w-xl mb-8 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            <span className="font-headline font-bold text-xl tracking-tighter">Academic Atelier</span>
          </div>
          {/* Main Content Container */}
          <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl p-8 sm:p-12 flex flex-col gap-10 shadow-sm">
            {/* Progress Indicator */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-label text-on-surface-variant uppercase tracking-[0.05em]">
                <span>Academic Profile</span>
              </div>
            </div>
            {/* Form Header */}
            <div className="flex flex-col gap-2">
              <h2 className="font-headline text-3xl font-bold text-primary tracking-tight">Define Your Blueprint</h2>
              <p className="text-on-surface-variant text-base">Tell us about your current standing and academic ambitions.</p>
            </div>
            {/* Form Fields */}
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              {/* Current Degree */}
              <div className="flex flex-col gap-2">
                <label className="font-label text-sm uppercase tracking-[0.05em] text-on-surface-variant">Current Degree Level</label>
                <div className="relative">
                  <select 
                    value={degree} 
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full appearance-none bg-surface-container-low text-on-surface border border-outline-variant/20 rounded-lg py-4 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-colors cursor-pointer"
                    required
                  >
                    <option disabled value="">Select your highest qualification</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Bachelors">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
              {/* Target Countries (Pills) */}
              <div className="flex flex-col gap-3">
                <label className="font-label text-sm uppercase tracking-[0.05em] text-on-surface-variant">Target Destinations</label>
                <div className="flex flex-wrap gap-3">
                  {allDestinations.map(dest => {
                    const isSelected = selectedDestinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary border-transparent'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container'
                        }`}
                        onClick={() => toggleDestination(dest)}
                        type="button"
                      >
                        {dest}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setShowOtherInput(!showOtherInput)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                      showOtherInput
                        ? 'bg-primary text-on-primary border-transparent'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container'
                    }`}
                  >
                    Others +
                  </button>
                </div>
                {showOtherInput && (
                  <div className="mt-2 transition-all duration-300">
                    <input
                      type="text"
                      value={customDestination}
                      onChange={(e) => setCustomDestination(e.target.value)}
                      onKeyDown={handleCustomDestinationKeyDown}
                      placeholder="Type your desired destination and press Enter"
                      className="w-full bg-surface-container-low text-on-surface border border-outline-variant/20 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-colors"
                    />
                  </div>
                )}
              </div>
              {/* Grid for Budget & Test Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="font-label text-sm uppercase tracking-[0.05em] text-on-surface-variant">Annual Budget ($)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant z-10">attach_money</span>
                    <input 
                      className="w-full bg-surface-container-low text-on-surface border border-outline-variant/20 rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-colors" 
                      placeholder="0" 
                      type="number" 
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* GPA */}
                <div className="flex flex-col gap-2">
                  <label className="font-label text-sm uppercase tracking-[0.05em] text-on-surface-variant">Academic GPA</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant z-10">workspace_premium</span>
                    <input 
                      className="w-full bg-surface-container-low text-on-surface border border-outline-variant/20 rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-colors" 
                      placeholder="e.g. 3.8 or 9.0" 
                      type="number" 
                      step="0.01"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {error && <p className="text-error text-sm">{error}</p>}

              {/* Actions */}
              <div className="pt-6 flex items-center justify-between mt-4">
                <button 
                  type="button"
                  onClick={() => navigate('/user/login')}
                  className="text-on-surface-variant font-medium hover:text-on-surface transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-semibold hover:saturate-150 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-tint shadow-sm inline-block text-center disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* AI Copilot FAB */}
      <button aria-label="AI Copilot" className="fixed bottom-10 right-10 w-16 h-16 bg-primary/90 backdrop-blur-md rounded-full flex justify-center items-center text-on-primary shadow-[0_20px_40px_rgba(0,35,111,0.2)] hover:bg-primary transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
      </button>
    </div>
  );
};

export default Onboarding;
