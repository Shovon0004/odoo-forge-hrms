require('dotenv').config();
const connectDB = require('../src/config/db');
const { generateEmployeeId } = require('../src/utils/idGenerator');

async function testGenerator() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('\nGenerating first ID...');
    const id1 = await generateEmployeeId('OdooP', 'SHOVON HALDER', '178e05124732afc97dd563b3');
    console.log('Generated ID 1:', id1);

    console.log('\nGenerating second ID...');
    // Since there are no employees in '178e05124732afc97dd563b3' in the database, the serial count starts at 1 (serial 0001).
    // But the database already contains OISHHA20260001 (which belongs to '6443706c38bb992fab659d69').
    // So the first ID generated above should detect the collision with the existing OISHHA20260001 and increment the serial to 0002.
    // Let's verify if the first ID becomes OISHHA20260002!
    
  } catch (error) {
    console.error('Error during testing ID generator:', error);
  } finally {
    process.exit(0);
  }
}

testGenerator();
