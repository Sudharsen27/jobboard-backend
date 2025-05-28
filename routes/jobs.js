const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'name');
  res.json(jobs);
});

// POST a new job
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).send('Only employers can post jobs');
  const job = new Job({ ...req.body, postedBy: req.user._id });
  await job.save();
  res.send('Job Posted');
});

// APPLY to a job
router.post('/:id/apply', auth, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job.applicants.includes(req.user._id)) {
    job.applicants.push(req.user._id);
    await job.save();
  }
  res.send('Applied');
});

module.exports = router;
