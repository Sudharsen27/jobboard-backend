// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Or use 'SendGrid', 'Mailgun', etc.
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   try {
//     const mailOptions = {
//       from: `"JobBoard" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${to}`);
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//   }
// };

// module.exports = sendEmail;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"JobBoard" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;

//http://localhost:5000/test-email