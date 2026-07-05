const { sequelize } = require('./sequelize');

// Import all models to ensure they are registered with Sequelize
const Employee = require('../models/Employee');
const Organization = require('../models/Organization');
const Attendance = require('../models/Attendance');
const SalarySettings = require('../models/SalarySettings');
const TimeOffAllocation = require('../models/TimeOffAllocation');
const TimeOffRequest = require('../models/TimeOffRequest');

const connectDB = async () => {
  try {
    // Set up associations centrally to avoid circular dependency issues
    Employee.belongsTo(Organization, { foreignKey: 'company_id', as: 'company_assoc' });
    Employee.belongsTo(Employee, { foreignKey: 'manager_id', as: 'manager_assoc' });
    
    Attendance.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee_assoc' });
    SalarySettings.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee_assoc' });
    TimeOffAllocation.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee_assoc' });
    TimeOffRequest.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee_assoc' });

    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize successfully.');

    // Automatically sync models to database (creates tables if they don't exist, alerts schema dynamically)
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL DB schemas synchronized successfully.');
  } catch (error) {
    console.error(`PostgreSQL Connection/Sync Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
