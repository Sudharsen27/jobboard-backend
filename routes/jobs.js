// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // GET all jobs
// router.get('/', async (req, res) => {
//   const jobs = await Job.find().populate('postedBy', 'name');
//   res.json(jobs);
// });

// // POST a new job
// router.post('/', auth, async (req, res) => {
//   if (req.user.role !== 'employer') return res.status(403).send('Only employers can post jobs');
//   const job = new Job({ ...req.body, postedBy: req.user._id });
//   await job.save();
//   res.send('Job Posted');
// });

// // APPLY to a job
// router.post('/:id/apply', auth, async (req, res) => {
//   const job = await Job.findById(req.params.id);
//   if (!job.applicants.includes(req.user._id)) {
//     job.applicants.push(req.user._id);
//     await job.save();
//   }
//   res.send('Applied');
// });

// module.exports = router;
// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload');


// const router = express.Router();

// // GET all jobs
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// // POST a new job (Only employer can post)
// router.post('/', auth, upload.single('pdf'), async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).send('Only employers can post jobs');
//     }

//     const { title, description, location, salary } = req.body;

//     if (!title || !description || !location) {
//       return res.status(400).send('Missing required fields');
//     }

//     const job = new Job({
//       title,
//       description,
//       location,
//       salary,
//       pdfUrl: req.file ? `/uploads/pdfs/${req.file.filename}` : null,
//       postedBy: req.user._id
//     });

//     await job.save();
//     res.status(201).send('Job Posted');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });


// // APPLY to a job
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     res.send('Applied');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // uses memory storage

// const router = express.Router();

// // GET all jobs
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// // POST a new job (PDF stored in MongoDB)
// router.post('/', auth, upload.single('pdf'), async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).send('Only employers can post jobs');
//     }

//     const { title, description, location, salary } = req.body;

//     if (!title || !description || !location) {
//       return res.status(400).send('Missing required fields');
//     }

//     const jobData = {
//       title,
//       description,
//       location,
//       salary,
//       postedBy: req.user._id
//     };

//     if (req.file) {
//       jobData.pdf = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype
//       };
//     }

//     const job = new Job(jobData);
//     await job.save();

//     res.status(201).send('Job Posted');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // APPLY to a job
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     res.send('Applied');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // GET PDF for a job
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

//     res.contentType(job.pdf.contentType);
//     res.send(job.pdf.data);
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer with memory storage

// const router = express.Router();

// // GET all jobs
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// // POST a new job (PDF stored in MongoDB)
// router.post('/', auth, upload.single('pdf'), async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).send('Only employers can post jobs');
//     }

//     const { title, description, location, salary } = req.body;

//     if (!title || !description || !location) {
//       return res.status(400).send('Missing required fields');
//     }

//     const jobData = {
//       title,
//       description,
//       location,
//       salary,
//       postedBy: req.user._id
//     };

//     if (req.file) {
//       jobData.pdf = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype
//       };
//     }

//     const job = new Job(jobData);
//     await job.save();

//     res.status(201).send('Job Posted');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // APPLY to a job
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     res.send('Applied');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // GET PDF for a job
// // GET PDF for a job (with download header)
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

//     // Set headers to force file download
//     res.set({
//       'Content-Type': job.pdf.contentType,
//       'Content-Disposition': 'attachment; filename="job-description.pdf"',
//     });

//     res.send(job.pdf.data);
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Server error');
//   }
// });


// module.exports = router;

const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // multer with memory storage

const router = express.Router();

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs
 */
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name');
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST /api/jobs
 * @desc    Post a new job (employers only)
 */
router.post('/', auth, upload.single('pdf'), async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).send('Only employers can post jobs');
    }

    const { title, description, location, salary } = req.body;

    if (!title || !description || !location) {
      return res.status(400).send('Missing required fields');
    }

    const jobData = {
      title,
      description,
      location,
      salary,
      postedBy: req.user._id
    };

    if (req.file) {
      jobData.pdf = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const job = new Job(jobData);
    await job.save();

    res.status(201).send('Job posted successfully');
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST /api/jobs/:id/apply
 * @desc    Apply to a job
 */
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');

    if (!job.applicants.includes(req.user._id)) {
      job.applicants.push(req.user._id);
      await job.save();
    }

    res.send('Successfully applied to the job');
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET /api/jobs/:id/pdf
 * @desc    Download job PDF
 */
router.get('/:id/pdf', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.pdf || !job.pdf.data) {
      return res.status(404).send('PDF not found');
    }

    res.set({
      'Content-Type': job.pdf.contentType,
      'Content-Disposition': 'attachment; filename="job-description.pdf"',
    });

    res.send(job.pdf.data);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
