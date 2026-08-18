import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const LandingPage = () => {
  const { logout } = useAuth();

  // Automatically sign out any existing session when returning to portal selection
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="min-h-screen bg-[#071328] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Full-Screen Animated Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src="/logo.png" 
          alt="Course Divine Background" 
          className="w-full h-full object-cover object-center opacity-25 select-none filter brightness-110 contrast-110 saturate-125 animate-pulse-glow"
        />
        {/* Soft floating luminous radial lights */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/15 via-slate-950/70 to-slate-950/85"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-blue-500/20 rounded-full blur-[130px] animate-float-slow"></div>
      </div>

      {/* Top Banner */}
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur-xl px-6 py-4 relative z-10 shadow-sm animate-slide-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5 group cursor-default">
            <img 
              src="/logo.png" 
              alt="Course Divine Technology" 
              className="w-10 h-10 rounded-xl object-cover shadow-md border border-white/20 shrink-0 ring-2 ring-white/10 group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h1 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                COURSE DIVINE TECHNOLOGY PVT. LTD.
              </h1>
              <p className="text-xs text-blue-200/80 font-medium">
                Enterprise Internal Lead Management CRM System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://coursedivine.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all duration-200 shadow-sm backdrop-blur-md hover:scale-105 btn-shimmer"
            >
              <span>Main Website (coursedivine.com)</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 flex flex-col justify-center relative z-10 animate-slide-up">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-200 mb-4 backdrop-blur-md shadow-sm hover:bg-white/15 transition-colors">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>Authorized Personnel Only • Corporate Internal Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Select Your Designated Workplace Portal
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto font-medium leading-relaxed">
            Please proceed to your dedicated portal. Strict authentication and role-based permissions are enforced at all entry points.
          </p>
        </div>

        {/* Premium Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto w-full">
          {/* Admin Portal Card */}
          <div className="bg-slate-900/80 hover:bg-slate-900/90 backdrop-blur-2xl border border-white/15 hover:border-amber-400/60 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-amber-500/10">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  /adminportal
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Company Admin Portal
              </h3>
              <p className="text-xs text-amber-400 font-semibold mt-1">
                Sole Master Account • Owner & Management
              </p>

              <p className="mt-3.5 text-xs text-slate-300 leading-relaxed font-normal">
                Full administrative oversight: Manage student inquiries, execute bulk lead assignments across 10 counselors, review live distribution matrices, and monitor team performance.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>100 Initial Leads Bulk Distribution Workflow</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Real-Time Counselor Allocation Matrix</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Add, Edit, Reassign, and Export Lead Database</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <Link
                to="/adminportal"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] btn-shimmer"
              >
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Employee Portal Card */}
          <div className="bg-slate-900/80 hover:bg-slate-900/90 backdrop-blur-2xl border border-white/15 hover:border-blue-400/60 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-blue-500/10">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  /userportal
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                Employee & Counselor Portal
              </h3>
              <p className="text-xs text-blue-400 font-semibold mt-1">
                Exactly 10 Dedicated Counselor Workspaces
              </p>

              <p className="mt-3.5 text-xs text-slate-300 leading-relaxed font-normal">
                Counselor workplace with strict boundary isolation. Each employee logs in to view and process only their assigned leads, update outreach statuses, and log conversation remarks.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Strict Data Isolation (Only assigned leads visible)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Counseling Log & Status Workflow (New to Converted)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Zero Admin/Peer Data Exposure</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <Link
                to="/userportal"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] btn-shimmer"
              >
                <span>Access Employee Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur-md px-6 py-4 text-center text-xs text-slate-400 relative z-10">
        <p>© {new Date().getFullYear()} COURSE DIVINE TECHNOLOGY PVT. LTD. All rights reserved. Internal Lead Management CRM System.</p>
      </footer>
    </div>
  );
};
