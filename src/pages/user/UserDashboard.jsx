import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge, SourceBadge } from '../../components/common/Badge';
import { EmployeeLeadDetailModal } from '../../components/employee/EmployeeLeadDetailModal';
import { 
  FolderKanban, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  CalendarClock, 
  ArrowRight, 
  User, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { getEmployeeLeads } = useLeads();
  const navigate = useNavigate();

  const [selectedLead, setSelectedLead] = useState(null);

  // STRICT DATA ISOLATION: Query ONLY this employee's assigned leads
  const myLeads = getEmployeeLeads(currentUser?.id);

  const totalAssigned = myLeads.length;
  const newLeads = myLeads.filter(l => l.status === "New" || l.status === "Unassigned").length;
  const contactedLeads = myLeads.filter(l => l.status === "Contacted").length;
  const interestedLeads = myLeads.filter(l => l.status === "Interested").length;
  const followupLeads = myLeads.filter(l => l.status === "Follow-up").length;
  const convertedLeads = myLeads.filter(l => l.status === "Converted").length;

  const recentAssigned = myLeads.slice(0, 5);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {currentUser?.avatar || "EM"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                {currentUser?.id} • {currentUser?.employeeId}
              </span>
              <span className="text-xs text-slate-500 font-medium">{currentUser?.department}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {currentUser?.designation} • Course Divine Technology Pvt. Ltd.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/userportal/my-leads')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all self-start md:self-auto"
        >
          <FolderKanban className="w-4 h-4" />
          <span>Open My Leads ({totalAssigned})</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="My Assigned Leads"
          value={totalAssigned}
          subtitle="Assigned exclusively to you"
          icon={FolderKanban}
          color="blue"
        />

        <KpiCard
          title="Pending Initial Call"
          value={newLeads}
          subtitle="New leads awaiting outreach"
          icon={Clock}
          color={newLeads > 0 ? "amber" : "slate"}
          badge={newLeads > 0 ? { bg: "bg-amber-100", text: "text-amber-900", label: "Action Required" } : null}
        />

        <KpiCard
          title="Follow-ups Scheduled"
          value={followupLeads + contactedLeads}
          subtitle="Active ongoing discussions"
          icon={CalendarClock}
          color="purple"
        />

        <KpiCard
          title="Converted / Enrolled"
          value={convertedLeads}
          subtitle={totalAssigned > 0 ? `${Math.round((convertedLeads / totalAssigned) * 100)}% conversion rate` : "No leads yet"}
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Data Isolation Verification Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold">Strict Role & Data Isolation Active</p>
            <p className="text-[11px] text-slate-300">
              You are securely logged into your personal workspace. You only have visibility of leads assigned directly to <span className="text-blue-300 font-semibold">{currentUser?.name} ({currentUser?.id})</span>.
            </p>
          </div>
        </div>

        <Link
          to="/userportal/my-leads"
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0"
        >
          <span>View My Leads</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* My Recent Leads Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">My Assigned Leads Queue</h3>
            <p className="text-xs text-slate-500">Recently assigned student inquiries for counseling</p>
          </div>
          <Link
            to="/userportal/my-leads"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All ({totalAssigned})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {totalAssigned > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Course Interested</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAssigned.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-600">{lead.leadId}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{lead.studentName}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-700">{lead.phone}</td>
                    <td className="py-3.5 px-4 text-slate-600">{lead.city}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{lead.course}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                      >
                        Open Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 px-4 text-center">
            <FolderKanban className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="font-bold text-slate-800 text-sm">No Leads Assigned Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Your lead queue is currently empty. As soon as the Company Admin assigns leads to your account ({currentUser?.id}), they will immediately appear here.
            </p>
          </div>
        )}
      </div>

      {/* Lead Detail / Status Modal */}
      <EmployeeLeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
};
