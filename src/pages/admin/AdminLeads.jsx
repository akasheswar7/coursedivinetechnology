import React, { useState, useMemo } from 'react';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { StatusBadge, SourceBadge } from '../../components/common/Badge';
import { BulkAssignModal } from '../../components/admin/BulkAssignModal';
import { AddLeadModal } from '../../components/admin/AddLeadModal';
import { AdminLeadDetailModal } from '../../components/admin/AdminLeadDetailModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  UserCheck, 
  UserPlus, 
  CheckSquare, 
  Square, 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  AlertTriangle,
  Layers
} from 'lucide-react';

export const AdminLeads = () => {
  const { 
    leads, 
    totalLeadsCount, 
    unassignedCount, 
    assignedCount,
    deleteLead,
    deleteLeads
  } = useLeads();

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [tabFilter, setTabFilter] = useState('all'); // 'all', 'unassigned', 'assigned'
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [employeeFilter, setEmployeeFilter] = useState('ALL');

  // Multi-select Checkboxes State
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  // Modals & Drawers
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLeadDetail, setSelectedLeadDetail] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Custom in-app Delete Confirmation State
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filtered leads computation
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Tab filter
      if (tabFilter === 'unassigned' && lead.assignedEmployeeId) return false;
      if (tabFilter === 'assigned' && !lead.assignedEmployeeId) return false;

      // Dropdown filters
      if (courseFilter !== 'ALL' && lead.course !== courseFilter) return false;
      if (cityFilter !== 'ALL' && lead.city !== cityFilter) return false;
      if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
      if (employeeFilter !== 'ALL' && lead.assignedEmployeeId !== employeeFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = lead.studentName?.toLowerCase().includes(query);
        const matchesEmail = lead.email?.toLowerCase().includes(query);
        const matchesPhone = lead.phone?.toLowerCase().includes(query);
        const matchesId = lead.leadId?.toLowerCase().includes(query);
        const matchesCity = lead.city?.toLowerCase().includes(query);
        const matchesCourse = lead.course?.toLowerCase().includes(query);
        const matchesEmployee = lead.assignedEmployeeName?.toLowerCase().includes(query);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesId && !matchesCity && !matchesCourse && !matchesEmployee) {
          return false;
        }
      }

      return true;
    });
  }, [leads, tabFilter, courseFilter, cityFilter, statusFilter, employeeFilter, searchQuery]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  // Checkbox Selection Logic
  const handleToggleSelectAllOnPage = () => {
    const pageIds = paginatedLeads.map(l => l.id);
    const allPageSelected = pageIds.every(id => selectedLeadIds.includes(id));

    if (allPageSelected) {
      setSelectedLeadIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      const newSelected = Array.from(new Set([...selectedLeadIds, ...pageIds]));
      setSelectedLeadIds(newSelected);
    }
  };

  // Select 100% of all leads in the database at once
  const handleSelectAllEverywhere = () => {
    const allIds = filteredLeads.map(l => l.id);
    setSelectedLeadIds(allIds);
    setToastMessage(`Selected all ${allIds.length} leads across the database.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleLead = (leadId) => {
    if (selectedLeadIds.includes(leadId)) {
      setSelectedLeadIds(prev => prev.filter(id => id !== leadId));
    } else {
      setSelectedLeadIds(prev => [...prev, leadId]);
    }
  };

  // Helper: Select Next 10 Unassigned Leads
  const handleSelectNext10Unassigned = () => {
    const unassigned = leads.filter(l => !l.assignedEmployeeId).slice(0, 10);
    if (unassigned.length === 0) {
      setToastMessage("No unassigned leads remaining!");
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }
    const ids = unassigned.map(l => l.id);
    setSelectedLeadIds(ids);
    setTabFilter('unassigned');
    setToastMessage(`Selected 10 unassigned leads. Ready to assign or delete.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleClearSelection = () => {
    setSelectedLeadIds([]);
    setShowBulkDeleteModal(false);
  };

  // Single Lead Delete Confirmation
  const handleConfirmSingleDelete = () => {
    if (!leadToDelete) return;
    deleteLead(leadToDelete.id);
    setSelectedLeadIds(prev => prev.filter(id => id !== leadToDelete.id));
    setToastMessage(`✓ Lead "${leadToDelete.studentName}" deleted successfully.`);
    setLeadToDelete(null);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Bulk Delete Execution
  const handleConfirmBulkDelete = () => {
    const count = selectedLeadIds.length;
    deleteLeads(selectedLeadIds);
    setSelectedLeadIds([]);
    setShowBulkDeleteModal(false);
    setToastMessage(`✓ Successfully deleted ${count} leads.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Delete All 100 Leads Execution
  const handleConfirmDeleteAllLeads = () => {
    const allIds = leads.map(l => l.id);
    const count = allIds.length;
    deleteLeads(allIds);
    setSelectedLeadIds([]);
    setShowDeleteAllModal(false);
    setToastMessage(`✓ Successfully deleted all ${count} leads from the database.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleBulkAssignSuccess = (res) => {
    setToastMessage(`✓ ${res.count} leads successfully assigned to ${res.employeeName}.`);
    setSelectedLeadIds([]);
    setTimeout(() => setToastMessage(''), 4000);
  };

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

  const citiesList = [
    "Visakhapatnam",
    "Vijayawada",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Pune",
    "Mumbai",
    "Delhi"
  ];

  const isAllPageSelected = paginatedLeads.length > 0 && paginatedLeads.every(l => selectedLeadIds.includes(l.id));
  const isAllEverywhereSelected = filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length;

  return (
    <div className="space-y-6 animate-fadeIn pb-28 relative">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              Admin Lead Central
            </span>
            <span className="text-xs text-slate-500 font-medium">All Inquiries ({totalLeadsCount})</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Student Leads Management & Fast Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select all leads at once, bulk delete 100 leads with Enter key, or rapidly assign across counselors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {totalLeadsCount > 0 && (
            <>
              {/* Select All 100 Leads Button */}
              <button
                onClick={handleSelectAllEverywhere}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Select all leads across all pages at once"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Select All ({totalLeadsCount})</span>
              </button>

              {/* Delete All 100 Leads Button */}
              <button
                onClick={() => setShowDeleteAllModal(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Delete all leads in 1 click"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Delete All ({totalLeadsCount})</span>
              </button>
            </>
          )}

          <button
            onClick={handleSelectNext10Unassigned}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Select Next 10 Unassigned</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-4">
        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => { setTabFilter('all'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tabFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Leads ({totalLeadsCount})
            </button>

            <button
              onClick={() => { setTabFilter('unassigned'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                tabFilter === 'unassigned'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Unassigned ({unassignedCount})</span>
            </button>

            <button
              onClick={() => { setTabFilter('assigned'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tabFilter === 'assigned'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Assigned ({assignedCount})
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredLeads.length} matching {filteredLeads.length === 1 ? 'record' : 'records'}
          </div>
        </div>

        {/* Search & Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Bar */}
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

          {/* City Filter */}
          <div>
            <select
              value={cityFilter}
              onChange={(e) => { setCityFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="ALL">All Cities</option>
              {citiesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Counselor / Employee Filter */}
          <div>
            <select
              value={employeeFilter}
              onChange={(e) => { setEmployeeFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="ALL">All Counselors</option>
              {EMPLOYEES_DATA.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.id} - {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-Page Select All Banner */}
        {isAllPageSelected && !isAllEverywhereSelected && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between animate-fadeIn">
            <span>All {paginatedLeads.length} leads on this page are selected.</span>
            <button
              onClick={handleSelectAllEverywhere}
              className="font-bold text-blue-700 hover:text-blue-900 underline"
            >
              Select all {filteredLeads.length} leads in current view
            </button>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold tracking-wider text-[11px]">
              <tr>
                {/* Select All Checkbox */}
                <th className="py-3 px-4 w-10">
                  <button
                    onClick={handleToggleSelectAllOnPage}
                    className="flex items-center text-slate-600 hover:text-slate-900"
                    title={isAllPageSelected ? "Deselect page" : "Select all on page"}
                  >
                    {isAllPageSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3">Lead ID</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Contact (Phone & Email)</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Course Interested</th>
                <th className="py-3 px-3">Assigned Counselor</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => {
                  const isSelected = selectedLeadIds.includes(lead.id);

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isSelected ? 'bg-blue-50/70 font-medium' : ''
                      }`}
                    >
                      {/* Row Checkbox */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleLead(lead.id)}
                          className="flex items-center"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                          )}
                        </button>
                      </td>

                      {/* Lead ID */}
                      <td className="py-3 px-3 font-mono text-slate-600 font-semibold">
                        {lead.leadId}
                      </td>

                      {/* Student Name */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => setSelectedLeadDetail(lead)}
                          className="font-bold text-slate-900 hover:text-blue-600 text-left transition-colors"
                        >
                          {lead.studentName}
                        </button>
                        <p className="text-[10px] text-slate-400 font-normal">{lead.qualification}</p>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-3 space-y-0.5">
                        <div className="font-mono text-slate-800 font-medium">{lead.phone}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{lead.email}</div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800">{lead.city}</span>
                        <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{lead.address}</p>
                      </td>

                      {/* Course */}
                      <td className="py-3 px-3 font-medium text-slate-900">
                        {lead.course}
                      </td>

                      {/* Assigned Counselor */}
                      <td className="py-3 px-3">
                        {lead.assignedEmployeeName ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span className="font-semibold text-slate-800">{lead.assignedEmployeeName}</span>
                            <span className="text-[10px] font-mono text-slate-500">({lead.assignedEmployeeId})</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" />
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <StatusBadge status={lead.status} />
                      </td>

                      {/* Fast Action Buttons: Manage + Fast In-App Delete Modal */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadDetail(lead)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                            title="View / Edit Lead Details"
                          >
                            Manage
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setLeadToDelete(lead);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Fast Delete Lead (Pop-up + Enter Key)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-500">
                    <FolderKanban className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No leads found matching current filters.</p>
                    <p className="text-xs text-slate-400 mt-1">Try adding new leads or changing the filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1 bg-white border border-slate-300 rounded font-medium text-slate-800"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100 (All)</option>
            </select>
            <span className="text-slate-400 ml-2">
              Page {currentPage} of {totalPages} ({filteredLeads.length} total)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="px-3 py-1.5 font-bold text-slate-800">
              {currentPage} / {totalPages}
            </span>
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
      </div>

      {/* Floating Sticky Bulk Operations Action Bar: Bulk Assign & Fast Bulk Delete */}
      {selectedLeadIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-modal border border-slate-700 flex flex-wrap items-center gap-4 animate-fadeIn max-w-2xl w-full mx-auto justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
              {selectedLeadIds.length}
            </span>
            <div>
              <p className="text-xs font-bold text-white">
                {selectedLeadIds.length} {selectedLeadIds.length === 1 ? 'Lead' : 'Leads'} Selected
              </p>
              <p className="text-[10px] text-slate-400">Choose an action to apply in bulk</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearSelection}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Clear
            </button>

            {/* Fast Bulk Delete Trigger */}
            <button
              onClick={() => setShowBulkDeleteModal(true)}
              className="px-3.5 py-2 bg-rose-600/90 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              title="Delete all selected leads with Enter-key modal"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedLeadIds.length})</span>
            </button>

            {/* Bulk Assign Button */}
            <button
              onClick={() => setShowBulkModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Assign to Employee</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <BulkAssignModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedLeadIds={selectedLeadIds}
        onSuccess={handleBulkAssignSuccess}
      />

      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={(newLead) => {
          setToastMessage(`✓ Lead "${newLead.studentName}" added successfully.`);
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />

      <AdminLeadDetailModal
        isOpen={!!selectedLeadDetail}
        onClose={() => setSelectedLeadDetail(null)}
        lead={selectedLeadDetail}
      />

      {/* Custom In-App Single Lead Delete Modal (Enter to confirm, Esc to cancel) */}
      <DeleteConfirmModal
        isOpen={!!leadToDelete}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleConfirmSingleDelete}
        itemTitle={leadToDelete ? `${leadToDelete.leadId} (${leadToDelete.studentName})` : ''}
        leadCount={1}
      />

      {/* Custom In-App Bulk Delete Modal (Enter to confirm, Esc to cancel) */}
      <DeleteConfirmModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={handleConfirmBulkDelete}
        itemTitle={`${selectedLeadIds.length} selected student leads`}
        leadCount={selectedLeadIds.length}
      />

      {/* Custom In-App Delete ALL (100) Leads Modal (Enter to confirm, Esc to cancel) */}
      <DeleteConfirmModal
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleConfirmDeleteAllLeads}
        itemTitle={`ALL ${totalLeadsCount} student leads across the entire database`}
        leadCount={totalLeadsCount}
      />
    </div>
  );
};
