// // routes/applications.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Job = require('../models/Job');
// const User = require('../models/User');

// // Get all applications for employer's jobs
// router.get('/my-applications', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).send('Only employers can view applications');
//     }

//     const jobs = await Job.find({ postedBy: req.user._id })
//       .populate({
//         path: 'applicants',
//         select: 'name email' // Only get name and email of applicants
//       });

//     res.json(jobs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Update application status
// router.put('/:jobId/update-status/:applicantId', auth, async (req, res) => {
//   try {
//     const { jobId, applicantId } = req.params;
//     const { status } = req.body;

//     // Verify the employer owns the job
//     const job = await Job.findOne({ 
//       _id: jobId, 
//       postedBy: req.user._id 
//     });

//     if (!job) {
//       return res.status(404).send('Job not found or unauthorized');
//     }

//     // Update status (you might want to add an Application model for this)
//     // For simplicity, we'll just add a status field to the applicants array
//     await Job.updateOne(
//       { _id: jobId, 'applicants._id': applicantId },
//       { $set: { 'applicants.$.status': status } }
//     );

//     res.send('Status updated successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Job = require('../models/Job');

// // Get all applications for employer's jobs
// router.get('/my-applications', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).json({ 
//         success: false,
//         message: 'Unauthorized - Only employers can view applications' 
//       });
//     }

//     const jobs = await Job.find({ postedBy: req.user._id })
//       .populate({
//         path: 'applicants',
//         select: 'name email role'
//       })
//       .sort({ createdAt: -1 });

//     if (!jobs || jobs.length === 0) {
//       return res.status(200).json({ 
//         success: true,
//         message: 'No jobs with applications found',
//         data: [] 
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: jobs.length,
//       data: jobs
//     });

//   } catch (err) {
//     console.error('Error fetching applications:', err.message);
//     res.status(500).json({ 
//       success: false,
//       message: 'Server error'
//     });
//   }
// });

// // Update application status
// router.put('/:jobId/update-status/:applicantId', auth, async (req, res) => {
//   const { jobId, applicantId } = req.params;
//   const { status } = req.body;

//   // Basic validation
//   if (!status || !['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid status value'
//     });
//   }

//   try {
//     const job = await Job.findOne({ 
//       _id: jobId, 
//       postedBy: req.user._id 
//     });

//     if (!job) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Job not found or unauthorized' 
//       });
//     }

//     const applicantExists = job.applicants.some(app => app._id.equals(applicantId));
//     if (!applicantExists) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Applicant not found for this job' 
//       });
//     }

//     const updatedJob = await Job.findOneAndUpdate(
//       { _id: jobId, 'applicants._id': applicantId },
//       { $set: { 'applicants.$.status': status } },
//       { new: true, runValidators: true }
//     ).populate('applicants', 'name email');

//     res.status(200).json({
//       success: true,
//       message: 'Application status updated',
//       data: {
//         jobId: updatedJob._id,
//         applicantId,
//         newStatus: status
//       }
//     });

//   } catch (err) {
//     console.error('Error updating application status:', err.message);
//     res.status(500).json({ 
//       success: false,
//       message: 'Server error'
//     });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// @route   GET /api/applications/my-applications
// @desc    Get all applications for employer's jobs
// @access  Private (Employer only)
router.get('/my-applications', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized - Only employers can view applications',
      });
    }

    // Find jobs posted by the employer and populate applicants
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate({
        path: 'applicants',
        select: 'name email role status', // include status if needed
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(200).json({
        success: true,
        message: 'No jobs with applications found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });

  } catch (err) {
    console.error('Error fetching applications:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// @route   PUT /api/applications/:jobId/update-status/:applicantId
// @desc    Update application status for a specific applicant
// @access  Private (Employer only)
router.put('/:jobId/update-status/:applicantId', auth, async (req, res) => {
  const { jobId, applicantId } = req.params;
  const { status } = req.body;

  // Validate status input
  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  try {
    // Confirm job ownership
    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or unauthorized',
      });
    }

    // Ensure applicant is part of the job's applicants
    const applicantExists = job.applicants.some(app => app._id.equals(applicantId));
    if (!applicantExists) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found for this job',
      });
    }

    // Update the application status
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, 'applicants._id': applicantId },
      { $set: { 'applicants.$.status': status } },
      { new: true, runValidators: true }
    ).populate('applicants', 'name email status');

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: {
        jobId: updatedJob._id,
        applicantId,
        newStatus: status,
      },
    });

  } catch (err) {
    console.error('Error updating application status:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
