const express = require('express');
const router = express.Router();
const {
  onboardEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeProfile,
  addSkill,
  deleteSkill,
  addCertification,
  deleteCertification
} = require('../controllers/employeeController');
const { protect, restrictTo } = require('../middleware/auth');
const { validateEmployeeOnboard } = require('../middleware/validate');
const upload = require('../middleware/upload');

// Base routes
router.route('/')
  .get(protect, getEmployees)
  .post(protect, restrictTo('Admin', 'HR'), validateEmployeeOnboard, onboardEmployee);

// Route for specific employee
router.route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, upload.single('profilePicture'), updateEmployeeProfile);

// Skills sub-routes
router.route('/:id/skills')
  .post(protect, addSkill);
router.route('/:id/skills/:skillName')
  .delete(protect, deleteSkill);

// Certifications sub-routes
router.route('/:id/certifications')
  .post(protect, addCertification);
router.route('/:id/certifications/:certName')
  .delete(protect, deleteCertification);

module.exports = router;
