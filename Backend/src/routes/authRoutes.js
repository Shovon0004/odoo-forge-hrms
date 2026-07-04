const express = require('express');
const router = express.Router();
const {
  signupOrg,
  signupEmployee,
  signin,
  verifyEmail,
  changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  validateOrgSignup,
  validateEmployeeSignup
} = require('../middleware/validate');

// Org & Admin Signup (multipart upload for company logo)
router.post('/signup-org', upload.single('logo'), validateOrgSignup, signupOrg);

// Employee activation signup
router.post('/signup-employee', validateEmployeeSignup, signupEmployee);

// Login
router.post('/signin', signin);

// Email verification
router.get('/verify/:token', verifyEmail);

// Change Password (requires protection)
router.post('/change-password', protect, changePassword);

module.exports = router;
