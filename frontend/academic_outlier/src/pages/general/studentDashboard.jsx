import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [supportPanelOpen, setSupportPanelOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data.user);
        
        // Sync with your existing bookmark system
        const saved = localStorage.getItem('uni_bookmarks');
        setBookmarks(saved ? JSON.parse(saved) : []);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00236f]"></div>
      </div>
    );
  }

  return (
    <div className="antialiased min-h-screen flex bg-[#f7f9fb] text-slate-900 font-['Inter']">
      {/* SideNavBar - Consistent with your existing theme */}
      <nav className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200/60 z-50">
        <div className="flex flex-col h-full py-8">
          <div className="px-8 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00236f] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
              {user?.profile?.name?.[0] || 'A'}
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-[#00236f] dark:text-white leading-tight">The Atelier</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student Portal</p>
            </div>
          </div>
          <ul className="flex flex-col gap-1 px-4 flex-grow">
            <li>
              <div 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-4 text-[#00236f] font-bold bg-blue-50 dark:bg-slate-800 rounded-xl px-4 py-3 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="text-sm">Overview</span>
              </div>
            </li>
            <li>
              <div 
                onClick={() => navigate('/university')}
                className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span className="text-sm">Universities</span>
              </div>
            </li>
            <li>
              <div 
                onClick={() => navigate('/loans')}
                className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">payments</span>
                <span className="text-sm">Loan Tools</span>
              </div>
            </li>
            <li>
              <div 
                onClick={() => navigate('/library')}
                className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span className="text-sm">Shortlist</span>
              </div>
            </li>
            <li>
              <div 
                onClick={() => navigate('/profile')}
                className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span className="text-sm">Profile</span>
              </div>
            </li>
          </ul>
          
          {/* Quick Support Card */}
          <div className="mx-4 p-4 bg-slate-900 rounded-2xl mt-auto">
            <p className="text-white text-xs font-bold mb-2">Need Guidance?</p>
            <p className="text-slate-400 text-[10px] leading-relaxed mb-4">Reach out to support or explore the dashboard for help resources.</p>
            <button onClick={() => setSupportPanelOpen(true)} className="w-full py-2 bg-white text-slate-900 text-[10px] font-black uppercase rounded-lg hover:bg-slate-100 transition-colors">Contact Support</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 p-10 w-full">
        {/* Welcome Header */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#00236f] tracking-tight mb-2">
              Welcome back, {user?.profile?.name || 'Scholar'}.
            </h2>
            <p className="text-slate-500 font-medium">
              Architecting your journey to <span className="text-[#00236f] font-bold">{user?.profile?.targetDestinations?.[0] || 'Global Excellence'}</span>.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <button className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-400 hover:text-[#00236f] transition-all">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
            >
               <img 
                 className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md group-hover:ring-[#00236f] transition-all" 
                 src={((user?.profile?.avatar || "").startsWith('http') ? user.profile.avatar : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'https://academic-outlier.onrender.com'}${user?.profile?.avatar}`) || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                 alt="Avatar" 
               />
            </div>
          </div>
        </header>

        {/* Scholar Snapshot Grid - REPLACES THE SLIDER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Academic Standing */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
            <span className="material-symbols-outlined text-[#00236f] mb-4 text-3xl opacity-80">workspace_premium</span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Academic Status</h3>
            <p className="text-xl font-black text-[#00236f] text-left">{user?.profile?.academicStanding?.gpa || '0.0'} GPA</p>
            <p className="text-[10px] font-bold text-slate-500 mt-1 text-left">{user?.profile?.currentDegree || 'Undergraduate'}</p>
          </div>

          {/* Card 2: Discovery Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
            <span className="material-symbols-outlined text-green-600 mb-4 text-3xl opacity-80">travel_explore</span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Institutions</h3>
            <p className="text-xl font-black text-[#00236f] text-left">{bookmarks.length} Shortlisted</p>
            <button onClick={() => navigate('/university')} className="text-[10px] font-black text-green-600 uppercase mt-1 hover:underline underline-offset-4 block text-left">Explore More →</button>
          </div>

          {/* Card 3: Loan Readiness */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
            <span className="material-symbols-outlined text-amber-600 mb-4 text-3xl opacity-80">account_balance</span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Financial Budget</h3>
            <p className="text-xl font-black text-[#00236f] text-left">${user?.profile?.annualBudget?.toLocaleString() || '0'}/yr</p>
            <button onClick={() => navigate('/loans')} className="text-[10px] font-black text-amber-600 uppercase mt-1 hover:underline underline-offset-4 block text-left">Open Calculator →</button>
          </div>

          {/* Card 4: Target Destination */}
          <div className="bg-gradient-to-br from-[#00236f] to-[#1e3a8a] p-6 rounded-2xl shadow-xl shadow-blue-900/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <span className="material-symbols-outlined text-white/80 mb-4 text-3xl">public</span>
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1 text-left">Primary Goal</h3>
            <p className="text-xl font-black text-white text-left">{user?.profile?.targetDestinations?.[0] || 'Global Study'}</p>
            <p className="text-[10px] font-bold text-white/80 mt-1 text-left">Visa Success: 92%</p>
          </div>
        </div>

        {/* Dashboard Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Discovery Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-[#00236f] tracking-tight">Discovery Compass</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-50 text-[#00236f] text-[10px] font-black rounded-full uppercase">AI Personalized</span>
              </div>
            </div>
            
            {/* Smart Snippets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Snippet 1: The Perfect Match */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#00236f]">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-lg uppercase">98% Match</span>
                </div>
                <h4 className="text-lg font-black text-[#00236f] mb-1 text-left">ETH Zurich</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3 text-left">MS Computer Science</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 text-left">Your {user?.profile?.academicStanding?.gpa} GPA and research background make you a top-tier candidate for their 2026 intake.</p>
                <button onClick={() => navigate('/university')} className="w-full py-2.5 bg-slate-50 text-[#00236f] text-[10px] font-black uppercase rounded-xl group-hover:bg-[#00236f] group-hover:text-white transition-all">View Details</button>
              </div>

              {/* Snippet 2: Urgent Deadline */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <span className="material-symbols-outlined">alarm</span>
                  </div>
                  <span className="bg-red-100 text-red-700 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter">48 Hours Left</span>
                </div>
                <h4 className="text-lg font-black text-[#00236f] mb-1 text-left">TU Munich</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3 text-left">Early Action Deadline</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 text-left">Applications for Winter intake in {user?.profile?.targetDestinations?.[0] || 'Germany'} are closing. 3 items in your shortlist need attention.</p>
                <button onClick={() => navigate('/university')} className="w-full py-2.5 border border-red-100 text-red-600 text-[10px] font-black uppercase rounded-xl hover:bg-red-600 hover:text-white transition-all">Complete Now</button>
              </div>

              {/* Snippet 3: Scholarship Spotlight */}
              <div className="bg-[#00236f] p-6 rounded-3xl shadow-xl shadow-blue-900/10 relative overflow-hidden group col-span-1 md:col-span-2">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">stars</span>
                      <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Scholarship found</span>
                    </div>
                    <h4 className="text-xl font-black text-white mb-2 leading-tight">Global Excellence Grant</h4>
                    <p className="text-blue-200 text-xs max-w-md leading-relaxed">A new $15,000 grant has been unlocked for STEM students targeting {user?.profile?.targetDestinations?.[0] || 'International'} universities. You meet 4/5 criteria.</p>
                  </div>
                  <button className="px-8 py-4 bg-white text-[#00236f] text-[10px] font-black uppercase rounded-2xl hover:scale-105 transition-all whitespace-nowrap">Check Eligibility</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Tools & Shortcuts */}
          <div className="space-y-8">
             {/* Financial Quick Tool */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-black text-[#00236f] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">calculate</span>
                  EMI Quick Estimate
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                      <span>Recommended Loan</span>
                      <span className="text-[#00236f]">${((user?.profile?.annualBudget || 20000) * 2).toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00236f] w-2/3"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly EMI</p>
                      <p className="text-2xl font-black text-[#00236f]">
                        ${Math.round(((user?.profile?.annualBudget || 20000) * 2 * 0.012)).toLocaleString()}
                        <span className="text-xs font-medium text-slate-400">/mo</span>
                      </p>
                    </div>
                    <button onClick={() => navigate('/loans')} className="p-2 bg-white rounded-lg shadow-sm text-[#00236f] hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined">trending_up</span>
                    </button>
                  </div>
                </div>
             </div>

            {/* Recent Shortlist */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="text-sm font-black text-[#00236f] uppercase tracking-widest mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-blue-600">auto_stories</span>
                 Your Shortlist
               </h3>
               {bookmarks.length > 0 ? (
                 <ul className="space-y-4">
                   {bookmarks.slice(0, 3).map((uni, i) => (
                     <li key={i} className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/university')}>
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#00236f] font-bold text-xs">
                         {uni.name[0]}
                       </div>
                       <div className="flex-1 text-left">
                         <p className="text-xs font-bold text-slate-800 line-clamp-1">{uni.name}</p>
                         <p className="text-[10px] text-slate-400">{uni.country}</p>
                       </div>
                       <span className="material-symbols-outlined text-slate-300 group-hover:text-[#00236f] transition-colors text-sm">chevron_right</span>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <p className="text-xs text-slate-400 italic text-left">No universities saved yet.</p>
               )}
               <button onClick={() => navigate('/library')} className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-[#00236f] hover:border-[#00236f] transition-all">
                 View Full Shortlist
               </button>
            </div>
          </div>
        </div>
      </main>

      {/* Support Side Panel */}
      {supportPanelOpen && (
        <>
          <div onClick={() => setSupportPanelOpen(false)} className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40" />
          <aside className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-r border-slate-200 z-50 overflow-y-auto">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Support Center</p>
                <h2 className="text-2xl font-black text-[#00236f]">Need help?</h2>
              </div>
              <button onClick={() => setSupportPanelOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-slate-600 leading-7">
                If you need help using the Academic Outlier portal, our support team is ready to assist with account questions, application guidance, and general student resources.
              </p>

              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                <h3 className="text-xl font-semibold text-[#00236f] mb-3">Email Support</h3>
                <p className="text-slate-600 mb-5">Send us a message and we will respond as soon as possible.</p>
                <button
                  onClick={() => window.location.href = 'mailto:kunalmoreclg@gmail.com?subject=Academic%20Outlier%20Support'}
                  className="w-full py-3 bg-[#00236f] text-white rounded-2xl font-semibold hover:bg-[#0d3a74] transition"
                >
                  Email support
                </button>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                <h3 className="text-xl font-semibold text-[#00236f] mb-3">Help Resources</h3>
                <p className="text-slate-600 mb-5">
                  Explore your dashboard for university guidance, loan tools, and profile tips.
                </p>
                <button
                  onClick={() => setSupportPanelOpen(false)}
                  className="w-full py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-100 transition"
                >
                  Return to dashboard
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Floating Copilot Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-2xl bg-[#00236f] text-white flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </button>
    </div>
  );
};

export default StudentDashboard;
