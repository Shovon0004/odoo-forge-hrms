import { create } from 'zustand';

interface Employee {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  department: string;
  location: string;
  role: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Half-day';
  avatar?: string;
  about?: string;
  skills?: { name: string; proficiency: string }[];
  certifications?: { name: string; issuedBy: string; issueDate: string }[];
}

interface HRState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  updateEmployeeStatus: (id: string, status: Employee['status']) => void;
  
  attendanceStats: {
    total: number;
    present: number;
    absent: number;
    late: number;
    leave: number;
  };
  setAttendanceStats: (stats: HRState['attendanceStats']) => void;
}

export const useHRStore = create<HRState>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
  updateEmployeeStatus: (id, status) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, status } : emp)
  })),
  
  attendanceStats: { total: 0, present: 0, absent: 0, late: 0, leave: 0 },
  setAttendanceStats: (stats) => set({ attendanceStats: stats }),
}));
