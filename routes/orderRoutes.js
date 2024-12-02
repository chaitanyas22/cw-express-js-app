const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const orders = await db.collection('orders').find().toArray();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  try {
    const db = await connectDB();
    const order = req.body;
    const result = await db.collection('orders').insertOne(order);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
