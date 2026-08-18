import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  ThumbsUp, 
  CalendarClock, 
  XCircle, 
  UserCheck,
  HelpCircle
} from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const normalized = (status || "").toLowerCase().trim();

  switch (normalized) {
    case 'unassigned':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          Unassigned
        </span>
      );
    case 'new':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          New Lead
        </span>
      );
    case 'contacted':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
          <PhoneCall className="w-3 h-3 text-indigo-600" />
          Contacted
        </span>
      );
    case 'interested':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-cyan-50 text-cyan-800 border border-cyan-200">
          <ThumbsUp className="w-3 h-3 text-cyan-600" />
          Interested
        </span>
      );
    case 'follow-up':
    case 'followup':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300">
          <CalendarClock className="w-3 h-3 text-amber-600" />
          Follow-up
        </span>
      );
    case 'converted':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm">
          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
          Converted
        </span>
      );
    case 'not interested':
    case 'notinterested':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-600" />
          Not Interested
        </span>
      );
    case 'assigned':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          <UserCheck className="w-3 h-3 text-purple-600" />
          Assigned
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <HelpCircle className="w-3 h-3 text-slate-500" />
          {status || "Unknown"}
        </span>
      );
  }
};

export const SourceBadge = ({ source }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-normal bg-slate-100 text-slate-600 border border-slate-200">
      {source || "Direct"}
    </span>
  );
};
