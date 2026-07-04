export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'half-day';

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string; // ISO date string
  status: AttendanceStatus;
  checkIn?: string; // ISO datetime string
  checkOut?: string; // ISO datetime string
}
