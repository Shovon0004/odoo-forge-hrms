import axios from 'axios';
import { mockUsers, mockLeaveRequests, mockLeaveBalance, mockAttendanceRecords } from './mockData';

// Placeholder for future axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

const USE_MOCK = true;

// Auth
export const loginAPI = async (email: string, password: string) => {
  if (USE_MOCK) {
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return { data: { user, token: 'mock-token-123' } };
  }
  return api.post('/auth/login', { email, password });
};

// Leaves
export const getLeaves = async () => {
  if (USE_MOCK) return { data: mockLeaveRequests };
  return api.get('/leaves');
};

export const getLeaveBalance = async (userId: string) => {
  if (USE_MOCK) return { data: mockLeaveBalance };
  return api.get(`/leaves/balance/${userId}`);
};

export const applyLeave = async (leaveData: any) => {
  if (USE_MOCK) {
    return { data: { ...leaveData, id: Math.random().toString(), status: 'pending' } };
  }
  return api.post('/leaves', leaveData);
};

// Attendance
export const getAttendance = async () => {
  if (USE_MOCK) return { data: mockAttendanceRecords };
  return api.get('/attendance');
};

export default api;
