const nodemailer = require('nodemailer');

async function sendTestEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io', // Mailtrap SMTP server
            port: 2525, // Default Mailtrap port
            auth: {
                user: 'bc458efe799eff', // Replace with Mailtrap username
                pass: '63ce657b1f6a09'  // Replace with Mailtrap password
            },
            debug: true, // Enable debugging
            logger: true
        });

        const mailOptions = {
            from: 'ankita.modi@trreta.com', // Sender's email address
            to: to, // Receiver's email address
            subject: subject, // Email subject
            text: text // Plain text message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent=========================>:', info.messageId);
        return info.messageId;
    } catch (error) {
        console.error('Error sending email=========================>:', error);
        throw error;
    }
}

module.exports = sendTestEmail;