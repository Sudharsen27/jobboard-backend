// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['seeker', 'employer'], default: 'seeker' }
// });

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, unique: true, required: true, lowercase: true, trim: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ['seeker', 'employer'], 
//     default: 'seeker' 
//   }
// }, {
//   timestamps: true  // adds createdAt and updatedAt fields automatically
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['seeker', 'employer'],
      default: 'seeker',
    },

    // ✅ New fields for One-Click Apply and Profile Info
    resume: {
      type: String, // URL to uploaded resume (Cloudinary, etc.)
      default: '',
    },

    skills: {
      type: [String], // Example: ['React', 'Node.js']
      default: [],
    },

    experience: {
      type: String, // Brief experience summary
      default: '',
    },

    avatar: {
      type: String, // Profile image URL
      default: '',
    },

    bio: {
      type: String, // Optional short bio
      default: '',
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
