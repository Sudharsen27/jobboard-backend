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

// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer with memory storage

// const router = express.Router();

// /**
//  * @route   GET /api/jobs
//  * @desc    Get all jobs
//  */
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @route   POST /api/jobs
//  * @desc    Post a new job (employers only)
//  */
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

//     res.status(201).send('Job posted successfully');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @route   POST /api/jobs/:id/apply
//  * @desc    Apply to a job
//  */
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     res.send('Successfully applied to the job');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @route   GET /api/jobs/:id/pdf
//  * @desc    Download job PDF
//  */
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

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

// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer with memory storage
// const sendEmail = require('../utils/mailer');
// const { authenticateToken } = require('../middleware/auth');

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Jobs
//  *   description: Job management and application endpoints
//  */

// /**
//  * @swagger
//  * /api/jobs:
//  *   get:
//  *     summary: Get all job listings
//  *     tags: [Jobs]
//  *     responses:
//  *       200:
//  *         description: A list of jobs
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Job'
//  */
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @swagger
//  * /api/jobs:
//  *   post:
//  *     summary: Post a new job (employers only)
//  *     tags: [Jobs]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               salary:
//  *                 type: string
//  *               pdf:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       201:
//  *         description: Job posted successfully
//  */
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

//     res.status(201).send('Job posted successfully');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @swagger
//  * /api/jobs/{id}/apply:
//  *   post:
//  *     summary: Apply to a job
//  *     tags: [Jobs]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Job ID
//  *     responses:
//  *       200:
//  *         description: Successfully applied to the job
//  *       404:
//  *         description: Job not found
//  */
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     res.send('Successfully applied to the job');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// /**
//  * @swagger
//  * /api/jobs/{id}/pdf:
//  *   get:
//  *     summary: Download job PDF
//  *     tags: [Jobs]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Job ID
//  *     responses:
//  *       200:
//  *         description: PDF file returned
//  *         content:
//  *           application/pdf:
//  *             schema:
//  *               type: string
//  *               format: binary
//  *       404:
//  *         description: PDF not found
//  */
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

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

// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id).populate('postedBy', 'email name');
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     // Email to Applicant
//     await sendEmail(
//       req.user.email,
//       'Your Job Application is Confirmed',
//       `Hi ${req.user.name}, you have successfully applied for "${job.title}" at ${job.postedBy.name}.`
//     );

//     // Email to Employer
//     await sendEmail(
//       job.postedBy.email,
//       'New Application Received',
//       `${req.user.name} has applied for your job post "${job.title}".`
//     );

//     res.send('Successfully applied to the job');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer for file upload
// const sendEmail = require('../utils/mailer');

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Jobs
//  *   description: Job management and application endpoints
//  */

// // ✅ Public: Get all job listings
// /**
//  * @swagger
//  * /api/jobs:
//  *   get:
//  *     summary: Get all job listings
//  *     tags: [Jobs]
//  *     responses:
//  *       200:
//  *         description: A list of jobs
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Job'
//  */
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Protected: Post a new job (employers only)
// /**
//  * @swagger
//  * /api/jobs:
//  *   post:
//  *     summary: Post a new job (employers only)
//  *     tags: [Jobs]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               salary:
//  *                 type: string
//  *               pdf:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       201:
//  *         description: Job posted successfully
//  */
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
//       postedBy: req.user._id,
//     };

//     if (req.file) {
//       jobData.pdf = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       };
//     }

//     const job = new Job(jobData);
//     await job.save();

//     res.status(201).send('Job posted successfully');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Protected: Apply to a job
// /**
//  * @swagger
//  * /api/jobs/{id}/apply:
//  *   post:
//  *     summary: Apply to a job
//  *     tags: [Jobs]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Job ID
//  *     responses:
//  *       200:
//  *         description: Successfully applied to the job
//  *       404:
//  *         description: Job not found
//  */
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id).populate('postedBy', 'email name');
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     // Email to Applicant
//     await sendEmail(
//       req.user.email,
//       'Your Job Application is Confirmed',
//       `Hi ${req.user.name}, you have successfully applied for "${job.title}" at ${job.postedBy.name}.`
//     );

//     // Email to Employer
//     await sendEmail(
//       job.postedBy.email,
//       'New Application Received',
//       `${req.user.name} has applied for your job post "${job.title}".`
//     );

//     res.send('Successfully applied to the job');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Public: Download job PDF
// /**
//  * @swagger
//  * /api/jobs/{id}/pdf:
//  *   get:
//  *     summary: Download job PDF
//  *     tags: [Jobs]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Job ID
//  *     responses:
//  *       200:
//  *         description: PDF file returned
//  *         content:
//  *           application/pdf:
//  *             schema:
//  *               type: string
//  *               format: binary
//  *       404:
//  *         description: PDF not found
//  */
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

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

// const express = require('express');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer for file upload
// const sendEmail = require('../utils/mailer');

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Jobs
//  *   description: Job management and application endpoints
//  */

// // ✅ Public: Get all job listings
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'name');
//     res.json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Protected: Post a new job (employers only)
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
//       postedBy: req.user._id,
//     };

//     if (req.file) {
//       jobData.pdf = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       };
//     }

//     const job = new Job(jobData);
//     await job.save();

//     res.status(201).send('Job posted successfully');
//   } catch (error) {
//     console.error('Error posting job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Protected: Apply to a job
// router.post('/:id/apply', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id).populate('postedBy', 'email name');
//     if (!job) return res.status(404).send('Job not found');

//     if (!job.applicants.includes(req.user._id)) {
//       job.applicants.push(req.user._id);
//       await job.save();
//     }

//     // Send confirmation email to applicant
//     await sendEmail(
//       req.user.email,
//       'Your Job Application is Confirmed',
//       `Hi ${req.user.name}, you have successfully applied for "${job.title}" at ${job.postedBy.name}.`
//     );

//     // Notify the employer
//     await sendEmail(
//       job.postedBy.email,
//       'New Application Received',
//       `${req.user.name} has applied for your job post "${job.title}".`
//     );

//     res.send('Successfully applied to the job');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     res.status(500).send('Server error');
//   }
// });

// // ✅ Public: Download job PDF
// router.get('/:id/pdf', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job || !job.pdf || !job.pdf.data) {
//       return res.status(404).send('PDF not found');
//     }

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

// // ✅ Protected: Get jobs posted by the current employer
// router.get('/my-jobs', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'employer') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
//     res.json(jobs);
//   } catch (err) {
//     console.error('Error fetching my-jobs:', err.message);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const sendEmail = require('../utils/mailer');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management and application endpoints
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job listings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
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
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Post a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: string
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Job posted successfully
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
      postedBy: req.user._id,
    };

    if (req.file) {
      jobData.pdf = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
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
 * @swagger
 * /api/jobs/{id}/apply:
 *   post:
 *     summary: Apply to a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Successfully applied to the job
 */
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'email name');
    if (!job) return res.status(404).send('Job not found');

    if (!job.applicants.includes(req.user._id)) {
      job.applicants.push(req.user._id);
      await job.save();
    }

    await sendEmail(
      req.user.email,
      'Your Job Application is Confirmed',
      `Hi ${req.user.name}, you have successfully applied for "${job.title}" at ${job.postedBy.name}.`
    );

    await sendEmail(
      job.postedBy.email,
      'New Application Received',
      `${req.user.name} has applied for your job post "${job.title}".`
    );

    res.send('Successfully applied to the job');
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/jobs/{id}/pdf:
 *   get:
 *     summary: Download job PDF
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: PDF file download
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

/**
 * @swagger
 * /api/jobs/my-jobs:
 *   get:
 *     summary: Get jobs posted by current employer
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employer's jobs
 */
router.get('/my-jobs', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching my-jobs:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
