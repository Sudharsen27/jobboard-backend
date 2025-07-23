// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   await transporter.sendMail({
//     from: `"JobBoard" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password, NOT your actual Gmail password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"JobBoard" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
    throw err;
  }
};

module.exports = sendEmail;


//http://localhost:5000/test-email