const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['seeker', 'employer'], default: 'seeker' }
});

module.exports = mongoose.model('User', userSchema);
