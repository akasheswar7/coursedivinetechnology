import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge, SourceBadge } from '../../components/common/Badge';
import { AdminLeadDetailModal } from '../../components/admin/AdminLeadDetailModal';
import { BulkAssignModal } from '../../components/admin/BulkAssignModal';
import { AddLeadModal } from '../../components/admin/AddLeadModal';
import { 
  Users, 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  UserCheck, 
  ArrowRight, 
  Plus, 
  PieChart, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    leads, 
    totalLeadsCount, 
    unassignedCount, 
    assignedCount, 
    convertedCount, 
    inProgressCount,
    getDistributionStats 
  } = useLeads();
  
  const navigate = useNavigate();

  const [selectedLead, setSelectedLead] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [quickAssignIds, setQuickAssignIds] = useState([]);
  const [successToast, setSuccessToast] = useState('');

  const distribution = getDistributionStats();
  const recentLeads = leads.slice(0, 8);

  const handleQuickAssignNext10 = () => {
    const unassigned = leads.filter(l => !l.assignedEmployeeId).slice(0, 10);
    if (unassigned.length === 0) {
      alert("No unassigned leads remaining!");
      return;
    }
    setQuickAssignIds(unassigned.map(l => l.id));
    setShowBulkModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Executive Welcome & Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-900 text-white">
              Executive Dashboard
            </span>
            <span className="text-xs text-slate-500 font-medium">Owner Oversight</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            COURSE DIVINE TECHNOLOGY PVT. LTD.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Internal Lead Management & Distribution System • 10 Dedicated Counselors
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Lead</span>
          </button>
          
          <button
            onClick={() => navigate('/adminportal/leads')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Manage All 100 Leads</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Leads"
          value={totalLeadsCount}
          subtitle="All received student inquiries"
          icon={FolderKanban}
          color="slate"
        />

        <KpiCard
          title="Unassigned Leads"
          value={unassignedCount}
          subtitle={unassignedCount > 0 ? "Pending employee distribution" : "All leads assigned"}
          icon={Clock}
          color={unassignedCount > 0 ? "amber" : "emerald"}
          badge={unassignedCount > 0 ? { bg: "bg-amber-100", text: "text-amber-800", label: "Needs Assignment" } : { bg: "bg-emerald-100", text: "text-emerald-800", label: "Completed" }}
        />

        <KpiCard
          title="Assigned Leads"
          value={assignedCount}
          subtitle={`Distributed across 10 counselors`}
          icon={UserCheck}
          color="blue"
        />

        <KpiCard
          title="Active Counselors"
          value="10"
          subtitle="Exactly 10 authorized staff"
          icon={Users}
          color="purple"
        />
      </div>

      {/* 100-Lead Workflow Quick Distribution Action Banner */}
      {unassignedCount > 0 ? (
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-premium flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
              ★ Active 100-Lead Workflow
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {unassignedCount} Leads Remaining in Unassigned Queue
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Distribute batches of 10 leads to Employee 01, Employee 02, etc. As you assign them, the unassigned counter decreases immediately and leads transfer to the designated counselor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleQuickAssignNext10}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Assign Next 10 Unassigned</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/adminportal/leads')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Open Checkbox Table</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-5 text-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900">All 100 Leads Successfully Distributed</h3>
              <p className="text-xs text-emerald-700">Zero unassigned leads remain. Counselors are actively processing leads.</p>
            </div>
          </div>
          <Link
            to="/adminportal/distribution"
            className="px-3.5 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <span>View Distribution Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Two-Column Section: Distribution Matrix Preview & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Recent Student Leads</h3>
              <p className="text-xs text-slate-500">Live incoming student inquiries</p>
            </div>
            <Link
              to="/adminportal/leads"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All 100 Leads</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Lead ID</th>
                  <th className="py-3 px-4 font-semibold">Student Name</th>
                  <th className="py-3 px-4 font-semibold">City</th>
                  <th className="py-3 px-4 font-semibold">Course Interested</th>
                  <th className="py-3 px-4 font-semibold">Assigned Counselor</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-600">{lead.leadId}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{lead.studentName}</td>
                    <td className="py-3 px-4 text-slate-600">{lead.city}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{lead.course}</td>
                    <td className="py-3 px-4">
                      {lead.assignedEmployeeName ? (
                        <span className="text-slate-800 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          {lead.assignedEmployeeName}
                        </span>
                      ) : (
                        <span className="text-amber-700 italic font-medium">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px]"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            Showing latest {recentLeads.length} of {totalLeadsCount} total records
          </div>
        </div>

        {/* Right Col: 10 Employees Workload Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Counselor Distribution</h3>
                <p className="text-xs text-slate-500">10 Employee Workloads</p>
              </div>
              <Link
                to="/adminportal/distribution"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Full Matrix
              </Link>
            </div>

            <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {distribution.map((emp) => {
                const percent = Math.min(100, Math.round((emp.totalAssigned / 10) * 100));
                return (
                  <div key={emp.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-slate-900">{emp.name} ({emp.id})</span>
                      <span className="font-bold text-blue-700">{emp.totalAssigned} Leads</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Conv: {emp.converted}</span>
                      <span>Cont: {emp.contacted}</span>
                      <span>Pend: {emp.pending}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/adminportal/employees"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>View All 10 Employee Profiles</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdminLeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />

      <BulkAssignModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedLeadIds={quickAssignIds}
        onSuccess={(res) => {
          setSuccessToast(`${res.count} leads successfully assigned to ${res.employeeName}.`);
        }}
      />

      <AddLeadModal
        isOpen={showAddLeadModal}
        onClose={() => setShowAddLeadModal(false)}
        onSuccess={(newLead) => {
          setSuccessToast(`Lead ${newLead.studentName} added successfully.`);
        }}
      />
    </div>
  );
};
