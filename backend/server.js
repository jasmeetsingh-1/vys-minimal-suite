require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose'); // Will be used later with MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection - COMMENTED OUT (Using dummyData for now)
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((err) => console.error('MongoDB connection error:', err));

console.log('Using dummyData for development (MongoDB integration pending)');

// Import routes
const routes = require('./routes/routers');

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount all routes under /vys
app.use('/vys', routes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce Backend API is running' });
});

// Test route to verify /vys is working
app.get('/vys/test', (req, res) => {
  res.json({ message: 'VYS route is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 9944;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

