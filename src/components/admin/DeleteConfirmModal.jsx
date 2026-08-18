import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X, CornerDownLeft } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemTitle, leadCount = 1 }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                Confirm Deletion
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {leadCount > 1 ? `Delete ${leadCount} Selected Leads?` : 'Delete Student Lead?'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-slate-800 font-semibold">{itemTitle}</strong>? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Modal Footer with Enter Shortcut */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700 font-bold shadow-2xs">Enter ↵</kbd> to delete
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/80 rounded-xl transition-colors"
            >
              Cancel (Esc)
            </button>
            <button
              type="button"
              onClick={onConfirm}
              autoFocus
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-rose-500 focus:outline-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Yes, Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
