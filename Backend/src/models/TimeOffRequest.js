const mongoose = require('mongoose');

const TimeOffRequestSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  time_off_type: {
    type: String,
    enum: ['Paid Time off', 'Sick Leave', 'Unpaid Leaves'],
    required: [true, 'Time off type is required']
  },
  start_date: {
    type: Date,
    required: [true, 'Start date is required']
  },
  end_date: {
    type: Date,
    required: [true, 'End date is required']
  },
  allocation_days: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    default: ''
  },
  attachment_url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  comments: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TimeOffRequest', TimeOffRequestSchema);
