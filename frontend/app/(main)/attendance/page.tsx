'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar as CalendarIcon } from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';

export default function AttendancePage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin' || user?.role === 'HR';
  
  const [currentDate, setCurrentDate] = useState('22/October 2023');

  if (!user) return null;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        {isAdmin && (
          <div className="relative w-full md:w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400" />
             </div>
             <input type="text" placeholder="Search employees..." className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none w-full shadow-sm" />
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Header Controls */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              <button className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-gray-300 shadow-sm bg-white">
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-800 font-medium">Date <span className="text-gray-400 ml-1 text-xs">▼</span></button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 border-l border-gray-300">Day</button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700 font-semibold">
            <CalendarIcon className="w-4 h-4 text-pink-600" />
            <span>{currentDate}</span>
          </div>
        </div>

        {isAdmin ? (
          // Admin View - List of all employees
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Emp</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Check In</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Check Out</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Work Hours</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Extra Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50/80 transition-colors text-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={emp.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=fce7f3&color=db2777`} 
                          alt={emp.name}
                          className="w-8 h-8 rounded-full border border-gray-200"
                        />
                        <span className="font-medium text-gray-900">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">10:00 AM</td>
                    <td className="px-6 py-4 font-medium">07:00 PM</td>
                    <td className="px-6 py-4 font-semibold text-pink-600">09:00</td>
                    <td className="px-6 py-4 font-semibold text-green-600">01:00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Employee View - Self records
          <div className="overflow-x-auto">
            <div className="flex flex-wrap gap-4 p-5 border-b border-gray-100 text-sm bg-gray-50/50">
               <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                 <span className="text-gray-600 font-medium">Days Present</span>
                 <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold text-xs">20</span>
               </div>
               <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                 <span className="text-gray-600 font-medium">Leaves Count</span>
                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-xs">2</span>
               </div>
               <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                 <span className="text-gray-600 font-medium">Total Working Days</span>
                 <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-bold text-xs">22</span>
               </div>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Check In</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Check Out</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Work Hours</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Extra Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[29, 28, 27, 26, 25].map(day => (
                  <tr key={day} className="hover:bg-gray-50/80 transition-colors text-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900">{day}/10/2023</td>
                    <td className="px-6 py-4">10:00 AM</td>
                    <td className="px-6 py-4">07:00 PM</td>
                    <td className="px-6 py-4 font-semibold text-pink-600">09:00</td>
                    <td className="px-6 py-4 font-semibold text-green-600">01:00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
