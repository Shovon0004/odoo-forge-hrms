const express = require('express');
const router = express.Router();
const {
  getAllocations,
  submitRequest,
  getRequests,
  reviewRequest
} = require('../controllers/timeOffController');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Leave allocations route
router.get('/allocations', protect, getAllocations);

// Leave requests routes
router.route('/requests')
  .get(protect, getRequests)
  .post(protect, upload.single('attachment'), submitRequest);

// Leave request approval/rejection (Admin/HR only)
router.put('/requests/:id/status', protect, restrictTo('Admin', 'HR'), reviewRequest);

module.exports = router;
