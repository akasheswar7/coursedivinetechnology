import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { X, UserPlus, CheckCircle2, AlertCircle, Sparkles, Plus } from 'lucide-react';

export const AddLeadModal = ({ isOpen, onClose, onSuccess }) => {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    city: 'Visakhapatnam',
    address: '',
    course: 'Full Stack Development',
    source: 'Website Inquiry',
    qualification: 'B.Tech Graduate',
    preferredBatch: 'Weekday Morning',
    assignedEmployeeId: '',
    notes: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successBanner, setSuccessBanner] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const courses = [
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

  const cities = [
    "Visakhapatnam",
    "Vijayawada",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Pune",
    "Mumbai",
    "Delhi"
  ];

  const sources = [
    "Website Inquiry",
    "LinkedIn Campaign",
    "Google Ads",
    "Student Referral",
    "Campus Walk-in",
    "Direct Call"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickFillSample = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFormData({
      studentName: `Student ${randomNum} Rao`,
      email: `student${randomNum}@gmail.com`,
      phone: `+91 98450 ${randomNum}12`,
      city: cities[Math.floor(Math.random() * cities.length)],
      address: '',
      course: courses[Math.floor(Math.random() * courses.length)],
      source: 'Website Inquiry',
      qualification: 'B.Tech Final Year',
      preferredBatch: 'Weekday Morning',
      assignedEmployeeId: '',
      notes: 'Interested in immediate course registration and syllabus details.'
    });
  };

  const handleSave = (createAnother = false) => {
    if (!formData.studentName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill all mandatory fields: Student Name, Email, and Phone.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const newLead = addLead(formData);
      setIsSubmitting(false);

      if (createAnother) {
        setSuccessBanner(`✓ Lead "${newLead.studentName}" added (${newLead.leadId}). Ready for next.`);
        setFormData({
          studentName: '',
          email: '',
          phone: '',
          city: 'Visakhapatnam',
          address: '',
          course: 'Full Stack Development',
          source: 'Website Inquiry',
          qualification: 'B.Tech Graduate',
          preferredBatch: 'Weekday Morning',
          assignedEmployeeId: '',
          notes: ''
        });
        if (onSuccess) onSuccess(newLead);
      } else {
        if (onSuccess) onSuccess(newLead);
        onClose();
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Failed to add lead.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-modal border border-slate-200 w-full max-w-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Fast Add Student Lead</h3>
              <p className="text-xs text-slate-400">Course Divine Technology CRM Lead Entry</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickFillSample}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
              title="Auto-fill sample data for fast testing"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Auto Sample</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {successBanner && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successBanner}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Varma"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh.v@gmail.com"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number (WhatsApp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98450 12345"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / Location <span className="text-rose-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Course Interested */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Interested <span className="text-rose-500">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              >
                {courses.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
            </div>

            {/* Lead Source */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lead Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              >
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Initial Assignment Optional */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Initial Assignment (Optional - Leave unassigned for bulk assignment queue)
            </label>
            <select
              name="assignedEmployeeId"
              value={formData.assignedEmployeeId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="">-- Keep Unassigned (Add to Unassigned Queue) --</option>
              {EMPLOYEES_DATA.map(emp => (
                <option key={emp.id} value={emp.id}>
                  Assign directly to {emp.name} ({emp.id})
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Remarks / Initial Notes
            </label>
            <textarea
              name="notes"
              rows="2"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Inquired about weekend batch fees and placement assistance."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            ></textarea>
          </div>

          {/* Footer Buttons with Fast Multi-Add Options */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-all flex items-center gap-1.5"
                title="Add this lead and immediately keep form open for the next lead"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add & Create Another</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Lead</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
