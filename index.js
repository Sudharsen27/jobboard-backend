

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Routes
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');

// // App init
// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow React frontend to connect
//   credentials: true
// }));
// app.use(express.json()); // Parses incoming JSON
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// // ✅ API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);

// // ✅ MongoDB Connection & Server Start
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('✅ MongoDB connected successfully');
//   app.listen(process.env.PORT, () => {
//     console.log(`🚀 Server running on port ${process.env.PORT}`);
//   });
// })
// .catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Routes
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');

// // App init
// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow React frontend to connect
//   credentials: true,
// }));
// app.use(express.json()); // Parses incoming JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// // ✅ API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);

// // ✅ MongoDB Connection & Server Start
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//   });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true,               // Allow cookies and credentials
}));

app.use(express.json());            // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  next();
});
// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
