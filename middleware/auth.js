// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// module.exports = auth;

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization');

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'No token provided' });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Auth Error:', err.message);
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// module.exports = auth;


// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async function (req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id); // This 'id' must match what you encoded
//     if (!user) return res.status(401).json({ error: 'User not found' });

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // get token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;  // attach user to request object
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

