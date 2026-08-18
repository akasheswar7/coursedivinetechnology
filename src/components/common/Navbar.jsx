import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Menu
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { currentUser, logout, isAdmin, isEmployee } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    if (isAdmin) {
      navigate('/adminportal');
    } else {
      navigate('/userportal');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Course Divine Technology" 
              className="w-10 h-10 rounded-xl object-cover shadow-sm border border-slate-200/80 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-base">
                  COURSE DIVINE TECHNOLOGY
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">
                  Pvt. Ltd.
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Enterprise Internal Lead Management CRM System
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right: Portal Indicator & User Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Portal Badge */}
          {isAdmin ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal (Owner)</span>
            </div>
          ) : isEmployee ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold shadow-sm">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Employee Portal ({currentUser?.id})</span>
            </div>
          ) : null}

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                {currentUser?.avatar || (isAdmin ? "AD" : currentUser?.name?.slice(0, 2)?.toUpperCase() || "US")}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-800 line-clamp-1">{currentUser?.name || "User"}</p>
                <p className="text-[10px] text-slate-500 font-medium">{currentUser?.designation || (isAdmin ? "Administrator" : "Counselor")}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-modal border border-slate-200 py-2 z-50 animate-fadeIn"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{currentUser?.name}</p>
                  <p className="text-xs text-slate-500">{currentUser?.email}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {currentUser?.role === 'ADMIN' ? 'Owner / Admin' : `Employee (${currentUser?.id})`}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  {isAdmin && (
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/adminportal/settings'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <span>CRM Settings & Demo Reset</span>
                    </button>
                  )}
                  {isEmployee && (
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/userportal/my-leads'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <span>My Assigned Work</span>
                    </button>
                  )}
                  <a
                    href="https://coursedivine.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Main Website (coursedivine.com)</span>
                  </a>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
