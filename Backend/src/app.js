const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const universityRoutes = require('./routes/university.routes');
const applicationRoutes = require('./routes/application.routes');
const loanRoutes = require('./routes/loan.routes');
const passport = require('passport');
const cors = require('cors');
require('./config/passport'); // Ensure passport strategies are configured

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    // Add protocol versions if missing
    process.env.FRONTEND_URL && !process.env.FRONTEND_URL.startsWith('http') ? `https://${process.env.FRONTEND_URL}` : null,
    process.env.FRONTEND_URL && !process.env.FRONTEND_URL.startsWith('http') ? `http://${process.env.FRONTEND_URL}` : null,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin matches exactly or without protocol
        const isAllowed = allowedOrigins.some(allowed => {
            return allowed === origin || origin.replace(/^https?:\/\//, '') === allowed.replace(/^https?:\/\//, '');
        });

        if (!isAllowed) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/loans/', loanRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;