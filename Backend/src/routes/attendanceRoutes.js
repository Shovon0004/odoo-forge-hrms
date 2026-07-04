const express = require('express');
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
} = require('../controllers/attendanceController');
const { protect, restrictTo } = require('../middleware/auth');

// Check-in and check-out routes
router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);

// Logs access
router.get('/my-attendance', protect, getMyAttendance);
router.get('/all', protect, restrictTo('Admin', 'HR'), getAllAttendance);

module.exports = router;
