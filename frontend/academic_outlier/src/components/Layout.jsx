import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    
    // Auth pages where we want a clean header (no nav links, no login/register buttons)
    const isAuthPage = location.pathname.startsWith('/user/') || location.pathname === '/auth-success';
    
    // Check if the user is currently authenticated
    const isAuthenticated = !!token;

    return (
        <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-[#f7f9fb]/90 dark:bg-slate-950/90 backdrop-blur-md border-b-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center w-full px-8 py-5 max-w-screen-2xl mx-auto">
                    <Link to="/" className="text-2xl font-bold tracking-tighter text-[#00236f] dark:text-blue-200">
                        Academic Atelier
                    </Link>
                    
                    {/* Only show feature links if not on an auth page AND user is logged in */}
                    {(!isAuthPage && isAuthenticated) && (
                        <div className="hidden md:flex space-x-8 items-center font-['Inter'] tracking-tight text-sm font-medium">
                            <Link className="text-[#444651] dark:text-slate-400 pb-1 hover:text-[#1e3a8a] dark:hover:text-blue-200 transition-all duration-300" to="/university">University</Link>
                            <Link className="text-[#444651] dark:text-slate-400 pb-1 hover:text-[#1e3a8a] dark:hover:text-blue-200 transition-all duration-300" to="/library">Library</Link>
                            <Link className="text-[#444651] dark:text-slate-400 pb-1 hover:text-[#1e3a8a] dark:hover:text-blue-200 transition-all duration-300" to="/loans">Loans</Link>
                        </div>
                    )}

                    <div className="flex space-x-6 items-center">
                        <ThemeToggle />
                        
                        {/* Only show Auth buttons if not on an auth page AND user is NOT logged in */}
                        {(!isAuthPage && !isAuthenticated) && (
                            <div className="flex space-x-4 items-center">
                                <Link className="font-['Inter'] text-sm font-medium text-[#444651] dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-white transition-colors active:scale-95" to="/user/login">Login</Link>
                                <Link className="bg-gradient-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover-bg-gradient-primary transition-all active:scale-95" to="/user/register">Get Started</Link>
                            </div>
                        )}

                        {/* Show Profile link if logged in and not on auth page */}
                        {(isAuthenticated && !isAuthPage) && (
                             <Link className="font-['Inter'] text-sm font-medium text-[#444651] dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-white transition-colors" to="/profile">
                                <span className="material-symbols-outlined align-middle mr-1">account_circle</span>
                                Profile
                             </Link>
                        )}
                    </div>
                </div>
            </nav>
            <main className={`flex-grow ${!isAuthPage ? 'pt-24' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
