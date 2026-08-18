import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  FolderKanban, 
  CheckCircle2, 
  Lock,
  Calendar
} from 'lucide-react';

export const UserProfile = () => {
  const { currentUser } = useAuth();
  const { getEmployeeLeads } = useLeads();

  const myLeads = getEmployeeLeads(currentUser?.id);
  const convertedCount = myLeads.filter(l => l.status === "Converted").length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
            Employee Workspace
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Counselor Profile & Account Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Course Divine Technology Pvt. Ltd. Admissions Team
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {currentUser?.avatar || "EM"}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{currentUser?.name}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                {currentUser?.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{currentUser?.designation}</p>
            <p className="text-xs text-slate-400">{currentUser?.department}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Employee System ID</span>
            <p className="font-mono font-bold text-slate-800 text-sm">{currentUser?.employeeId || "CDT-EMP-001"}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Username (Login Handle)</span>
            <p className="font-mono font-bold text-blue-700 text-sm">{currentUser?.username}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Official Email Address</span>
            <p className="font-semibold text-slate-800 truncate text-sm">{currentUser?.email}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Account Status</span>
            <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {currentUser?.status || "Active & Verified"}
            </p>
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl">
          <h4 className="font-bold text-xs uppercase tracking-wider text-blue-950 mb-3 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-blue-700" />
            <span>Assigned Workload Snapshot</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500">Total Leads Assigned</span>
              <p className="text-lg font-bold text-blue-800 mt-0.5">{myLeads.length}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-slate-500">Converted Enrollments</span>
              <p className="text-lg font-bold text-emerald-700 mt-0.5">{convertedCount}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-slate-500">Conversion Rate</span>
              <p className="text-lg font-bold text-purple-700 mt-0.5">
                {myLeads.length > 0 ? `${Math.round((convertedCount / myLeads.length) * 100)}%` : '0%'}
              </p>
            </div>
          </div>
        </div>

        {/* Security & Access Notice */}
        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-800">Security & Privacy Protocol</p>
            <p className="mt-0.5">
              Employee accounts operate in strict isolation. For password resets or permission inquiries, please reach out to the Company Administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
