const express = require('express');
const connectDB = require('../config/db');

const router = express.Router();

// Get all the  orders
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const orders = await db.collection('orders').find().toArray();

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
);

module.exports = router;