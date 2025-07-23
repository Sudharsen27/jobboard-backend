const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/mailer');

// Optional GET route for browser test
router.get('/', (req, res) => {
  res.send('📬 Contact API is working. Use POST to send messages.');
});

// POST route to handle contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const subject = `📩 New Contact Message from ${name}`;
  const text = `
You have received a new message from the JobBoard contact form.

Name: ${name}
Email: ${email}

Message:
${message}
  `;

  try {
    await sendEmail(process.env.EMAIL_USER, subject, text);
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
