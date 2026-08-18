import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';
import { EMPLOYEES_DATA } from '../../data/employeesData';
import { 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  BookOpen,
  MapPin,
  Sparkles,
  FolderKanban
} from 'lucide-react';

export const AdminAddLead = () => {
  const { addLead } = useLeads();
  const navigate = useNavigate();

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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const qualifications = [
    "B.Tech Graduate",
    "B.Tech Final Year",
    "Degree Completed (B.Sc / B.Com / BCA)",
    "MCA Graduate",
    "Working Professional",
    "Diploma Holder"
  ];

  const batches = [
    "Weekday Morning (7 AM - 9 AM)",
    "Weekday Regular (10 AM - 1 PM)",
    "Weekday Evening (6 PM - 8 PM)",
    "Weekend Intensive (Sat & Sun)"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.studentName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill all mandatory fields (Name, Email, Phone).");
      return;
    }

    try {
      setIsSubmitting(true);
      const newLead = addLead(formData);
      setIsSubmitting(false);
      setSuccessMessage(`✓ Student lead "${newLead.studentName}" successfully registered with Lead ID: ${newLead.leadId}`);
      
      // Reset form
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

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Failed to create lead.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/adminportal/leads')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Leads</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Add New Student Lead
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Register a direct student enrollment inquiry into the CRM database.
          </p>
        </div>

        <button
          onClick={() => navigate('/adminportal/leads')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
        >
          <FolderKanban className="w-4 h-4" />
          <span>View Leads List</span>
        </button>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-medium text-emerald-900 flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => navigate('/adminportal/leads')}
            className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
          >
            View in Leads Table
          </button>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Student Profile Information
          </h2>
          <span className="text-xs text-slate-400 font-medium">Fields marked with <span className="text-rose-500">*</span> are mandatory</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Student Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Venkat Reddy"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. venkat.reddy@gmail.com"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98450 67890"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              City / Regional Center <span className="text-rose-500">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Course Interested */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Course Interested <span className="text-rose-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Lead Source */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Inquiry Channel / Source
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Optional Initial Assignment */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Direct Assignment to Counselor (Optional)
          </label>
          <select
            name="assignedEmployeeId"
            value={formData.assignedEmployeeId}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Keep Unassigned (Add to Unassigned Queue) --</option>
            {EMPLOYEES_DATA.map(emp => (
              <option key={emp.id} value={emp.id}>
                Assign directly to {emp.name} ({emp.id} - {emp.designation})
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Counselor / Admin Initial Remarks
          </label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g. Student requested syllabus copy and details on fee concessions or installment plans."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/adminportal/leads')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isSubmitting ? 'Registering Lead...' : 'Register Student Lead'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
