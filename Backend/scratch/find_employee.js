require('dotenv').config();
const connectDB = require('../src/config/db');
const Employee = require('../src/models/Employee');

async function testCount() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    console.log(`Year: ${currentYear}`);
    console.log(`Start of year: ${startOfYear}`);
    console.log(`End of year: ${endOfYear}`);

    const count = await Employee.countDocuments({
      company_id: '178e05124732afc97dd563b3',
      createdAt: { $gte: startOfYear, $lte: endOfYear }
    });

    console.log(`Count result: ${count}`);
    console.log(`Type of count: ${typeof count}`);

  } catch (error) {
    console.error('Error running countDocuments:', error);
  } finally {
    process.exit(0);
  }
}

testCount();
