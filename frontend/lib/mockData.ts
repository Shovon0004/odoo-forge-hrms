export const mockEmployees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+1 234 567 8900',
    department: 'Engineering',
    location: 'New York',
    role: 'Employee',
    status: 'Present',
    avatar: 'https://i.pravatar.cc/150?u=EMP001',
    designation: 'Senior Frontend Developer',
    about: 'Passionate frontend developer with 5+ years of experience in React and Next.js.',
    skills: [
      { name: 'React', proficiency: 'Advanced' },
      { name: 'TypeScript', proficiency: 'Advanced' },
      { name: 'Tailwind CSS', proficiency: 'Intermediate' }
    ],
    certifications: [
      { name: 'AWS Certified Cloud Practitioner', issuedBy: 'AWS', issueDate: '2023-01-15' }
    ]
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    email: 'admin@hackathon.com',
    mobile: '+1 987 654 3210',
    department: 'Human Resources',
    location: 'London',
    role: 'Admin',
    status: 'Leave',
    avatar: 'https://i.pravatar.cc/150?u=EMP002',
    designation: 'HR Manager',
    about: 'Dedicated HR professional focusing on employee engagement and talent acquisition.',
  },
  {
    id: 'EMP003',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    department: 'Design',
    location: 'Remote',
    role: 'Employee',
    status: 'Present',
    avatar: 'https://i.pravatar.cc/150?u=EMP003',
    designation: 'UI/UX Designer',
  },
  {
    id: 'EMP004',
    name: 'Bob Brown',
    email: 'bob@example.com',
    department: 'Marketing',
    location: 'San Francisco',
    role: 'Employee',
    status: 'Absent',
    designation: 'Marketing Specialist',
  }
];

export const mockLeaveRequests = [
  {
    id: 'LR001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    type: 'Casual Leave',
    startDate: '2026-10-15',
    endDate: '2026-10-16',
    status: 'Pending',
    remarks: 'Personal errands'
  },
  {
    id: 'LR002',
    employeeId: 'EMP003',
    employeeName: 'Alice Johnson',
    type: 'Sick Leave',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    status: 'Approved',
    remarks: 'Fever'
  }
];

export const mockSalaryComponents = {
  baseSalary: 60000,
  houseRentAllowance: 12000,
  medicalAllowance: 5000,
  specialAllowance: 15000,
  providentFund: 3600,
  tax: 5000,
};
