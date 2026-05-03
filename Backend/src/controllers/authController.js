const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');

// Secure cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

async function registerUser(req, res) {
    console.log('Register Request Body:', req.body);
    if (require('mongoose').connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database connection not established. Please try again in a moment.' });
    }
    try {
        let { email, password, profile, fullName } = req.body;
        profile = profile || {};
        
        // Map fullName to profile.name if provided
        if (fullName && !profile.name) {
            profile.name = fullName;
        }

        // Accept top-level targetDestinations and annualBudget and merge into profile
        if (req.body.targetDestinations && !profile.targetDestinations) {
            profile.targetDestinations = Array.isArray(req.body.targetDestinations)
                ? req.body.targetDestinations
                : [req.body.targetDestinations];
        }
        if (req.body.annualBudget != null && profile.annualBudget == null) {
            profile.annualBudget = req.body.annualBudget;
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const newUser = new User({
            email,
            password: hashedPassword,
            profile,
            otp,
            otpExpires
        });

        await newUser.save();

        // Send OTP via email
        try {
            const message = `Your verification code is: ${otp}`;
            const html = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 16px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2c3e50; margin: 0;">Academic Outlier</h1>
                        <p style="color: #7f8c8d; font-size: 16px;">Empowering Your Academic Journey</p>
                    </div>
                    <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 2px; border-radius: 12px; margin-bottom: 30px;">
                        <div style="background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">
                            <h2 style="color: #2c3e50; margin-top: 0;">Verify Your Email</h2>
                            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">Welcome to the community! Use the secure verification code below to complete your registration:</p>
                            <div style="font-size: 36px; font-weight: 800; color: #2575fc; letter-spacing: 8px; margin: 30px 0; padding: 20px; background: #f8faff; border-radius: 8px; border: 1px dashed #2575fc;">
                                ${otp}
                            </div>
                            <p style="color: #95a5a6; font-size: 14px;">This code is valid for <strong>10 minutes</strong>.</p>
                        </div>
                    </div>
                    <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
                        If you didn't create an account, you can safely ignore this email.
                    </p>
                </div>
            `;

            await sendEmail({
                email: newUser.email,
                subject: 'Verify Your Academic Outlier Account',
                message,
                html
            });
        } catch (mailError) {
            console.error('Failed to send verification email:', mailError);
            // We still registered the user, but they'll need to request a new OTP if it failed
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        return res.cookie('token', token, cookieOptions).status(201).json({
            message: 'User registered successfully. Please verify your email.',
            otp, // Returning OTP for development/testing purposes
            user: {
                userId: newUser._id,
                email: newUser.email,
                profile: newUser.profile
            }
        });
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email to log in' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        return res.cookie('token', token, cookieOptions).json({
            message: 'Login successful',
            user: {
                userId: user._id,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function verifyOTP(req, res) {
    try {
        const { otp } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        await user.save();

        // Send Reset OTP via email
        try {
            const message = `Your password reset code is: ${otp}`;
            const html = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 16px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2c3e50; margin: 0;">Academic Outlier</h1>
                        <p style="color: #e74c3c; font-size: 16px; font-weight: 600;">Password Reset Request</p>
                    </div>
                    <div style="background: #fdf2f2; border-left: 4px solid #e74c3c; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin: 0;">You requested a password reset. Use the code below to set a new password:</p>
                    </div>
                    <div style="font-size: 36px; font-weight: 800; color: #e74c3c; text-align: center; letter-spacing: 8px; margin: 30px 0; padding: 20px; background: #fff5f5; border-radius: 8px; border: 1px dashed #e74c3c;">
                        ${otp}
                    </div>
                    <p style="color: #95a5a6; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
                        If you didn't request a password reset, please secure your account immediately.
                    </p>
                </div>
            `;

            await sendEmail({
                email: user.email,
                subject: 'Password Reset - Academic Outlier',
                message,
                html
            });
        } catch (mailError) {
            console.error('Failed to send reset email:', mailError);
        }

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function resetPassword(req, res) {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register: registerUser,
    login: login,
    verifyOTP: verifyOTP,
    forgotPassword,
    resetPassword
};
