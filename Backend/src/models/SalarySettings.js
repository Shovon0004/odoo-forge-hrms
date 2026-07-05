const { MongooseCompatibleModel, DataTypes, sequelize } = require('../config/sequelize');

class SalarySettings extends MongooseCompatibleModel {}

SalarySettings.init({
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => require('crypto').randomBytes(12).toString('hex')
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    get() {
      const loaded = this.dataValues.employee_assoc;
      return loaded !== undefined ? loaded : this.getDataValue('employee_id');
    }
  },
  monthly_wage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  yearly_wage: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  working_days_per_week: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  break_time_hours: {
    type: DataTypes.FLOAT,
    defaultValue: 1
  },
  basic_salary: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  hra: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  standard_allowance: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  performance_bonus: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  lta: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  fixed_allowance: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  employee_pf: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  employer_pf: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  professional_tax: {
    type: DataTypes.FLOAT,
    defaultValue: 200
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'SalarySettings',
  tableName: 'salary_settings',
  timestamps: false,
  hooks: {
    beforeSave: (salary) => {
      if (salary.changed('monthly_wage')) {
        const basic = salary.monthly_wage * 0.50; // 50% Basic
        salary.basic_salary = basic;
        salary.hra = basic * 0.50; // HRA: 50% of Basic
        salary.standard_allowance = Math.floor(basic * 0.1667); // 16.67% of Basic (rounds to 4167 for 25k basic)
        salary.performance_bonus = Math.round((basic * 0.0833) * 100) / 100; // 8.33% of Basic (2082.50)
        salary.lta = Math.round((basic * 0.0833) * 100) / 100; // LTA: 8.33% of Basic (2082.50)
        
        // PF: 12% of Basic
        const pf = Math.round((basic * 0.12) * 100) / 100;
        salary.employee_pf = pf;
        salary.employer_pf = pf;
        
        // Professional Tax: fixed 200
        salary.professional_tax = 200.00;
        
        // Yearly Wage
        salary.yearly_wage = salary.monthly_wage * 12;
        
        // Fixed Allowance: 11.67% of Basic (rounds to 2918 for 25k basic)
        salary.fixed_allowance = Math.round((basic * 0.1167) * 100) / 100;
      }
      salary.updatedAt = new Date();
    }
  }
});

module.exports = SalarySettings;
