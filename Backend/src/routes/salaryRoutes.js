const express = require('express');
const router = express.Router();
const { getSalary, updateSalary } = require('../controllers/salaryController');
const { protect, restrictTo } = require('../middleware/auth');

// Salary routes
router.route('/:employeeId')
  .get(protect, getSalary)
  .put(protect, restrictTo('Admin', 'HR'), updateSalary);

module.exports = router;
