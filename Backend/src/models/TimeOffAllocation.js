const { MongooseCompatibleModel, DataTypes, sequelize } = require('../config/sequelize');

class TimeOffAllocation extends MongooseCompatibleModel {}

TimeOffAllocation.init({
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
      return this.employee_assoc !== undefined ? this.employee_assoc : this.getDataValue('employee_id');
    }
  },
  paid_time_off_available: {
    type: DataTypes.INTEGER,
    defaultValue: 24
  },
  sick_time_off_available: {
    type: DataTypes.INTEGER,
    defaultValue: 7
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'TimeOffAllocation',
  tableName: 'time_off_allocations',
  timestamps: false,
  hooks: {
    beforeSave: (allocation) => {
      allocation.updatedAt = new Date();
    }
  }
});

module.exports = TimeOffAllocation;
