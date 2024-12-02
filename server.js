const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

// Logger Middleware
function logger(req, res, next) {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
  next();
}

app.use(logger);  // Apply logger middleware globally
app.use(cors());
app.use(express.json());  // Parse JSON data

// Serve static files (lesson images)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Route to check if images are available
app.get('/api/lessons', (req, res) => {
  const lessons = [
    { id: 1, subject: 'Math', location: 'Hendon', price: 10, spaces: 5, icon: 'fas fa-calculator' },
        { id: 2, subject: 'Science', location: 'Golders Green', price: 15, spaces: 3, icon: 'fas fa-flask' },
        { id: 3, subject: 'English', location: 'Oxford Street', price: 12, spaces: 4, icon: 'fas fa-book' },
        { id: 4, subject: 'History', location: 'Wembley', price: 18, spaces: 6, icon: 'fas fa-landmark' },
        { id: 5, subject: 'Geography', location: 'East Ham', price: 14, spaces: 2, icon: 'fas fa-globe' },
        { id: 6, subject: 'Art', location: 'Hounslow', price: 20, spaces: 5, icon: 'fas fa-palette' },
        { id: 7, subject: 'Music', location: 'Chancery Lane', price: 25, spaces: 3, icon: 'fas fa-music' },
        { id: 8, subject: 'Swimming', location: 'Brent Cross', price: 30, spaces: 8, icon: 'fas fa-swimmer' },
        { id: 9, subject: 'French', location: 'North Finchley', price: 22, spaces: 7, icon: 'fas fa-language' },
        { id: 10, subject: 'Spanish', location: 'Mile Hill', price: 16, spaces: 4, icon: 'fas fa-language' },
        { id: 11, subject: 'Computer Science', location: 'Uxbridge', price: 35, spaces: 5, icon: 'fas fa-laptop-code' },
        { id: 12, subject: 'Drama', location: 'Kent', price: 17, spaces: 6, icon: 'fas fa-theater-masks' },
        { id: 13, subject: 'Physical Education', location: 'Colindale', price: 28, spaces: 10, icon: 'fas fa-futbol' },
        { id: 14, subject: 'Cooking', location: 'Kingsbury', price: 20, spaces: 4, icon: 'fas fa-utensils' },
        { id: 15, subject: 'Photography', location: 'Harrow', price: 40, spaces: 0, icon: 'fas fa-camera' },
  ];
  res.json(lessons);
});

// Middleware for error handling (if image does not exist)
app.use('/images/*', (req, res, next) => {
  const imagePath = path.join(__dirname, 'public', 'images', req.params[0]);

  // Check if the image file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  next();
});

// Sample route for placing an order
app.post('/api/order', (req, res) => {
  const { name, phone, lessonIds } = req.body;

  if (name && phone && lessonIds) {
    res.status(200).json({
      message: "Order submitted successfully",
      orderDetails: { name, phone, lessonIds }
    });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
