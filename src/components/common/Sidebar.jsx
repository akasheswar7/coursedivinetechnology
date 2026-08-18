import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  PieChart, 
  Settings, 
  LogOut, 
  FolderKanban, 
  UserCircle,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin, isEmployee, currentUser, logout } = useAuth();
  const { totalLeadsCount, getEmployeeLeads } = useLeads();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (isAdmin) {
      navigate('/adminportal');
    } else {
      navigate('/userportal');
    }
  };

  const employeeLeadsCount = isEmployee && currentUser?.id ? getEmployeeLeads(currentUser.id).length : 0;

  const adminNavItems = [
    { to: '/adminportal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/adminportal/leads', label: `All Leads (${totalLeadsCount})`, icon: FolderKanban, badge: 'Live' },
    { to: '/adminportal/add-lead', label: 'Add Lead', icon: UserPlus },
    { to: '/adminportal/distribution', label: 'Lead Distribution', icon: PieChart },
    { to: '/adminportal/employees', label: '10 Employees', icon: Users },
    { to: '/adminportal/settings', label: 'CRM Settings & Reset', icon: Settings },
  ];

  const employeeNavItems = [
    { to: '/userportal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/userportal/my-leads', label: `My Assigned Leads (${employeeLeadsCount})`, icon: FolderKanban },
    { to: '/userportal/profile', label: 'My Account', icon: UserCircle },
  ];

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Course Divine Logo" 
              className="w-9 h-9 rounded-xl object-cover shadow-sm border border-slate-700/80 shrink-0" 
            />
            <div>
              <p className="text-xs font-bold tracking-tight text-white uppercase">
                {isAdmin ? 'Admin Workspace' : 'Employee Portal'}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {isAdmin ? 'Owner Executive Mode' : `${currentUser?.name || 'Counselor'}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {isAdmin ? 'Management Console' : 'My Workspace'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 font-medium">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Card in Sidebar footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs border border-slate-600">
              {currentUser?.avatar || (isAdmin ? "AD" : "EM")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{currentUser?.name || "User"}</p>
              <p className="text-[11px] text-slate-400 truncate">
                {isAdmin ? "admin@coursedevinetechnology.com" : currentUser?.employeeId || currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-rose-900/60 transition-colors border border-slate-700/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
