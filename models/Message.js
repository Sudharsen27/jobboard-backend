// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Message', messageSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  jobId: { type: String, required: true },         // Changed from ObjectId to String
  senderId: { type: String, required: true },      // Changed from ObjectId to String
  receiverId: { type: String, required: true },    // Changed from ObjectId to String
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
