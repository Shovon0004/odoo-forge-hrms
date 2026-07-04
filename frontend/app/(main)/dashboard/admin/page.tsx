'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Clock, CalendarCheck, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Employees</p>
              <h4 className="text-2xl font-bold text-slate-900">142</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
              <h4 className="text-2xl font-bold text-slate-900">12</h4>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Present Today</p>
              <h4 className="text-2xl font-bold text-slate-900">128</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                     <tr>
                       <th className="px-4 py-3">Employee</th>
                       <th className="px-4 py-3">Type</th>
                       <th className="px-4 py-3">Dates</th>
                       <th className="px-4 py-3 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="border-b">
                       <td className="px-4 py-3 font-medium">John Employee</td>
                       <td className="px-4 py-3">Casual Leave</td>
                       <td className="px-4 py-3 text-slate-500">Oct 15 - Oct 16</td>
                       <td className="px-4 py-3 text-right flex justify-end space-x-2">
                         <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1 h-auto">
                           <CheckCircle className="w-5 h-5" />
                         </Button>
                         <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto">
                           <XCircle className="w-5 h-5" />
                         </Button>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">On Time</span>
                  <Badge variant="success">110</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Late</span>
                  <Badge variant="warning">18</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Absent</span>
                  <Badge variant="danger">14</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
