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

// Add a new lesson
router.post('/', async (req, res) => {
  try {
    const db = await connectDB();
    const lesson = req.body;
    const result = await db.collection('lessons').insertOne(lesson);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
