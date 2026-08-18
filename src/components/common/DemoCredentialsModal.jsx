import React, { useState } from 'react';
import { EMPLOYEES_DATA, ADMIN_USER } from '../../data/employeesData';
import { 
  X, 
  ShieldCheck, 
  Users, 
  KeyRound, 
  Copy, 
  Check, 
  Sparkles, 
  Info, 
  ExternalLink,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoCredentialsModal = ({ isOpen, onClose, onQuickFill }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-modal border border-slate-200 w-full max-w-3xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">CRM Evaluation & Credentials Guide</h3>
              <p className="text-xs text-slate-400">Course Divine Technology Pvt. Ltd.</p>
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
          {/* Executive Notice */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-950">Strict Access Control Architecture</p>
              <p className="mt-0.5 text-blue-800">
                This internal portal enforces complete boundary isolation. Employee accounts cannot access <span className="font-mono font-semibold">/adminportal</span>, and Admin credentials cannot be used on <span className="font-mono font-semibold">/userportal</span>.
              </p>
            </div>
          </div>

          {/* Single Admin Account */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-slate-900">1. Sole Company Administrator (Owner)</h4>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Single Master Account
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 font-medium">Admin Portal URL</p>
                  <p className="font-mono font-semibold text-slate-800">/adminportal</p>
                </div>
                <button
                  onClick={() => { onClose(); navigate('/adminportal'); }}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1"
                >
                  <span>Go to Login</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 font-medium">Username / Password</p>
                  <p className="font-mono font-semibold text-slate-800">adminuser / adminpass</p>
                </div>
                {onQuickFill && (
                  <button
                    onClick={() => { onQuickFill('adminuser', 'adminpass'); onClose(); }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium"
                  >
                    Auto Fill
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 10 Employee Accounts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">2. Exactly 10 Employee Accounts (/userportal)</h4>
              </div>
              <span className="text-xs text-slate-500 font-medium">Role: Counselor / Sales</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Each employee receives their own login and strictly sees ONLY their assigned leads.
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Employee ID</th>
                      <th className="py-2 px-3 font-semibold">Counselor Name</th>
                      <th className="py-2 px-3 font-semibold">Username</th>
                      <th className="py-2 px-3 font-semibold">Password</th>
                      <th className="py-2 px-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {EMPLOYEES_DATA.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-medium text-slate-700">{emp.id}</td>
                        <td className="py-2 px-3 font-medium text-slate-900">{emp.name}</td>
                        <td className="py-2 px-3 font-mono text-blue-700">{emp.username}</td>
                        <td className="py-2 px-3 font-mono text-slate-600">{emp.password}</td>
                        <td className="py-2 px-3 text-right">
                          {onQuickFill ? (
                            <button
                              onClick={() => { onQuickFill(emp.username, emp.password); onClose(); }}
                              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-medium border border-slate-200"
                            >
                              Auto Fill
                            </button>
                          ) : (
                            <button
                              onClick={() => copyToClipboard(emp.username, emp.id)}
                              className="p-1 text-slate-400 hover:text-slate-700"
                              title="Copy username"
                            >
                              {copiedKey === emp.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 100-Lead Workflow Quick Checklist */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Standard 100-Lead Assignment Workflow Checklist:
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Login to <span className="font-mono font-semibold">/adminportal</span> with admin credentials.</li>
              <li>Open <span className="font-semibold">All Leads</span> (Starts with 100 unassigned leads).</li>
              <li>Select 10 leads with checkboxes → Click <span className="font-semibold">"Assign to Employee"</span> → Select <span className="font-semibold">Employee 01</span>.</li>
              <li>Observe unassigned counter decrease from <span className="font-semibold">100 → 90</span>, and 10 leads assigned to Employee 01.</li>
              <li>Logout → Login to <span className="font-mono font-semibold">/userportal</span> with <span className="font-semibold">employee01</span>.</li>
              <li>Verify Employee 01 sees strictly only those 10 leads.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Course Divine Technology Pvt. Ltd. Internal System
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
