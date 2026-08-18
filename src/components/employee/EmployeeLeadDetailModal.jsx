import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { useAuth } from '../../context/AuthContext';
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
  Save, 
  Plus, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const EmployeeLeadDetailModal = ({ isOpen, onClose, lead, onUpdated }) => {
  const { updateLeadStatus, addLeadNote } = useLeads();
  const { currentUser } = useAuth();
  
  const [currentStatus, setCurrentStatus] = useState(lead?.status || 'New');
  const [counselingNote, setCounselingNote] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !lead) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const authorName = `${currentUser?.name} (${currentUser?.id})`;
    
    // Update status and append note if entered
    updateLeadStatus(
      lead.id, 
      currentStatus, 
      counselingNote.trim() ? counselingNote.trim() : null, 
      authorName
    );

    setIsSaving(false);
    setActionSuccess("Lead status and counseling notes updated successfully.");
    setCounselingNote('');
    
    setTimeout(() => {
      setActionSuccess('');
      if (onUpdated) onUpdated();
    }, 1500);
  };

  const statusOptions = [
    { value: "New", label: "New Lead (Pending Initial Contact)" },
    { value: "Contacted", label: "Contacted (Spoke via Call / WhatsApp)" },
    { value: "Interested", label: "Interested (Course Syllabus Shared)" },
    { value: "Follow-up", label: "Follow-up (Scheduled Next Call)" },
    { value: "Converted", label: "Converted (Enrolled / Fee Paid)" },
    { value: "Not Interested", label: "Not Interested / Dropped" }
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
              <p className="text-xs text-slate-400">Student Counseling & Lead Status Management</p>
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
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* Student Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-900 text-sm">{lead.studentName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <a href={`tel:${lead.phone}`} className="font-mono font-bold text-blue-700 hover:underline">
                  {lead.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${lead.email}`} className="text-slate-800 hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{lead.city} ({lead.address})</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">{lead.course}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Qualification: {lead.qualification || "Degree/Graduate"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Preferred Batch: {lead.preferredBatch || "Weekday Morning"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Current Status:</span>
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>

          {/* Action Form: Update Status & Counseling Log */}
          <form onSubmit={handleUpdate} className="p-4 bg-white border border-slate-200 rounded-xl space-y-4 shadow-subtle">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Update Counseling Status & Notes</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Change Lead Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assigned Counselor
                </label>
                <input
                  type="text"
                  disabled
                  value={`${currentUser?.name || 'Assigned Counselor'} (${currentUser?.id})`}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Add Call / Conversation Remarks
              </label>
              <textarea
                rows="2"
                value={counselingNote}
                onChange={(e) => setCounselingNote(e.target.value)}
                placeholder="e.g. Spoke with candidate, shared course curriculum brochure, interested in Python weekend batch."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Status & Remarks</span>
              </button>
            </div>
          </form>

          {/* Activity / Interaction History */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Counseling History & Lead Timeline</span>
            </h4>

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
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
