const nodemailer = require('nodemailer');

/**
 * Utility to send emails using Nodemailer
 * @param {Object} options - { email, subject, message, html }
 */
const sendEmail = async (options) => {
    // Ensure credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error(' EMAIL ERROR: EMAIL_USER and EMAIL_PASS must be set in .env');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `Academic Outlier <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${options.email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
