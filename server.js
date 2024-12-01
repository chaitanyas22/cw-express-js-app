const express = require('express');
const connectDB = require('./config/db');


const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
