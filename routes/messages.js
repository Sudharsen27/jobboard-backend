// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Message = require('../models/Message');

// // Get all messages for a chat room based on roomId format: jobId-user1-user2
// router.get('/:roomId', async (req, res) => {
//   try {
//     const [jobId, user1, user2] = req.params.roomId.split('-');

//     // ✅ Validate jobId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(jobId)) {
//       return res.status(400).json({ error: 'Invalid jobId format in roomId' });
//     }

//     const messages = await Message.find({
//       jobId: new mongoose.Types.ObjectId(jobId),
//       $or: [
//         { senderId: user1, receiverId: user2 },
//         { senderId: user2, receiverId: user1 },
//       ],
//     }).sort({ createdAt: 1 }); // Optional: use timestamp if you're storing it

//     res.json(messages);
//   } catch (err) {
//     console.error('❌ Error fetching messages:', err);
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages for a chat room based on roomId format: jobId-user1-user2
router.get('/:roomId', async (req, res) => {
  try {
    const [jobId, user1, user2] = req.params.roomId.split('-');

    const messages = await Message.find({
      jobId: jobId, // ✅ Use as string
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ timestamp: 1 }); // ✅ Use correct field name here

    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
