import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { 
  PieChart, 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  FolderKanban, 
  PhoneCall, 
  ThumbsUp, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDistribution = () => {
  const { 
    totalLeadsCount, 
    unassignedCount, 
    assignedCount, 
    convertedCount, 
    getDistributionStats 
  } = useLeads();

  const distribution = getDistributionStats();
  const [selectedEmp, setSelectedEmp] = useState(null);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              Distribution Matrix
            </span>
            <span className="text-xs text-slate-500 font-medium">10 Counselors</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Lead Allocation & Counselor Workload Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor real-time lead distribution balance and conversion velocity across your 10 counselors.
          </p>
        </div>

        <Link
          to="/adminportal/leads"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm self-start md:self-auto"
        >
          <FolderKanban className="w-4 h-4" />
          <span>Go to Bulk Assignment</span>
        </Link>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Leads Received</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalLeadsCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">100% Inquiries in CRM</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-xs font-bold text-amber-700 uppercase">Unassigned Pool</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">{unassignedCount}</p>
          <p className="text-[11px] text-amber-800 mt-1">
            {unassignedCount > 0 ? "Pending employee distribution" : "All leads assigned"}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-xs font-bold text-blue-700 uppercase">Distributed Leads</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">{assignedCount}</p>
          <p className="text-[11px] text-blue-800 mt-1">Across 10 employee pipelines</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-xs font-bold text-emerald-700 uppercase">Total Converted</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{convertedCount}</p>
          <p className="text-[11px] text-emerald-800 mt-1">Finalized enrollments</p>
        </div>
      </div>

      {/* Distribution Table Across Exactly 10 Employees */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">10 Counselor Allocation Table</h3>
            <p className="text-xs text-slate-500">Live metrics per individual counselor account</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            Target per Counselor: ~10 Leads
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Counselor / Employee</th>
                <th className="py-3.5 px-4 font-mono">Employee ID</th>
                <th className="py-3.5 px-4 text-center">Assigned Leads</th>
                <th className="py-3.5 px-4 text-center">Contacted</th>
                <th className="py-3.5 px-4 text-center">Interested</th>
                <th className="py-3.5 px-4 text-center">Pending/Follow-up</th>
                <th className="py-3.5 px-4 text-center">Converted</th>
                <th className="py-3.5 px-4">Workload Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {distribution.map((emp) => {
                const targetPercentage = Math.min(100, Math.round((emp.totalAssigned / 10) * 100));

                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{emp.name}</p>
                          <p className="text-[10px] text-slate-500">{emp.designation}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      {emp.id} ({emp.employeeId})
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block font-extrabold text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                        {emp.totalAssigned}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-indigo-700">
                      {emp.contacted}
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-blue-700">
                      {emp.interested}
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-amber-700">
                      {emp.pending}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {emp.converted}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 w-48">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>{emp.totalAssigned}/10 Assigned</span>
                          <span className="font-bold">{targetPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              emp.totalAssigned === 10
                                ? 'bg-emerald-600'
                                : emp.totalAssigned > 0
                                ? 'bg-blue-600'
                                : 'bg-slate-300'
                            }`}
                            style={{ width: `${targetPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
