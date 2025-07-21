// // GET /api/dashboard/employer/:id/category-stats
// const express = require('express');
// const router = express.Router();
// const Job = require('../models/Job');

// router.get('/employer/:id/category-stats', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await Job.aggregate([
//       { $match: { postedBy: id } },
//       {
//         $group: {
//           _id: '$category',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     const formatted = result.map(item => ({
//       category: item._id,
//       count: item.count
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error('Error in category stats:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Job = require('../models/Job');

router.get('/employer/:id/category-stats', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Job.aggregate([
      { $match: { postedBy: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = result.map(item => ({
      category: item._id,
      count: item.count
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error in category stats:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
