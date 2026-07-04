const mongoose = require('mongoose');

const SalarySettingsSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true
  },
  monthly_wage: {
    type: Number,
    required: [true, 'Monthly wage is required']
  },
  yearly_wage: {
    type: Number
  },
  working_days_per_week: {
    type: Number,
    default: 5
  },
  break_time_hours: {
    type: Number,
    default: 1
  },
  basic_salary: {
    type: Number
  },
  hra: {
    type: Number
  },
  standard_allowance: {
    type: Number
  },
  performance_bonus: {
    type: Number
  },
  lta: {
    type: Number
  },
  fixed_allowance: {
    type: Number
  },
  employee_pf: {
    type: Number
  },
  employer_pf: {
    type: Number
  },
  professional_tax: {
    type: Number,
    default: 200
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

SalarySettingsSchema.pre('save', function() {
  if (this.isModified('monthly_wage')) {
    const basic = this.monthly_wage * 0.50; // 50% Basic
    this.basic_salary = basic;
    this.hra = basic * 0.50; // HRA: 50% of Basic
    this.standard_allowance = Math.round((this.monthly_wage * 0.0833) * 100) / 100; // 8.33%
    this.performance_bonus = Math.round((this.monthly_wage * 0.0583) * 100) / 100; // 5.83%
    this.lta = Math.round((this.monthly_wage * 0.0583) * 100) / 100; // LTA: 5.83%
    
    // PF: 12% of Basic
    const pf = Math.round((basic * 0.12) * 100) / 100;
    this.employee_pf = pf;
    this.employer_pf = pf;
    
    // Professional Tax: fixed 200
    this.professional_tax = 200.00;
    
    // Fixed Allowance = monthly_wage - (Basic + HRA + Std + Bonus + LTA + Employer PF + Professional Tax)
    const totalDeductedComponents = basic + this.hra + this.standard_allowance + this.performance_bonus + this.lta + this.employer_pf + this.professional_tax;
    let fixed = this.monthly_wage - totalDeductedComponents;
    if (fixed < 0) fixed = 0;
    this.fixed_allowance = Math.round(fixed * 100) / 100;
  }
  
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('SalarySettings', SalarySettingsSchema);
