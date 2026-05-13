import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const Home = () => {
    return (
        <>
            <main className="flex-grow pb-16">
                {/* Hero Section */}
                <section className="max-w-screen-2xl mx-auto px-8 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-5/12 flex flex-col items-start text-left space-y-8 pl-0 md:pl-8">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight">
                            Your Scholarly Journey, <br />
                            <span className="text-primary-container">Accelerated by AI.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
                            The all-in-one ecosystem for university discovery, career planning, and education financing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                            <Link className="bg-primary text-white px-8 py-4 rounded-lg text-base font-semibold shadow-md hover:bg-primary-container transition-all active:scale-95 text-center flex items-center justify-center gap-2" to="/user/register">
                                Get Started
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                            </Link>

                        </div>
                    </div>
                    <div className="w-full md:w-7/12 relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl transform translate-x-4 translate-y-4"></div>
                        <img alt="Modern university campus architecture with sleek lines, glass facades, and students walking in soft natural daylight, conveying academic excellence" className="rounded-3xl w-full h-[500px] object-cover shadow-xl relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrdwmvaJ91w8ve2GNWl1NA8ZYj_prfEdn9cHtvzmDAVHcOqFhlOnKX_YZbMnnRMPjW-ZSoFpf5PFCoxu4p10a8L6VvjFvk7Ypz7jaJuxKgsS4eY1eVZB2hLJkA72YjlNPBDNrQPhuCsSoOoDN-ZH9NyATl0fAMrZNby4DTsZTm4PKzZDg9NQSEqTyZEyCa5BRJ_cp1QS4z6hD3fFQjqMpb8oIUIwWiWcRAo3A-OPJ_pqpQNZkwrVi8_WJvJYd84vvtvP7fI2GB8ELG" />
                    </div>
                </section>
                {/* Value Proposition Section */}
                <section className="max-w-screen-xl mx-auto px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,35,111,0.04)] hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>travel_explore</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">Smart Discovery</h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                AI-powered university matching based on your unique academic profile, aspirations, and holistic data points.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,35,111,0.04)] hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">Career Navigation</h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                Personalized roadmap to elite global institutions, aligning your educational choices with long-term career trajectories.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,35,111,0.04)] hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">Fluid Financing</h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                Interactive loan simulators, scholarship matching, and AI-assisted application tools to secure your future.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Final CTA Section */}
                <section className="max-w-screen-xl mx-auto px-8 py-24 text-center">
                    <div className="bg-surface-container-lowest p-16 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,35,111,0.06)] flex flex-col items-center max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">Ready to build your future?</h2>
                        <p className="text-lg text-on-surface-variant mb-10 max-w-2xl">
                            Join thousands of students architecting their educational journeys with Academic Atelier.
                        </p>
                        <Link className="bg-primary text-white px-10 py-5 rounded-xl text-lg font-semibold shadow-lg hover:bg-primary-container transition-all active:scale-95" to="/user/register">
                            Get Started Now
                        </Link>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-[#f2f4f6] dark:bg-slate-900 w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-8 max-w-screen-2xl mx-auto mt-auto border-t-0">
                <div className="text-lg font-bold text-[#00236f] dark:text-blue-200">
                    Academic Atelier
                </div>
                <div className="text-[#444651] dark:text-slate-500 font-['Inter'] text-xs uppercase tracking-widest font-semibold text-center md:text-left">
                    © 2024 The Academic Atelier. Architectural Excellence in Education.
                </div>
                <div className="flex flex-wrap justify-center gap-6 font-['Inter'] text-xs uppercase tracking-widest font-semibold text-[#444651] dark:text-slate-500">
                    <a className="hover:text-[#00236f] dark:hover:text-blue-100 transition-colors opacity-90 hover:opacity-100" href="#">Privacy Policy</a>
                    <a className="hover:text-[#00236f] dark:hover:text-blue-100 transition-colors opacity-90 hover:opacity-100" href="#">Terms of Service</a>
                    <a className="hover:text-[#00236f] dark:hover:text-blue-100 transition-colors opacity-90 hover:opacity-100" href="#">Institutional Access</a>
                    <a className="hover:text-[#00236f] dark:hover:text-blue-100 transition-colors opacity-90 hover:opacity-100" href="#">Contact</a>
                </div>
            </footer>
            {/* AI Copilot FAB */}
            <button aria-label="AI Copilot" className="fixed bottom-10 right-10 w-16 h-16 rounded-full glass-copilot text-on-primary flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </button>
        </>
    );
};

export default Home;
