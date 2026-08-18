import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { StatusBadge, SourceBadge } from '../../components/common/Badge';
import { EmployeeLeadDetailModal } from '../../components/employee/EmployeeLeadDetailModal';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const UserMyLeads = () => {
  const { currentUser } = useAuth();
  const { getEmployeeLeads } = useLeads();

  // STRICT DATA ISOLATION: Query ONLY this employee's assigned leads
  const myAssignedLeads = getEmployeeLeads(currentUser?.id);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtered
  const filteredLeads = useMemo(() => {
    return myAssignedLeads.filter(lead => {
      if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
      if (courseFilter !== 'ALL' && lead.course !== courseFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = lead.studentName?.toLowerCase().includes(query);
        const matchesEmail = lead.email?.toLowerCase().includes(query);
        const matchesPhone = lead.phone?.toLowerCase().includes(query);
        const matchesId = lead.leadId?.toLowerCase().includes(query);
        const matchesCity = lead.city?.toLowerCase().includes(query);
        const matchesCourse = lead.course?.toLowerCase().includes(query);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesId && !matchesCity && !matchesCourse) {
          return false;
        }
      }

      return true;
    });
  }, [myAssignedLeads, statusFilter, courseFilter, searchQuery]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  const coursesList = [
    "Full Stack Development",
    "Python Programming",
    "Java Programming",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Cloud Computing",
    "Cyber Security"
  ];

  const statusOptions = [
    "New",
    "Contacted",
    "Interested",
    "Follow-up",
    "Converted",
    "Not Interested"
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white font-mono">
              My Assigned Inquiries ({myAssignedLeads.length})
            </span>
            <span className="text-xs text-slate-500 font-medium">{currentUser?.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            My Assigned Student Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Process student inquiries, conduct phone outreach, and log conversation remarks.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Strict Employee Isolation: {currentUser?.id} Data Only</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by student name, phone, city, or ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="ALL">All Statuses</option>
              {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          {/* Course Filter */}
          <div>
            <select
              value={courseFilter}
              onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="ALL">All Courses</option>
              {coursesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        {myAssignedLeads.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Course Interested</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date Assigned</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedLeads.length > 0 ? (
                    paginatedLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">{lead.leadId}</td>
                        
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="font-bold text-slate-900 hover:text-blue-600 text-left transition-colors"
                          >
                            {lead.studentName}
                          </button>
                          <p className="text-[10px] text-slate-400 font-normal">{lead.qualification}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <a href={`tel:${lead.phone}`} className="font-mono font-bold text-blue-700 hover:underline">
                            {lead.phone}
                          </a>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 max-w-[150px] truncate">
                          {lead.email}
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {lead.city}
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          {lead.course}
                        </td>

                        <td className="py-3.5 px-4">
                          <StatusBadge status={lead.status} />
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {lead.assignedAt ? new Date(lead.assignedAt).toLocaleDateString('en-IN') : lead.createdAt}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            VIEW LEAD
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="py-10 text-center text-slate-500">
                        <p className="font-bold text-sm text-slate-700">No leads matched the search criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Showing {filteredLeads.length} assigned {filteredLeads.length === 1 ? 'lead' : 'leads'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <span className="font-bold text-slate-800">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-16 px-4 text-center">
            <FolderKanban className="w-14 h-14 mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No Leads Assigned to You Currently</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Your assignment queue is currently empty. When the company administrator assigns leads to your counselor account ({currentUser?.id}), they will immediately appear here.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <EmployeeLeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
};
