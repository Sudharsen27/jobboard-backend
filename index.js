

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

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Import routes
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // React frontend URL
//   credentials: true,               // Allow cookies and credentials
// }));

// app.use(express.json());            // Parse JSON bodies
// app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });
// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/uploads', express.static('uploads'));


// // Connect to MongoDB and start server
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//   });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Import routes
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');
// const applicationRoutes = require('./routes/applications'); // Add this line

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // React frontend URL
//   credentials: true,               // Allow cookies and credentials
// }));

// app.use(express.json());            // Parse JSON bodies
// app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// // Security headers adjustment
// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes); // Add this line
// app.use('/uploads', express.static('uploads'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


// // Connect to MongoDB and start server
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1); // Exit process with failure
//   });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   // Close server and exit process
//   server.close(() => process.exit(1));
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs'); // ✅ Already present
// const applicationRoutes = require('./routes/applications');

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);             // ✅ Correctly placed
// app.use('/api/applications', applicationRoutes);
// app.use('/uploads', express.static('uploads'));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Connect to MongoDB
// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Handle unhandled rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   process.exit(1);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const sendEmail = require('./utils/mailer');



// // Import Routes
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');
// const applicationRoutes = require('./routes/applications');

// // Initialize app
// const app = express();

// // Swagger Configuration
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'JobBoard API',
//       version: '1.0.0',
//       description: 'API documentation for the JobBoard Application',
//     },
//     servers: [
//       {
//         url: 'http://localhost:5000',
//         description: 'Local development server',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Path to route files for Swagger comments
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Remove problematic headers
// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/uploads', express.static('uploads'));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // MongoDB connection and server start
// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected successfully');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   process.exit(1);
// });

// app.get('/', (req, res) => {
//   res.send('🚀 JobBoard API is running. Visit /api-docs for API documentation.');
// });

// app.get('/test-email', async (req, res) => {
//   try {
//     await sendEmail(
//       'sundarlingam272000@gmail.com',      // to (receiver email)
//       'Test Email from JobBoard',           // subject
//       'This is a test email from JobBoard backend server.' // text content
//     );
//     res.send('📨 Email sent successfully!');
//   } catch (error) {
//     console.error('❌ Failed to send email:', error);
//     res.status(500).send('Email failed');
//   }
// });

// // http://localhost:5000/test-email

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // ⬅️ Needed for socket.io
const { Server } = require('socket.io');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const sendEmail = require('./utils/mailer');

// Import Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const messageRoutes = require('./routes/messages'); // ⬅️ Add your chat route here

const Message = require('./models/Message'); // ⬅️ Message model

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app); // ⬅️ Wrap Express in HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JobBoard API',
      version: '1.0.0',
      description: 'API documentation for the JobBoard Application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove problematic headers
app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/messages', messageRoutes); // ⬅️ Messaging route
app.use('/uploads', express.static('uploads'));

// Home and test-email route
app.get('/', (req, res) => {
  res.send('🚀 JobBoard API is running. Visit /api-docs for API documentation.');
});

app.get('/test-email', async (req, res) => {
  try {
    await sendEmail(
      'sundarlingam272000@gmail.com',
      'Test Email from JobBoard',
      'This is a test email from JobBoard backend server.'
    );
    res.send('📨 Email sent successfully!');
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    res.status(500).send('Email failed');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('⚡ New client connected:', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, senderId, receiverId, message, jobId }) => {
    const newMessage = new Message({
      jobId,
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    await newMessage.save();

    io.to(roomId).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
