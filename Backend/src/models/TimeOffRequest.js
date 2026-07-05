const { MongooseCompatibleModel, DataTypes, sequelize } = require('../config/sequelize');

class TimeOffRequest extends MongooseCompatibleModel {}

TimeOffRequest.init({
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => require('crypto').randomBytes(12).toString('hex')
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.employee_assoc !== undefined ? this.employee_assoc : this.getDataValue('employee_id');
    }
  },
  time_off_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  allocation_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  remarks: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  attachment_url: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  },
  comments: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'TimeOffRequest',
  tableName: 'time_off_requests',
  timestamps: false
});

module.exports = TimeOffRequest;
