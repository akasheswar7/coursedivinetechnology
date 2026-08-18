import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { StatusBadge, SourceBadge } from '../common/Badge';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Clock, 
  MessageSquare, 
  UserCheck, 
  Trash2, 
  Save, 
  Plus, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const AdminLeadDetailModal = ({ isOpen, onClose, lead, onUpdated }) => {
  const { reassignLead, updateLeadStatus, addLeadNote, deleteLead } = useLeads();
  
  const [selectedEmpId, setSelectedEmpId] = useState(lead?.assignedEmployeeId || '');
  const [currentStatus, setCurrentStatus] = useState(lead?.status || 'Unassigned');
  const [newNote, setNewNote] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  if (!isOpen || !lead) return null;

  const handleReassign = () => {
    if (selectedEmpId && selectedEmpId !== lead.assignedEmployeeId) {
      reassignLead(lead.id, selectedEmpId);
      setActionSuccess("Lead reassigned successfully.");
      setTimeout(() => setActionSuccess(''), 3000);
      if (onUpdated) onUpdated();
    }
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    updateLeadStatus(lead.id, status, `Admin updated status to ${status}`, "Admin");
    setActionSuccess(`Status changed to ${status}.`);
    setTimeout(() => setActionSuccess(''), 3000);
    if (onUpdated) onUpdated();
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addLeadNote(lead.id, newNote, "Admin");
    setNewNote('');
    setActionSuccess("Note added successfully.");
    setTimeout(() => setActionSuccess(''), 3000);
    if (onUpdated) onUpdated();
  };

  const handleDelete = () => {
    deleteLead(lead.id);
    onClose();
    if (onUpdated) onUpdated();
  };

  const statusOptions = [
    "Unassigned",
    "New",
    "Contacted",
    "Interested",
    "Follow-up",
    "Converted",
    "Not Interested"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-modal border border-slate-200 w-full max-w-3xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded bg-blue-600 font-mono text-xs font-bold tracking-wider">
              {lead.leadId}
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">{lead.studentName}</h3>
              <p className="text-xs text-slate-400">Lead Details & Admin Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {actionSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-900">{lead.studentName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-mono font-medium text-slate-800">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{lead.city} — {lead.address}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-900">{lead.course}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Added: {lead.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Source:</span>
                <SourceBadge source={lead.source} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Current Status:</span>
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>

          {/* Admin Management Row: Reassignment & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reassign Counselor */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Assigned Employee / Counselor
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Unassigned --</option>
                  {EMPLOYEES_DATA.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.id} - {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleReassign}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Update
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Currently: <span className="font-semibold text-slate-700">{lead.assignedEmployeeName || "Unassigned"}</span>
              </p>
            </div>

            {/* Quick Status Change */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Update Status
              </label>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                Status changes are recorded in the lead history timeline.
              </p>
            </div>
          </div>

          {/* Activity / Notes History */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Counseling History & Activity Notes</span>
            </h4>

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type an admin note or update..."
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="font-semibold text-slate-800">{note.author}</span>
                      <span className="text-[10px] text-slate-400">{note.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
              )}
            </div>
          </div>

          {/* Delete Danger Zone */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-3 p-2 bg-rose-50 border border-rose-200 rounded-lg w-full justify-between">
                <span className="text-xs text-rose-800 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Are you sure you want to permanently delete this lead?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-xs font-semibold bg-rose-600 text-white rounded hover:bg-rose-700 shadow-sm"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
