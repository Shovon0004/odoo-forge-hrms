require('dotenv').config();
const connectDB = require('../src/config/db');
const { changePassword } = require('../src/controllers/authController');
const Employee = require('../src/models/Employee');
const bcrypt = require('bcryptjs');

async function testController() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const email = 'shovonhalder00@gmail.com';
    const employee = await Employee.findOne({ email });
    if (!employee) {
      console.log('Employee not found!');
      return;
    }

    // Set password back to Password@123 first (known state)
    employee.password_hash = 'Password@123';
    await employee.save();
    console.log('\nReset password to: Password@123');

    // Mock Response object
    let statusVal = 200;
    let jsonResult = {};
    const res = {
      status(code) {
        statusVal = code;
        return this;
      },
      json(data) {
        jsonResult = data;
        return this;
      }
    };

    // Test case 1: camelCase parameters (oldPassword / newPassword)
    console.log('\n--- Testing with camelCase payload (oldPassword / newPassword) ---');
    const req = {
      user: { _id: employee._id },
      body: {
        oldPassword: 'Password@123',
        newPassword: 'NewPassword@123!'
      }
    };

    await changePassword(req, res);
    console.log('Response Status:', statusVal);
    console.log('Response JSON:', jsonResult);

    // Verify hash update
    const updatedEmployee = await Employee.findOne({ email });
    const isMatch = await bcrypt.compare('NewPassword@123!', updatedEmployee.password_hash);
    console.log('Does updated password match database hash?', isMatch);

  } catch (error) {
    console.error('Error during controller testing:', error);
  } finally {
    process.exit(0);
  }
}

testController();
