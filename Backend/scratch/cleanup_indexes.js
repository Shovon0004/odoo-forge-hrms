require('dotenv').config();
const { sequelize } = require('../src/config/sequelize');

async function cleanupConstraints() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected.');

    // List of constraints to drop
    const constraintsToDrop = [
      // employee_id keys
      'employees_employee_id_key1',
      'employees_employee_id_key2',
      'employees_employee_id_key3',
      'employees_employee_id_key4',
      'employees_employee_id_key5',
      'employees_employee_id_key6',
      'employees_employee_id_key7',
      'employees_employee_id_key8',
      'employees_employee_id_key9',
      'employees_employee_id_key10',
      'employees_employee_id_key11',
      'employees_employee_id_key12',
      'employees_employee_id_key13',
      'employees_employee_id_key14',
      'employees_employee_id_key15',
      'employees_employee_id_key16',
      'employees_employee_id_key17',
      // email keys
      'employees_email_key1',
      'employees_email_key2',
      'employees_email_key3',
      'employees_email_key4',
      'employees_email_key5',
      'employees_email_key6',
      'employees_email_key7',
      'employees_email_key8',
      'employees_email_key9',
      'employees_email_key10',
      'employees_email_key11',
      'employees_email_key12',
      'employees_email_key13',
      'employees_email_key14',
      'employees_email_key15',
      'employees_email_key16',
      'employees_email_key17'
    ];

    for (const constraint of constraintsToDrop) {
      console.log(`Dropping constraint ${constraint} if exists...`);
      try {
        await sequelize.query(`ALTER TABLE employees DROP CONSTRAINT IF EXISTS "${constraint}" CASCADE`);
        console.log(`Dropped constraint ${constraint} successfully.`);
      } catch (err) {
        console.error(`Failed to drop constraint ${constraint}:`, err.message);
      }
    }

    console.log('\nCleanup complete!');

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    process.exit(0);
  }
}

cleanupConstraints();
