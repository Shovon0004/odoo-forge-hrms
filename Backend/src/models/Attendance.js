const { MongooseCompatibleModel, DataTypes, sequelize } = require('../config/sequelize');

class Attendance extends MongooseCompatibleModel {}

Attendance.init({
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => require('crypto').randomBytes(12).toString('hex')
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const loaded = this.dataValues.employee_assoc;
      return loaded !== undefined ? loaded : this.getDataValue('employee_id');
    }
  },
  date: {
    type: DataTypes.STRING, // format YYYY-MM-DD
    allowNull: false
  },
  check_in: {
    type: DataTypes.DATE,
    allowNull: false
  },
  check_out: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  work_hours: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  extra_hours: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Attendance',
  tableName: 'attendances',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['employee_id', 'date']
    }
  ]
});

module.exports = Attendance;
