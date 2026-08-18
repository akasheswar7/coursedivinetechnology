import React, { useState } from 'react';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { useLeads } from '../../context/LeadContext';
import { X, UserCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const BulkAssignModal = ({ isOpen, onClose, selectedLeadIds, onSuccess }) => {
  const { assignLeads, leads } = useLeads();
  const [selectedEmpId, setSelectedEmpId] = useState('EMP01');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedLeadIds || selectedLeadIds.length === 0) {
      setErrorMessage("No leads selected for assignment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const result = assignLeads(selectedLeadIds, selectedEmpId);
      setIsSubmitting(false);
      onSuccess(result);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Failed to assign leads.");
    }
  };

  // Helper to get current lead count per employee
  const getEmpCurrentCount = (empId) => {
    return leads.filter(l => l.assignedEmployeeId === empId).length;
  };

  const targetEmployee = EMPLOYEES_DATA.find(e => e.id === selectedEmpId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-modal border border-slate-200 w-full max-w-md overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Assign Selected Leads</h3>
              <p className="text-xs text-slate-400">Course Divine Technology CRM</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleAssign} className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Selected Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Selected for Assignment</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedLeadIds.length} {selectedLeadIds.length === 1 ? 'Lead' : 'Leads'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
                Bulk Workflow
              </span>
            </div>
          </div>

          {/* Employee Dropdown Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Target Employee (1 of 10)
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            >
              {EMPLOYEES_DATA.map((emp) => {
                const count = getEmpCurrentCount(emp.id);
                return (
                  <option key={emp.id} value={emp.id}>
                    {emp.id} — {emp.name} ({emp.designation}) [Current: {count} leads]
                  </option>
                );
              })}
            </select>
          </div>

          {/* Preview Details */}
          {targetEmployee && (
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Employee ID:</span>
                <span className="font-semibold text-slate-900">{targetEmployee.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Counselor Name:</span>
                <span className="font-semibold text-slate-900">{targetEmployee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Post-Assignment Total:</span>
                <span className="font-bold text-blue-700">
                  {getEmpCurrentCount(targetEmployee.id) + selectedLeadIds.length} Leads
                </span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Assign {selectedLeadIds.length} Leads</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
