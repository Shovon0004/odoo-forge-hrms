export type LeaveType = 'Casual Leave' | 'Earned Leave' | 'Half Pay Leave' | 'Restricted Holiday';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: LeaveType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  remarks?: string;
}

export interface LeaveBalance {
  casual: number;
  earned: number;
  halfPay: number;
  restricted: number;
}
