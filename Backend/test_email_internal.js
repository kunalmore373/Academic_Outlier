require('dotenv').config();
const sendEmail = require('./src/utils/email');

(async () => {
    console.log('Testing email with:', process.env.EMAIL_USER);
    try {
        await sendEmail({
            email: process.env.EMAIL_USER, // Send to self
            subject: 'Email Test',
            message: 'This is a test email from Academic Atelier.',
            html: '<h1>Test Successful</h1>'
        });
        console.log('SUCCESS: Email sent.');
    } catch (error) {
        console.error('FAILURE:', error);
    }
})();
