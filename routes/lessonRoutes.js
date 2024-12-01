const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const lessons = await db.collection('lessons').find().toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;