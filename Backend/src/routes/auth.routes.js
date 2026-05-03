const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
dotenv.config();

// Generate JWT Helper (Duplicate from your authController, or extract to a utils file)
const generateToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

// @desc    Initiate Google OAuth login
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google OAuth Callback
// @route   GET /api/auth/google/callback
router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    (req, res) => {
        const token = generateToken(req.user._id);
        
        // Set cookie so frontend can use it withCredentials: true
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax', // Required for cross-site redirects in development
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        // Check if user is already onboarded
        const isOnboarded = req.user.profile && req.user.profile.currentDegree && req.user.profile.currentDegree !== 'Other';
        
        const frontendUrl = process.env.FRONTEND_URL || 'https://academic-outlier.vercel.app';
        const redirectUrl = frontendUrl.startsWith('http') ? frontendUrl : `https://${frontendUrl}`;
        
        res.redirect(`${redirectUrl}/auth-success?token=${token}&onboarded=${isOnboarded}`);
    }
);

// Register
router.post('/register' , authController.register);

// Login
router.post('/login' , authController.login);

// Verify OTP
router.post('/verify-otp', authMiddleware.authMiddleware, authController.verifyOTP);

// Forgot Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

module.exports = router;