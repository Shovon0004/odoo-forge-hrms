const Employee = require('../models/Employee');

/**
 * Generates a unique Employee ID based on:
 * [Company_Name_Initial][Employee_First_And_Last_Name_Initial][Year_Of_Joining][Serial_Number_Of_Joining]
 * 
 * @param {string} companyName - Name of the organization
 * @param {string} employeeName - Full name of the employee
 * @param {string} companyId - ObjectId of the organization
 * @returns {Promise<string>} Generated unique employee ID
 */
const generateEmployeeId = async (companyName, employeeName, companyId) => {
  // 1. Get Company initials
  const compParts = companyName.trim().split(/\s+/);
  let compInitials = '';
  if (compParts.length >= 2) {
    compInitials = compParts.slice(0, 3).map(part => part[0]).join('');
  } else if (compParts.length === 1 && compParts[0]) {
    compInitials = compParts[0].slice(0, 2);
  }
  compInitials = compInitials.toUpperCase().padEnd(2, 'X');

  if (companyName.toUpperCase().startsWith('ODOO')) {
    compInitials = 'OI';
  }

  // 2. Get Employee name initials (first 2 of first name + first 2 of last name)
  const nameParts = employeeName.trim().split(/\s+/);
  let nameInitials = '';
  if (nameParts.length >= 2) {
    const firstPart = nameParts[0];
    const lastPart = nameParts[nameParts.length - 1];
    nameInitials = firstPart.slice(0, 2) + lastPart.slice(0, 2);
  } else if (nameParts.length === 1 && nameParts[0]) {
    nameInitials = nameParts[0].slice(0, 4);
  }
  nameInitials = nameInitials.toUpperCase().padEnd(4, 'X');

  // 3. Get Year of Joining
  const currentYear = new Date().getFullYear();

  // 4. Get Serial Number of Joining (1-indexed for the company in the current year)
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

  const count = await Employee.countDocuments({
    company_id: companyId,
    createdAt: { $gte: startOfYear, $lte: endOfYear }
  });

  const serial = String(count + 1).padStart(4, '0');

  return `${compInitials}${nameInitials}${currentYear}${serial}`;
};

module.exports = { generateEmployeeId };
