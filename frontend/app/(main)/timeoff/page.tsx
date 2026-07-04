'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import { Search, CheckCircle, XCircle, FileText, Calendar, Plus } from 'lucide-react';
import { mockLeaveRequests } from '@/lib/mockData';

export default function TimeOffPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin' || user?.role === 'HR';
  
  const [activeTab, setActiveTab] = useState<'Paid Time off' | 'Sick time off'>('Paid Time off');
  const [showModal, setShowModal] = useState(false);

  if (!user) return null;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Time Off</h1>
        {isAdmin ? (
          <div className="relative w-full md:w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400" />
             </div>
             <input type="text" placeholder="Search requests..." className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none w-full shadow-sm" />
          </div>
        ) : (
          <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>NEW REQUEST</span>
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm min-h-[500px]">
        {isAdmin ? (
          // Admin View - Leave Requests Table
          <div>
            <div className="flex space-x-2 border-b border-gray-100 bg-gray-50/50 px-2 pt-2">
              <button className="px-6 py-3 text-sm font-semibold text-pink-600 border-b-2 border-pink-600">Requests</button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">History</button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl">
                 <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-pink-600 font-semibold mb-1 flex items-center space-x-2">
                       <Calendar className="w-4 h-4" />
                       <span>Pending Requests</span>
                    </div>
                    <div className="text-gray-900 text-3xl font-bold mt-2">12</div>
                 </div>
                 <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="text-green-600 font-semibold mb-1 flex items-center space-x-2">
                       <CheckCircle className="w-4 h-4" />
                       <span>Approved Today</span>
                    </div>
                    <div className="text-gray-900 text-3xl font-bold mt-2">04</div>
                 </div>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">Employee</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Duration</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockLeaveRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="font-semibold text-gray-900">{req.employeeName}</div>
                           <div className="text-xs text-gray-500">ID: EMP-00{req.id}</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-gray-900 font-medium">{req.startDate}</div>
                           <div className="text-gray-500 text-xs">to {req.endDate}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-pink-600">{req.type}</td>
                        <td className="px-6 py-4">
                           {req.status === 'Pending' ? (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-yellow-200">Pending</span>
                           ) : req.status === 'Approved' ? (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-200">Approved</span>
                           ) : (
                              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-red-200">Rejected</span>
                           )}
                        </td>
                        <td className="px-6 py-4">
                          {req.status === 'Pending' ? (
                            <div className="flex space-x-2">
                              <button className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-colors" title="Approve">
                                 <CheckCircle className="w-5 h-5" />
                              </button>
                              <button className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors" title="Reject">
                                 <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                             <span className="text-gray-400 text-xs">Resolved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // Employee View - Allocations & Calendar
          <div>
            <div className="flex space-x-2 border-b border-gray-100 bg-gray-50/50 px-2 pt-2">
              <button 
                onClick={() => setActiveTab('Paid Time off')}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'Paid Time off' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Paid Time off
              </button>
              <button 
                onClick={() => setActiveTab('Sick time off')}
                className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'Sick time off' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Sick time off
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center space-x-8 mb-12 border-b border-gray-100 pb-8">
                 <div className="text-center bg-gray-50 border border-gray-200 rounded-2xl p-6 min-w-[200px]">
                    <div className="text-5xl font-extrabold text-gray-900">{activeTab === 'Paid Time off' ? '24' : '03'}</div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">Days Available</div>
                 </div>
                 <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Total Annual Allowance: {activeTab === 'Paid Time off' ? '30' : '10'} days</p>
                    <p className="flex items-center"><FileText className="w-4 h-4 mr-2 text-blue-500" /> Used this year: {activeTab === 'Paid Time off' ? '6' : '7'} days</p>
                 </div>
              </div>
              
              {/* Dummy Calendar Grid */}
              <h3 className="font-bold text-gray-900 mb-4">Upcoming Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                 {[1, 2, 3].map(month => (
                   <div key={month} className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-48 flex flex-col items-center justify-center text-gray-400">
                      <Calendar className="w-8 h-8 mb-2 opacity-50" />
                      <span className="font-medium">No leaves scheduled</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl max-w-3xl">
         <div className="flex items-center space-x-2 text-blue-800 font-bold mb-2">
            <span className="bg-blue-200 text-blue-900 text-xs px-2 py-0.5 rounded-full">INFO</span>
            <span>Policy Note</span>
         </div>
         <p className="text-sm text-blue-700 leading-relaxed">
           Employees can view only their own time off records and balances. Administrators and HR personnel have access to the global request queue where they can review, approve, or reject pending applications from all staff members.
         </p>
      </div>

      {/* New Time Off Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
               <h3 className="text-xl font-bold text-gray-900">New Leave Request</h3>
               <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors bg-white rounded-full p-1 border border-gray-200">
                 <XCircle className="w-5 h-5" />
               </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm">
               
               <div>
                 <label className="block text-gray-700 font-medium mb-1.5">Employee Name</label>
                 <input type="text" value={user.name} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed" />
               </div>

               <div>
                 <label className="block text-gray-700 font-medium mb-1.5">Leave Type <span className="text-red-500">*</span></label>
                 <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500">
                   <option>Paid Time Off</option>
                   <option>Sick Leave</option>
                   <option>Unpaid Leave</option>
                   <option>Maternity/Paternity Leave</option>
                 </select>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-gray-700 font-medium mb-1.5">Start Date <span className="text-red-500">*</span></label>
                   <input type="date" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
                 </div>
                 <div>
                   <label className="block text-gray-700 font-medium mb-1.5">End Date <span className="text-red-500">*</span></label>
                   <input type="date" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
                 </div>
               </div>

               <div>
                 <label className="block text-gray-700 font-medium mb-1.5">Duration</label>
                 <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-semibold">
                   1.00 <span className="text-gray-500 font-normal ml-1">Days (Auto-calculated)</span>
                 </div>
               </div>

               <div>
                 <label className="block text-gray-700 font-medium mb-1.5">Reason / Comments</label>
                 <textarea rows={3} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none" placeholder="Provide a brief reason for your leave request..."></textarea>
               </div>

               <div>
                 <label className="block text-gray-700 font-medium mb-1.5">Attachments (Optional)</label>
                 <div className="flex items-center">
                    <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition-colors" />
                 </div>
                 <p className="text-xs text-gray-500 mt-1">Medical certificates are required for sick leaves exceeding 2 days.</p>
               </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
               <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm" onClick={() => setShowModal(false)}>Cancel</button>
               <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm" onClick={() => setShowModal(false)}>Submit Request</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
