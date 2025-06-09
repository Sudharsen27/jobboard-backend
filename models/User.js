// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['seeker', 'employer'], default: 'seeker' }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['seeker', 'employer'], 
    default: 'seeker' 
  }
}, {
  timestamps: true  // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', userSchema);
