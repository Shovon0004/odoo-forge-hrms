const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: String, // format YYYY-MM-DD
    required: true
  },
  check_in: {
    type: Date,
    required: true
  },
  check_out: {
    type: Date,
    default: null
  },
  work_hours: {
    type: Number,
    default: 0
  },
  extra_hours: {
    type: Number,
    default: 0
  }
});

// Ensure a single attendance record per employee per date
AttendanceSchema.index({ employee_id: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
