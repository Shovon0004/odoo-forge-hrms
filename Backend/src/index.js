const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const timeOffRoutes = require('./routes/timeOffRoutes');
const salaryRoutes = require('./routes/salaryRoutes');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows loading uploaded assets in frontend
  contentSecurityPolicy: false      // Allows inline scripts for the API documentation tester
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (Profile pictures, leave attachments & API client docs)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Mount API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/time-off', timeOffRoutes);
app.use('/api/v1/salary', salaryRoutes);

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HRMS Backend API is running successfully.'
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
