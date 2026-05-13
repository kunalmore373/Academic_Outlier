import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../../pages/auth/userRegister';
import Login from '../../pages/auth/userLogin';
import OtpVerification from '../../pages/auth/otpVerification';
import Onboarding from '../../pages/auth/onboarding';
import AuthSuccess from '../../pages/auth/AuthSuccess';
import Home from '../../pages/general/home';
import StudentDashboard from '../../pages/general/studentDashboard';
import University from '../../pages/general/university';
import Loans from '../../pages/general/loans';
import Library from '../../pages/general/Library';
import Profile from '../../pages/general/profile';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import Layout from '../../components/Layout';

const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/user/register" element={<Register />} />
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/user/forgot-password" element={<ForgotPassword />} />
                    <Route path="/auth-success" element={<AuthSuccess />} />
                    <Route path="/user/otp" element={<OtpVerification />} />
                    <Route path="/user/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/university" element={<University />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/loans" element={<Loans />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRoutes;