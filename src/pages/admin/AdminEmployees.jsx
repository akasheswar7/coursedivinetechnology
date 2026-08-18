import React from 'react';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { useLeads } from '../../context/LeadContext';
import { 
  Users, 
  UserCheck, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock
} from 'lucide-react';

export const AdminEmployees = () => {
  const { leads } = useLeads();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              Staff Management
            </span>
            <span className="text-xs text-slate-500 font-medium">10 Authorized Employee Accounts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Admissions & Counseling Team Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Overview of the 10 counselors, workload assignments, and account statuses. Passwords remain confidential.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 self-start md:self-auto">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Credential Privacy Protection Active</span>
        </div>
      </div>

      {/* 10 Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {EMPLOYEES_DATA.map((emp) => {
          const empLeads = leads.filter(l => l.assignedEmployeeId === emp.id);
          const totalAssigned = empLeads.length;
          const converted = empLeads.filter(l => l.status === "Converted").length;
          const contacted = empLeads.filter(l => l.status === "Contacted").length;
          const pending = empLeads.filter(l => ["New", "Follow-up", "Contacted"].includes(l.status)).length;

          return (
            <div
              key={emp.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle hover:shadow-premium transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    {emp.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{emp.name}</h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                        {emp.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{emp.designation}</p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {emp.status}
                </span>
              </div>

              {/* Contact Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Username:</span>
                  <span className="font-mono font-semibold text-slate-800">{emp.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Joined:</span>
                  <span>{emp.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{emp.phone}</span>
                </div>
              </div>

              {/* Workload Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase">Assigned</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{totalAssigned}</p>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-700 font-medium uppercase">Converted</p>
                  <p className="text-base font-extrabold text-emerald-700 mt-0.5">{converted}</p>
                </div>
                <div>
                  <p className="text-[10px] text-amber-700 font-medium uppercase">Pending</p>
                  <p className="text-base font-extrabold text-amber-700 mt-0.5">{pending}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
