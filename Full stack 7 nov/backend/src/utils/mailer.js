const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async function sendWelcomeEmail(to, name) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Welcome to Property App',
    html: `<p>Hi ${name},</p><p>Welcome! Thanks for registering.</p>`
  });
  return info;
};
