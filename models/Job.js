// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   title: String,
//   company: String,
//   location: String,
//   description: String,
//   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Job', jobSchema);
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pdf: {
    data: Buffer,         // Store PDF as binary data
    contentType: String   // Store MIME type (should be 'application/pdf')
  }
});

module.exports = mongoose.model('Job', jobSchema);

