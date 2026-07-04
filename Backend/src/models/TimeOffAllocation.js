const mongoose = require('mongoose');

const TimeOffAllocationSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true
  },
  paid_time_off_available: {
    type: Number,
    default: 24
  },
  sick_time_off_available: {
    type: Number,
    default: 7
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TimeOffAllocation', TimeOffAllocationSchema);
