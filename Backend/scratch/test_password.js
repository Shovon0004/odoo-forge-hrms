require('dotenv').config();
const connectDB = require('../src/config/db');
const Employee = require('../src/models/Employee');
const bcrypt = require('bcryptjs');

async function testPassword() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const email = 'shovonhalder00@gmail.com';
    console.log(`Finding employee by email: ${email}`);
    const employee = await Employee.findOne({ email });
    if (!employee) {
      console.log('Employee not found!');
      return;
    }

    console.log('Current password hash:', employee.password_hash);

    const newPassword = 'Password@1234';
    console.log(`Setting new password: ${newPassword}`);
    employee.password_hash = newPassword;
    console.log('Is password_hash changed before save?', employee.changed('password_hash'));

    console.log('Saving employee...');
    await employee.save();

    console.log('Refetching employee from database...');
    const updatedEmployee = await Employee.findOne({ email });
    console.log('New password hash in DB:', updatedEmployee.password_hash);

    const isMatch = await bcrypt.compare(newPassword, updatedEmployee.password_hash);
    console.log(`Does new password match database hash? ${isMatch}`);

  } catch (error) {
    console.error('Error during testing password change:', error);
  } finally {
    process.exit(0);
  }
}

testPassword();
