'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Edit2, Upload, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { mockEmployees } from '@/lib/mockData';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { user: currentUser } = useAuthStore();
  
  const [activeTab, setActiveTab] = useState<'Resume' | 'Private Info' | 'Security' | 'Salary Info'>('Resume');
  
  // Salary State
  const [monthWage, setMonthWage] = useState(50000);
  const [salaryComponents, setSalaryComponents] = useState({
    basicSalary: 0,
    hra: 0,
    standardAllowance: 0,
    performanceBonus: 0,
    leaveTravelAllowance: 0,
    fixedAllowance: 0,
    pfEmployee: 0,
    pfEmployer: 0,
    professionalTax: 200,
  });

  useEffect(() => {
    // Calculate components based on rules
    const basic = monthWage * 0.50;
    const hra = basic * 0.50;
    const stdAllowance = basic * 0.1667;
    const perfBonus = basic * 0.0833;
    const lta = basic * 0.0833;
    const pf = basic * 0.12;
    
    // Fixed allowance makes up the remainder
    const fixed = monthWage - (basic + hra + stdAllowance + perfBonus + lta);

    setSalaryComponents({
      basicSalary: basic,
      hra: hra,
      standardAllowance: stdAllowance,
      performanceBonus: perfBonus,
      leaveTravelAllowance: lta,
      fixedAllowance: fixed > 0 ? fixed : 0,
      pfEmployee: pf,
      pfEmployer: pf,
      professionalTax: 200,
    });
  }, [monthWage]);

  // Find employee or default to current user if "me"
  const employeeId = id === 'me' ? currentUser?.id : id;
  const employee = mockEmployees.find(emp => emp.id === employeeId);

  if (!employee) {
    return <div className="text-gray-500 p-8">Employee not found.</div>;
  }

  const isAdmin = currentUser?.role === 'Admin' || currentUser?.role === 'HR';
  const isSelf = currentUser?.id === employee.id;

  const tabs = ['Resume', 'Private Info'];
  
  if (isSelf) {
    tabs.push('Security');
  }
  
  if (isAdmin) {
    tabs.push('Salary Info');
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-8">
      
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 relative shadow-sm">
        {/* Edit Button */}
        {(isAdmin || isSelf) && (
          <button className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-colors border border-gray-200">
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        
        <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-6 md:space-y-0">
          <div className="relative group cursor-pointer shrink-0 mx-auto md:mx-0">
            <img 
              src={employee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}`} 
              alt={employee.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md"
            />
            {(isAdmin || isSelf) && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
               <div className="mt-6 grid grid-cols-2 gap-y-3 text-sm">
                 <div className="text-gray-500 font-medium">Login ID</div>
                 <div className="text-gray-800 font-semibold">{employee.id}</div>
                 
                 <div className="text-gray-500 font-medium">Email</div>
                 <div className="text-gray-800 font-semibold truncate" title={employee.email}>{employee.email}</div>
                 
                 <div className="text-gray-500 font-medium">Phone</div>
                 <div className="text-gray-800 font-semibold">{employee.mobile || 'N/A'}</div>
               </div>
            </div>
            
            <div className="md:mt-14 grid grid-cols-2 gap-y-3 text-sm">
                 <div className="text-gray-500 font-medium">Company</div>
                 <div className="text-gray-800 font-semibold">Odoo India</div>
                 
                 <div className="text-gray-500 font-medium">Department</div>
                 <div className="text-gray-800 font-semibold">{employee.department}</div>
                 
                 <div className="text-gray-500 font-medium">Manager</div>
                 <div className="text-gray-800 font-semibold">Super Admin</div>
                 
                 <div className="text-gray-500 font-medium">Location</div>
                 <div className="text-gray-800 font-semibold">{employee.location || 'HQ'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-4 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 min-h-[400px] shadow-sm">
        
        {/* Resume Tab */}
        {activeTab === 'Resume' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2 space-y-8">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex justify-between items-center">
                     About
                     {(isAdmin || isSelf) && <button className="text-gray-400 hover:text-pink-600"><Edit2 className="w-4 h-4" /></button>}
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed">{employee.about || 'No information provided.'}</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex justify-between items-center">
                     What I love about my job
                     {(isAdmin || isSelf) && <button className="text-gray-400 hover:text-pink-600"><Edit2 className="w-4 h-4" /></button>}
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed">I enjoy solving complex problems and collaborating with my amazing team.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex justify-between items-center">
                     My interests and hobbies
                     {(isAdmin || isSelf) && <button className="text-gray-400 hover:text-pink-600"><Edit2 className="w-4 h-4" /></button>}
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed">Reading tech blogs, playing chess, and hiking.</p>
                </div>
             </div>
             <div className="space-y-8">
                <div>
                   <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Skills</h3>
                      {(isAdmin || isSelf) && <button className="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 px-2 py-1 rounded">+ Add</button>}
                   </div>
                   <ul className="space-y-3">
                     {employee.skills?.map(skill => (
                       <li key={skill.name} className="flex justify-between items-center text-sm">
                         <span className="text-gray-800 font-medium">{skill.name}</span>
                         <span className="text-gray-500 bg-gray-50 px-2 py-0.5 rounded text-xs border border-gray-100">{skill.proficiency}</span>
                       </li>
                     ))}
                     {(!employee.skills || employee.skills.length === 0) && <li className="text-sm text-gray-400">No skills added.</li>}
                   </ul>
                </div>
                <div>
                   <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
                      {(isAdmin || isSelf) && <button className="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 px-2 py-1 rounded">+ Add</button>}
                   </div>
                   <ul className="space-y-4">
                     {employee.certifications?.map(cert => (
                       <li key={cert.name} className="text-sm border border-gray-100 p-3 rounded-lg bg-gray-50/50">
                         <div className="text-gray-900 font-semibold">{cert.name}</div>
                         <div className="text-gray-500 text-xs mt-1">{cert.issuedBy} • {cert.issueDate}</div>
                       </li>
                     ))}
                     {(!employee.certifications || employee.certifications.length === 0) && <li className="text-sm text-gray-400">No certifications added.</li>}
                   </ul>
                </div>
             </div>
           </div>
        )}

        {/* Private Info Tab */}
        {activeTab === 'Private Info' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
             <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-6">Personal Details</h3>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Date of Birth</span><span className="text-gray-900 font-semibold">1990-01-01</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Present Address</span><span className="text-gray-900 font-semibold">123 Main St, Cityville</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Nationality</span><span className="text-gray-900 font-semibold">American</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Personal Email</span><span className="text-gray-900 font-semibold">{employee.email}</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Gender</span><span className="text-gray-900 font-semibold">Male</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Marital Status</span><span className="text-gray-900 font-semibold">Single</span></div>
                <div className="grid grid-cols-2 items-center py-2"><span className="text-gray-500 font-medium">Date of Joining</span><span className="text-gray-900 font-semibold">2022-06-15</span></div>
             </div>
             <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-6">Bank Details</h3>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Account Number</span><span className="text-gray-900 font-semibold">**** 5678</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">Bank Name</span><span className="text-gray-900 font-semibold">Global Bank</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">IFSC Code</span><span className="text-gray-900 font-semibold">GLOB0001234</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">PAN No</span><span className="text-gray-900 font-semibold">ABCDE1234F</span></div>
                <div className="grid grid-cols-2 items-center py-2 border-b border-gray-50"><span className="text-gray-500 font-medium">UAN No</span><span className="text-gray-900 font-semibold">100123456789</span></div>
                <div className="grid grid-cols-2 items-center py-2"><span className="text-gray-500 font-medium">Emp Code</span><span className="text-gray-900 font-semibold">{employee.id}</span></div>
             </div>
           </div>
        )}

        {/* Security Tab (Self Only) */}
        {activeTab === 'Security' && isSelf && (
           <div className="max-w-md mx-auto py-8">
             <div className="text-center mb-8">
               <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                 <Lock className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
               <p className="text-sm text-gray-500 mt-2">Update your system-generated password to a secure one.</p>
             </div>
             <form className="space-y-4">
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700">Current Password</label>
                 <input type="password" placeholder="Enter current password" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700">New Password</label>
                 <input type="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                 <input type="password" placeholder="Confirm new password" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
               </div>
               <button type="button" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-4">
                 Update Password
               </button>
             </form>
           </div>
        )}

        {/* Salary Info Tab (Admin Only) */}
        {activeTab === 'Salary Info' && isAdmin && (
           <div>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-6 mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-gray-900">Salary Info</h2>
                   <p className="text-sm text-gray-500 mt-1">Configure and view salary structure components.</p>
                </div>
                <div className="flex gap-4 mt-6 md:mt-0">
                   <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center min-w-[140px]">
                     <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Month Wage</div>
                     <div className="flex items-center justify-center font-bold text-gray-900 text-lg">
                       <span className="text-gray-500 font-normal mr-1">₹</span>
                       <input 
                         type="number" 
                         value={monthWage} 
                         onChange={(e) => setMonthWage(Number(e.target.value) || 0)}
                         className="w-24 bg-transparent border-b border-gray-300 focus:border-pink-500 focus:outline-none text-center"
                       />
                     </div>
                   </div>
                   <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center min-w-[140px]">
                     <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Yearly Wage</div>
                     <div className="font-bold text-gray-900 text-lg">
                       <span className="text-gray-500 font-normal mr-1">₹</span>
                       {(monthWage * 12).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                     </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Wages (Auto-Calculated)</h3>
                  <div className="space-y-4 text-sm bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <span className="text-gray-600 font-medium">Basic Salary (50%)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.basicSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <span className="text-gray-600 font-medium">House Rent Allowance (50% of Basic)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.hra.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <span className="text-gray-600 font-medium">Standard Allowance (16.67% of Basic)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.standardAllowance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <span className="text-gray-600 font-medium">Performance Bonus (8.33% of Basic)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.performanceBonus.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <span className="text-gray-600 font-medium">Leave Travel Allowance (8.33% of Basic)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.leaveTravelAllowance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                       <span className="text-gray-600 font-medium">Fixed Allowance (Remainder)</span>
                       <span className="text-gray-900 font-semibold">₹{salaryComponents.fixedAllowance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
               </div>

               <div>
                  <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Contributions & Deductions</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 space-y-4 text-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">Provident Fund</h4>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                         <span className="text-gray-600 font-medium">Employee PF (12% of Basic)</span>
                         <span className="text-red-500 font-semibold">-₹{salaryComponents.pfEmployee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-600 font-medium">Employer PF (12% of Basic)</span>
                         <span className="text-blue-600 font-semibold">₹{salaryComponents.pfEmployer.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 space-y-4 text-sm">
                      <h4 className="font-semibold text-gray-700 mb-2">Taxes</h4>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-600 font-medium">Professional Tax</span>
                         <span className="text-red-500 font-semibold">-₹{salaryComponents.professionalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

               </div>
             </div>
           </div>
        )}
      </div>

    </div>
  );
}
