import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LEADS } from '../data/initialLeadsData';
import { EMPLOYEES_DATA } from '../data/employeesData';

const LeadContext = createContext(null);

const STORAGE_KEY = 'cdt_crm_leads_data_production_v1';

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load leads from localStorage", e);
    }
    // Clean production default: 0 dummy leads (only user added leads)
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to persist leads to localStorage", e);
    }
  }, [leads]);

  // Bulk Assign Leads to a specific Employee
  const assignLeads = (leadIds, targetEmployeeId) => {
    const employee = EMPLOYEES_DATA.find(emp => emp.id === targetEmployeeId);
    if (!employee) {
      throw new Error("Target employee not found.");
    }

    const now = new Date();
    const timestampStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (leadIds.includes(lead.id) || leadIds.includes(lead.leadId)) {
          const updatedNotes = [
            ...(lead.notes || []),
            {
              id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              author: "Admin Assignment",
              text: `Assigned to ${employee.name} (${employee.employeeId}) by Company Admin.`,
              timestamp: timestampStr
            }
          ];

          return {
            ...lead,
            assignedEmployeeId: employee.id,
            assignedEmployeeName: employee.name,
            assignedAt: now.toISOString(),
            status: "New",
            notes: updatedNotes
          };
        }
        return lead;
      })
    );

    return {
      count: leadIds.length,
      employeeName: employee.name
    };
  };

  // Add a new Lead
  const addLead = (newLeadData) => {
    const leadCount = leads.length + 1;
    const leadNum = String(leadCount).padStart(3, "0");
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const timestampStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newLead = {
      id: `CDT-L${Date.now().toString().slice(-4)}${leadNum}`,
      leadId: `CDT-2025-${leadNum}`,
      studentName: newLeadData.studentName.trim(),
      email: newLeadData.email.trim(),
      phone: newLeadData.phone.trim(),
      city: newLeadData.city.trim(),
      address: newLeadData.address.trim(),
      course: newLeadData.course,
      source: newLeadData.source || "Website Inquiry",
      qualification: newLeadData.qualification || "B.Tech Graduate",
      preferredBatch: newLeadData.preferredBatch || "Weekday Morning",
      assignedEmployeeId: newLeadData.assignedEmployeeId || null,
      assignedEmployeeName: newLeadData.assignedEmployeeId 
        ? EMPLOYEES_DATA.find(e => e.id === newLeadData.assignedEmployeeId)?.name || null 
        : null,
      status: newLeadData.assignedEmployeeId ? "New" : "Unassigned",
      createdAt: formattedDate,
      assignedAt: newLeadData.assignedEmployeeId ? now.toISOString() : null,
      notes: newLeadData.notes ? [
        {
          id: `note-${Date.now()}`,
          author: "Admin Entry",
          text: newLeadData.notes,
          timestamp: timestampStr
        }
      ] : []
    };

    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  // Update Lead Details
  const updateLead = (leadId, updatedFields) => {
    const now = new Date();
    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId || lead.leadId === leadId) {
          return {
            ...lead,
            ...updatedFields,
            updatedAt: now.toISOString()
          };
        }
        return lead;
      })
    );
  };

  // Employee: Update Lead Status & Add Counseling Remark
  const updateLeadStatus = (leadId, newStatus, newRemarkText, counselorName) => {
    const now = new Date();
    const timestampStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId || lead.leadId === leadId) {
          const notes = [...(lead.notes || [])];
          if (newRemarkText && newRemarkText.trim()) {
            notes.unshift({
              id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              author: counselorName || lead.assignedEmployeeName || "Counselor",
              text: newRemarkText.trim(),
              statusChange: newStatus !== lead.status ? `${lead.status} → ${newStatus}` : null,
              timestamp: timestampStr
            });
          } else if (newStatus !== lead.status) {
            notes.unshift({
              id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              author: counselorName || lead.assignedEmployeeName || "Counselor",
              text: `Status updated to ${newStatus}.`,
              statusChange: `${lead.status} → ${newStatus}`,
              timestamp: timestampStr
            });
          }

          return {
            ...lead,
            status: newStatus,
            notes: notes,
            lastContactedAt: now.toISOString(),
            updatedAt: now.toISOString()
          };
        }
        return lead;
      })
    );
  };

  // Add Note directly
  const addLeadNote = (leadId, noteText, authorName = "Counselor") => {
    const now = new Date();
    const timestampStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId || lead.leadId === leadId) {
          const notes = [
            {
              id: `note-${Date.now()}`,
              author: authorName,
              text: noteText.trim(),
              timestamp: timestampStr
            },
            ...(lead.notes || [])
          ];
          return {
            ...lead,
            notes: notes,
            updatedAt: now.toISOString()
          };
        }
        return lead;
      })
    );
  };

  // Admin Lead Reassignment
  const reassignLead = (leadId, newEmployeeId) => {
    const employee = EMPLOYEES_DATA.find(e => e.id === newEmployeeId);
    if (!employee) return;

    const now = new Date();
    const timestampStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    setLeads(prevLeads =>
      prevLeads.map(lead => {
        if (lead.id === leadId || lead.leadId === leadId) {
          return {
            ...lead,
            assignedEmployeeId: employee.id,
            assignedEmployeeName: employee.name,
            assignedAt: now.toISOString(),
            notes: [
              {
                id: `note-${Date.now()}`,
                author: "Admin",
                text: `Reassigned from ${lead.assignedEmployeeName || 'Unassigned'} to ${employee.name}.`,
                timestamp: timestampStr
              },
              ...(lead.notes || [])
            ]
          };
        }
        return lead;
      })
    );
  };

  // Admin Delete Single Lead
  const deleteLead = (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId && l.leadId !== leadId));
  };

  // Admin Fast Bulk Delete Multiple Leads
  const deleteLeads = (leadIds) => {
    setLeads(prev => prev.filter(l => !leadIds.includes(l.id) && !leadIds.includes(l.leadId)));
    return leadIds.length;
  };

  // Clear / Wipe all leads to 0
  const clearAllLeads = () => {
    setLeads([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  };

  // Reset to initial demo leads only if explicitly requested
  const resetDemoData = () => {
    return clearAllLeads();
  };

  // Strict employee leads filter
  const getEmployeeLeads = (employeeId) => {
    if (!employeeId) return [];
    return leads.filter(l => l.assignedEmployeeId === employeeId);
  };

  // Computed metrics
  const totalLeadsCount = leads.length;
  const unassignedLeads = leads.filter(l => !l.assignedEmployeeId);
  const unassignedCount = unassignedLeads.length;
  const assignedLeads = leads.filter(l => !l.assignedEmployeeId ? false : true);
  const assignedCount = assignedLeads.length;
  
  const convertedCount = leads.filter(l => l.status === "Converted").length;
  const inProgressCount = leads.filter(l => ["Contacted", "Interested", "Follow-up"].includes(l.status)).length;
  const notInterestedCount = leads.filter(l => l.status === "Not Interested").length;

  // Distribution matrix across all 10 employees
  const getDistributionStats = () => {
    return EMPLOYEES_DATA.map(emp => {
      const empLeads = leads.filter(l => l.assignedEmployeeId === emp.id);
      const total = empLeads.length;
      const converted = empLeads.filter(l => l.status === "Converted").length;
      const contacted = empLeads.filter(l => l.status === "Contacted").length;
      const interested = empLeads.filter(l => l.status === "Interested").length;
      const followup = empLeads.filter(l => l.status === "Follow-up").length;
      const notInterested = empLeads.filter(l => l.status === "Not Interested").length;
      const pending = empLeads.filter(l => l.status === "New" || l.status === "Follow-up" || l.status === "Contacted").length;
      const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

      return {
        ...emp,
        totalAssigned: total,
        converted,
        contacted,
        interested,
        followup,
        notInterested,
        pending,
        conversionRate,
        leads: empLeads
      };
    });
  };

  const value = {
    leads,
    totalLeadsCount,
    unassignedLeads,
    unassignedCount,
    assignedLeads,
    assignedCount,
    convertedCount,
    inProgressCount,
    notInterestedCount,
    assignLeads,
    addLead,
    updateLead,
    updateLeadStatus,
    addLeadNote,
    reassignLead,
    deleteLead,
    deleteLeads,
    clearAllLeads,
    resetDemoData,
    getEmployeeLeads,
    getDistributionStats
  };

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
