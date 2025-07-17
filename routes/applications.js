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

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Job = require('../models/Job');

// // @route   GET /api/applications/my-applications
// // @desc    Get all applications for employer's jobs
// // @access  Private (Employer only)
// router.get('/my-applications', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized - Only employers can view applications',
//       });
//     }

//     // Find jobs posted by the employer and populate applicants
//     const jobs = await Job.find({ postedBy: req.user._id })
//       .populate({
//         path: 'applicants',
//         select: 'name email role status', // include status if needed
//       })
//       .sort({ createdAt: -1 });

//     if (!jobs.length) {
//       return res.status(200).json({
//         success: true,
//         message: 'No jobs with applications found',
//         data: [],
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: jobs.length,
//       data: jobs,
//     });

//   } catch (err) {
//     console.error('Error fetching applications:', err.message);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// // @route   PUT /api/applications/:jobId/update-status/:applicantId
// // @desc    Update application status for a specific applicant
// // @access  Private (Employer only)
// router.put('/:jobId/update-status/:applicantId', auth, async (req, res) => {
//   const { jobId, applicantId } = req.params;
//   const { status } = req.body;

//   // Validate status input
//   const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
//   if (!status || !validStatuses.includes(status)) {
//     return res.status(400).json({
//       success: false,
//       message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
//     });
//   }

//   try {
//     // Confirm job ownership
//     const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found or unauthorized',
//       });
//     }

//     // Ensure applicant is part of the job's applicants
//     const applicantExists = job.applicants.some(app => app._id.equals(applicantId));
//     if (!applicantExists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Applicant not found for this job',
//       });
//     }

//     // Update the application status
//     const updatedJob = await Job.findOneAndUpdate(
//       { _id: jobId, 'applicants._id': applicantId },
//       { $set: { 'applicants.$.status': status } },
//       { new: true, runValidators: true }
//     ).populate('applicants', 'name email status');

//     res.status(200).json({
//       success: true,
//       message: 'Application status updated successfully',
//       data: {
//         jobId: updatedJob._id,
//         applicantId,
//         newStatus: status,
//       },
//     });

//   } catch (err) {
//     console.error('Error updating application status:', err.message);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');

// @route   POST /api/applications/one-click/:jobId
// @desc    One-Click Apply with autofill from user's profile
// @access  Private (Jobseeker only)
router.post('/one-click/:jobId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'jobseeker') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized - Only jobseekers can apply',
      });
    }

    const { jobId } = req.params;
    const user = await User.findById(req.user._id).select('name email resume');

    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: 'Resume not found in profile. Please upload your resume first.',
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if already applied
    const alreadyApplied = job.applicants.some(app => app._id.equals(req.user._id));
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job',
      });
    }

    // Add applicant with default status
    job.applicants.push({
      _id: req.user._id,
      name: user.name,
      email: user.email,
      resume: user.resume,
      status: 'pending',
    });

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Applied successfully using one-click apply',
    });

  } catch (err) {
    console.error('One-click apply error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

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

    const jobs = await Job.find({ postedBy: req.user._id })
      .populate({
        path: 'applicants._id',
        select: 'name email resume role',
      })
      .sort({ createdAt: -1 });

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

  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  try {
    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or unauthorized',
      });
    }

    const applicant = job.applicants.find(app => app._id.equals(applicantId));
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found for this job',
      });
    }

    applicant.status = status;
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: {
        jobId: job._id,
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
