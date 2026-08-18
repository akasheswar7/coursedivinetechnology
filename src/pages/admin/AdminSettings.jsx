import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Settings, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Database,
  Trash2
} from 'lucide-react';

export const AdminSettings = () => {
  const { leads, clearAllLeads } = useLeads();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearAll = () => {
    clearAllLeads();
    setShowConfirmClear(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `course_divine_crm_leads_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "Lead ID",
      "Student Name",
      "Email",
      "Phone",
      "City",
      "Address",
      "Course",
      "Qualification",
      "Status",
      "Assigned Counselor",
      "Created Date"
    ];

    const rows = leads.map(l => [
      `"${l.leadId}"`,
      `"${l.studentName}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.city}"`,
      `"${l.address || ''}"`,
      `"${l.course}"`,
      `"${l.qualification || ''}"`,
      `"${l.status}"`,
      `"${l.assignedEmployeeName || 'Unassigned'}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `course_divine_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              System Administration
            </span>
            <span className="text-xs text-slate-500 font-medium">CRM Configuration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Portal Settings & Database Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            COURSE DIVINE TECHNOLOGY PVT. LTD. CRM Environment Management.
          </p>
        </div>
      </div>

      {/* Notification */}
      {resetSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Database successfully cleared! Current active leads count is 0. Ready for your custom lead entries.</span>
        </div>
      )}

      {/* Clear Database Tool Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Wipe & Clear All Leads (Reset to 0 Leads)</h3>
              <p className="text-xs text-slate-500">
                Permanently removes all existing leads from the CRM so you start completely fresh with 0 records.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
          <p className="font-semibold text-slate-800">Current Lead Database State:</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
            <li>Total active leads currently in system: <strong className="text-slate-900">{leads.length}</strong></li>
            <li>No dummy leads will be restored. Only leads you manually add will exist.</li>
          </ul>
        </div>

        {showConfirmClear ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs text-rose-800 font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Are you sure you want to permanently clear all {leads.length} leads to 0?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Yes, Clear All to 0
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Database (Set to 0 Leads)</span>
          </button>
        )}
      </div>

      {/* Export Tool */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Export Lead Database</h3>
              <p className="text-xs text-slate-500">
                Download current leads with counselor assignments and statuses.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV (Spreadsheet)</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center gap-2 transition-all"
          >
            <Database className="w-4 h-4" />
            <span>Export Raw JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
