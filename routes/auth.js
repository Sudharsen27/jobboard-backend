// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// // ✅ Register Route
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body || {};

//     // Simple validation
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists with this email.' });
//     }

//     // Hash password and save user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Server error during registration.' });
//   }
// });

// // ✅ Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body || {};

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(200).json({
//       message: 'Login successful.',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error during login.' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ✅ Google Register/Login Route
router.post('/google-register', async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, password: '', role: 'user' }); // default role is 'user'
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Google login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Server error during Google authentication.' });
  }
});

module.exports = router;
