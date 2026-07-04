'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { getLeaveBalance } from '@/lib/api';
import { LeaveBalance } from '@/types/leave';
import { Calendar, Sun, Snowflake, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function EmployeeDashboard() {
  const [balance, setBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    getLeaveBalance('emp1').then((res) => setBalance(res.data));
  }, []);

  if (!balance) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Casual Leave"
          value={balance.casual}
          total={12}
          icon={Sun}
          colorClass="text-blue-500"
        />
        <StatCard
          title="Earned Leave"
          value={balance.earned}
          total={15}
          icon={Calendar}
          colorClass="text-green-500"
        />
        <StatCard
          title="Half Pay Leave"
          value={balance.halfPay}
          total={10}
          icon={AlertCircle}
          colorClass="text-yellow-500"
        />
        <StatCard
          title="Restricted Holiday"
          value={balance.restricted}
          total={2}
          icon={Snowflake}
          colorClass="text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Applications</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {/* Mock Data for recent leaves */}
               <div className="flex items-center justify-between p-4 border rounded-lg">
                 <div>
                   <p className="font-medium text-slate-900">Casual Leave</p>
                   <p className="text-sm text-slate-500">Oct 15 - Oct 16, 2023</p>
                 </div>
                 <Badge variant="warning">Pending</Badge>
               </div>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                 <div>
                   <p className="font-medium text-slate-900">Earned Leave</p>
                   <p className="text-sm text-slate-500">Nov 20 - Nov 25, 2023</p>
                 </div>
                 <Badge variant="success">Approved</Badge>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Hierarchy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">M</div>
                 <div>
                   <p className="font-medium">Manager Name</p>
                   <p className="text-sm text-slate-500">Approver 1</p>
                 </div>
              </div>
              <div className="w-0.5 h-6 bg-slate-200 ml-5"></div>
              <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">H</div>
                 <div>
                   <p className="font-medium">HR Head</p>
                   <p className="text-sm text-slate-500">Approver 2</p>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
