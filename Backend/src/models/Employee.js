const { MongooseCompatibleModel, DataTypes, sequelize } = require('../config/sequelize');
const bcrypt = require('bcryptjs');

class Employee extends MongooseCompatibleModel {
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password_hash);
  }
}

Employee.init({
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => require('crypto').randomBytes(12).toString('hex')
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_id: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const loaded = this.dataValues.company_assoc;
      return loaded !== undefined ? loaded : this.getDataValue('company_id');
    }
  },
  department: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  manager_id: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const loaded = this.dataValues.manager_assoc;
      return loaded !== undefined ? loaded : this.getDataValue('manager_id');
    }
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Absent'
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  verificationTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  marital_status: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  resume: {
    type: DataTypes.JSONB,
    defaultValue: {
      about: '',
      what_i_love_about_my_job: '',
      interests_and_hobbies: ''
    }
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  certifications: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
  timestamps: false,
  hooks: {
    beforeSave: async (employee) => {
      if (employee.changed('password_hash')) {
        const salt = await bcrypt.genSalt(10);
        employee.password_hash = await bcrypt.hash(employee.password_hash, salt);
      }
    }
  }
});

module.exports = Employee;
